-- Локальная БД DEV 8.0.0
-- URL: jdbc:oracle:thin:@192.168.56.217:1521:XE
-- login: NOTIF_Z_RW
-- pass: NOTIF_Z_RW

ALTER USER NOTIF_Z_RW IDENTIFIED BY "NOTIF_Z_RW";-- если пароль просрочился
ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;-- чтобы пароль был вечным

--куча кода чтобы тупо создать схему
----------------------------------------------begin-----------------------------------------
--заходим через sys as sysdba, затем:
CREATE TEMPORARY TABLESPACE tbs_temp_01 -- неведомая херня
TEMPFILE 'tbs_temp_01.dbf'
SIZE 5M
AUTOEXTEND ON;

CREATE TABLESPACE tbs_perm_01 -- неведомая херня
DATAFILE 'tbs_perm_01.dat'
SIZE 20M
ONLINE;

CREATE USER smithj
IDENTIFIED BY pwd4smithj
  DEFAULT TABLESPACE tbs_perm_01 -- подключаем 2 неведомые херни
  TEMPORARY TABLESPACE tbs_temp_01
  QUOTA 20M on tbs_perm_01; -- еще какую-то квоту

GRANT ALL PRIVILEGES TO smithj; -- может достаточно и этой строчки, но лучше захреначить и все права ниже
GRANT create session TO smithj;
GRANT create table TO smithj;
GRANT create view TO smithj;
GRANT create any trigger TO smithj;
GRANT create any procedure TO smithj;
GRANT create sequence TO smithj;
GRANT create synonym TO smithj;

alter session set current_schema = smithj; -- так и не понял нужна эта хрень или нет

-- теперь нужно зайти через smithj, затем это:
CREATE SCHEMA AUTHORIZATION smithj
  CREATE TABLE products -- просто создать схему нельзя, нужно обязательно что-то создавать
  ( product_id number(10) not null,
    product_name varchar2(50) not null,
    category varchar2(50),
    CONSTRAINT products_pk PRIMARY KEY (product_id)
  );
----------------------------------------------end-----------------------------------------



SELECT * FROM NOTIF_Z.NOTICE ORDER BY NOTICE_ID DESC;
SELECT NOTICE_ID, ORDER_ID, ORDER_NAME, STATUS FROM NOTIF_Z.NOTICE ORDER BY NOTICE_ID DESC;
SELECT * FROM NOTIF_Z.PROCEDURES;
SELECT * FROM NOTIF_Z.PROTOCOLS_CANCEL;
SELECT * FROM NOTIF_Z.PROTOCOLS;
SELECT * FROM NOTIF_Z.STPROTOCOLS;
SELECT * FROM NOTIF_Z.ORDERS;
SELECT * FROM NOTIF_Z.LOT_POSITION;
SELECT * FROM NOTIF_Z.LOT;
SELECT * FROM NOTIF_Z.DOC_EXPLAIN_REQUESTS;
SELECT * FROM NOTIF_Z.CUSTOMER_REQST_NOTICE;
SELECT * FROM NOTIF_Z.LOT_LIFE_CYCLE_CASES;
SELECT * FROM NOTIF_Z.XSL_TEMPLATE;
SELECT * FROM NOTIF_Z.PRINT_FORM;
SELECT * FROM NOTIF_Z.PRINT_FORM_CONTENT;
SELECT * FROM NOTIF_Z.MEDICINES;

---------------------------------------------------Аналитика-------------------------------------------------

SELECT ROW_NUMBER() OVER(ORDER BY ORDER_TYPE) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;
SELECT ROW_NUMBER() OVER(ORDER BY ORDER_ID) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;
SELECT ROW_NUMBER() OVER(PARTITION BY (ORDER_TYPE) ORDER BY ORDER_ID) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;

SELECT RANK() OVER(ORDER BY ORDER_TYPE) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;
SELECT DENSE_RANK() OVER(ORDER BY ORDER_TYPE) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;

SELECT NTILE(4) OVER(ORDER BY ORDER_TYPE) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;
SELECT NTILE(4) OVER(PARTITION BY  (ORDER_TYPE) ORDER BY ORDER_TYPE) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;

SELECT * FROM (SELECT NTILE(4) OVER(PARTITION BY  (ORDER_TYPE) ORDER BY ORDER_TYPE) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE)
WHERE num=4;
EXPLAIN PLAN for
SELECT LAG(NOTICE_ID) OVER (ORDER BY NOTICE_ID) as LAG, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;
SELECT LEAD(NOTICE_ID) OVER (ORDER BY NOTICE_ID) as LAG, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;
SELECT LAG(NOTICE_ID) OVER (PARTITION BY (ORDER_TYPE) ORDER BY NOTICE_ID) as LAG, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;

---------------------------------------------------Рекурсия-------------------------------------------------

EXPLAIN PLAN for
WITH Letters(code,letter) AS(
SELECT ASCII('A') code, CHR(ASCII('A')) letter from DUAL
UNION ALL
SELECT code+1, CHR(code+1) FROM Letters
WHERE code+1 <= ASCII('Z')
)
SELECT letter FROM Letters;
SELECT PLAN_TABLE_OUTPUT FROM TABLE(DBMS_XPLAN.DISPLAY());-- вар 2 - более информативный




---------------------------------------------------Планы запроса-------------------------------------------------

-- пример 1 (нет индекса на столбец-фильтр)
EXPLAIN PLAN for
SELECT * FROM NOTIF_Z.ORDERS o WHERE o.PLACER_ORG_ROLE = 'OA';
SELECT PLAN_TABLE_OUTPUT FROM TABLE(DBMS_XPLAN.DISPLAY());-- вар 2 - более информативный
-- ----------------------------------------------------------------------------
-- | Id  | Operation         | Name   | Rows  | Bytes | Cost (%CPU)| Time     |
-- ----------------------------------------------------------------------------
-- |   0 | SELECT STATEMENT  |        |    95 | 18430 |     5   (0)| 00:00:01 |
-- |*  1 |  TABLE ACCESS FULL| ORDERS |    95 | 18430 |     5   (0)| 00:00:01 | полный перебор всех строк таблицы
-- ----------------------------------------------------------------------------

-- пример 2 (все данные из индекса)
EXPLAIN PLAN for
SELECT o.ORDER_ID FROM NOTIF_Z.ORDERS o;
SELECT PLAN_TABLE_OUTPUT FROM TABLE(DBMS_XPLAN.DISPLAY());-- вар 2 - более информативный
-- ------------------------------------------------------------------------------
-- | Id  | Operation        | Name      | Rows  | Bytes | Cost (%CPU)| Time     |
-- ------------------------------------------------------------------------------
-- |   0 | SELECT STATEMENT |           |   380 |  1900 |     1   (0)| 00:00:01 |
-- |   1 |  INDEX FULL SCAN | PK_ORDERS |   380 |  1900 |     1   (0)| 00:00:01 |
-- ------------------------------------------------------------------------------


-- пример 3 (есть индекс на столбец-фильтр - не уникальный)
EXPLAIN PLAN for
SELECT * FROM NOTIF_Z.ORDERS o WHERE o.ORGANIZATION_ID = 367;
SELECT PLAN_TABLE_OUTPUT FROM TABLE(DBMS_XPLAN.DISPLAY());-- вар 2 - более информативный
-- ----------------------------------------------------------------------------------------------------------
-- | Id  | Operation                   | Name                       | Rows  | Bytes | Cost (%CPU)| Time     |
-- ----------------------------------------------------------------------------------------------------------
-- |   0 | SELECT STATEMENT            |                            |     1 |   194 |     2   (0)| 00:00:01 |
-- |   1 |  TABLE ACCESS BY INDEX ROWID| ORDERS                     |     1 |   194 |     2   (0)| 00:00:01 |
-- |*  2 |   INDEX RANGE SCAN          | IDX_ORDERS_ORGANIZATION_ID |     1 |       |     1   (0)| 00:00:01 | поиск по индексу
-- ----------------------------------------------------------------------------------------------------------



-- пример 4 (есть индекс на столбец-фильтр - уникальный)
EXPLAIN PLAN for
SELECT * FROM NOTIF_Z.ORDERS o WHERE o.ORDER_ID = 114;
SELECT PLAN_TABLE_OUTPUT FROM TABLE(DBMS_XPLAN.DISPLAY());-- вар 2 - более информативный
-- -----------------------------------------------------------------------------------------
-- | Id  | Operation                   | Name      | Rows  | Bytes | Cost (%CPU)| Time     |
-- -----------------------------------------------------------------------------------------
-- |   0 | SELECT STATEMENT            |           |     1 |   194 |     1   (0)| 00:00:01 |
-- |   1 |  TABLE ACCESS BY INDEX ROWID| ORDERS    |     1 |   194 |     1   (0)| 00:00:01 |
-- |*  2 |   INDEX UNIQUE SCAN         | PK_ORDERS |     1 |       |     0   (0)| 00:00:01 | поиск по уникальному индексу
-- -----------------------------------------------------------------------------------------



-- пример 5 (поиск напрямую по системному указателю ROWID)
EXPLAIN PLAN for
SELECT ROWID FROM NOTIF_Z.ORDERS o WHERE o.ORDER_ID = 114;
SELECT * FROM NOTIF_Z.ORDERS o WHERE o.ROWID = 'AAAE8sAAJAAAAEzAAF';
SELECT PLAN_TABLE_OUTPUT FROM TABLE(DBMS_XPLAN.DISPLAY());-- вар 2 - более информативный
-- -------------------------------------------------------------------------------------
-- | Id  | Operation                  | Name   | Rows  | Bytes | Cost (%CPU)| Time     |
-- -------------------------------------------------------------------------------------
-- |   0 | SELECT STATEMENT           |        |     1 |   194 |     1   (0)| 00:00:01 |
-- |   1 |  TABLE ACCESS BY USER ROWID| ORDERS |     1 |   194 |     1   (0)| 00:00:01 | поиск по ROWID
-- -----------------------------------------------------------------------------------------






---------------------------------------------------Процедуры-------------------------------------------------

CREATE OR REPLACE Procedure UpdateCourse( name_in IN varchar2 )
IS
  cnumber number;

  cursor c1 is
    SELECT course_number
    FROM courses_tbl
    WHERE course_name = name_in;

  BEGIN

    open c1;
    fetch c1 into cnumber;

    if c1%notfound then
      cnumber := 9999;
    end if;

    INSERT INTO student_courses
    ( course_name,
      course_number )
    VALUES
      ( name_in,
        cnumber );

    commit;

    close c1;

    EXCEPTION
    WHEN OTHERS THEN
    raise_application_error(-20001,'An error was encountered - '||SQLCODE||' -ERROR- '||SQLERRM);
  END;






