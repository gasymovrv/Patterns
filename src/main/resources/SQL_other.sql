# БД та же, что и для AptechLibrary.
# URL: jdbc:mysql://192.168.56.200:3306
# Login: root
# Password: 4
# Схемы:
#    sql_ex_aero
#    sql_ex_computer
#    sql_ex_inc_out
#    sql_ex_painting
#    sql_ex_ships


# -------------------------------------------Ранжирующие, аналитические, агрегатные----------------------------------------------------------
# ROW_NUMBER
SELECT ROW_NUMBER() OVER(ORDER BY ORDER_TYPE) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;
SELECT ROW_NUMBER() OVER(ORDER BY ORDER_ID) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;
SELECT ROW_NUMBER() OVER(PARTITION BY (ORDER_TYPE) ORDER BY ORDER_ID) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;

# RANK
SELECT RANK() OVER(ORDER BY ORDER_TYPE) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;
SELECT DENSE_RANK() OVER(ORDER BY ORDER_TYPE) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;

# NTILE
SELECT NTILE(4) OVER(ORDER BY ORDER_TYPE) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;
SELECT NTILE(4) OVER(PARTITION BY  (ORDER_TYPE) ORDER BY ORDER_TYPE) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;
-- выводим все 4ые группы:
SELECT * FROM (SELECT NTILE(4) OVER(PARTITION BY  (ORDER_TYPE) ORDER BY ORDER_TYPE) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE)
WHERE num=4;

# LAG
SELECT LAG(NOTICE_ID) OVER (ORDER BY NOTICE_ID) as LAG, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;
SELECT LEAD(NOTICE_ID) OVER (ORDER BY NOTICE_ID) as LAG, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;
-- группировка по ORDER_TYPE, внутри каждой группы сортировка по NOTICE_ID. LAG в начале новой группы берет не значение из предыдущей, а null:
SELECT LAG(NOTICE_ID) OVER (PARTITION BY (ORDER_TYPE) ORDER BY NOTICE_ID) as LAG, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;

#COUNT
UPDATE Product p SET p.maker = NULL WHERE p.type = 'Laptop';
SELECT count(         maker) FROM Product;#выдаст кол-во не-NULL значений данного столбца
SELECT count(DISTINCT maker) FROM Product;#выдаст кол-во уникальных не-NULL значений данного столбца


# -------------------------------------------DDL, DML, NULL, Рекурсия----------------------------------------------------------
USE sql_ex_computer;

#DDL
CREATE TABLE Product
(
  maker VARCHAR(10) NOT NULL,
  model VARCHAR(50) NOT NULL
    PRIMARY KEY,
  type  VARCHAR(50) NOT NULL
);

ALTER TABLE Product
  MODIFY COLUMN maker VARCHAR(10) NULL;

DROP TABLE Product;

#UPDATE + JOIN
UPDATE PC pc
  JOIN Product prod ON prod.model=pc.model
SET pc.cd = '!!!!'
WHERE prod.maker = 'A';
#или без джойна:
UPDATE PC pc SET pc.cd = 'EEE'
WHERE pc.model IN (SELECT model FROM Product WHERE maker = 'E');

#DELETE
DELETE FROM Product WHERE cast(model as DECIMAL(16))>2000;

#Сравнение с NULL
#Операторы сравнения дают в результате величину 1 (истина, TRUE), 0 (ложь, FALSE) или NULL.
SELECT 1 < 2; -- вернет 1
SELECT 45 <=> NULL; -- вернет 0
SELECT NULL <=> NULL; -- вернет 1
SELECT NULL = NULL; -- вернет 0
SELECT 678 = NULL; -- вернет NULL
SELECT 23 < NULL; -- вернет NULL

SELECT 0 OR NULL; -- вернет NULL
SELECT FALSE OR NULL; -- вернет NULL
SELECT TRUE OR NULL; -- вернет 1 !!!
SELECT -346 OR NULL; -- вернет 1 !!!

SELECT TRUE AND NULL; -- вернет NULL
SELECT 43 AND NULL; -- вернет NULL
SELECT FALSE AND NULL; -- вернет 0 !!!
SELECT 0 AND NULL; -- вернет 0 !!!

UPDATE Printer p SET p.price = NULL WHERE p.code = 1;
#Если в секции WHERE оказался NULL - то это всегда ложь
SELECT * FROM Printer WHERE Printer.price <> 270;
SELECT * FROM Printer WHERE Printer.price <=> 270;
SELECT * FROM Printer WHERE Printer.price = 270;
SELECT * FROM Printer WHERE Printer.price > 0;
SELECT * FROM Printer WHERE Printer.price IS NULL ;


#Рекурсия - вывод алфавита (для MSSQL)
WITH Letters AS(
SELECT ASCII('A') code, CHAR(ASCII('A')) letter
UNION ALL
SELECT code+1, CHAR(code+1) FROM Letters
WHERE code+1 <= ASCII('Z')
)
SELECT letter FROM Letters;

#Рекурсия - вывод алфавита (для Oracle)
WITH Letters(code,letter) AS(
SELECT ASCII('A') code, CHR(ASCII('A')) letter from DUAL
UNION ALL
SELECT code+1, CHR(code+1) FROM Letters
WHERE code+1 <= ASCII('Z')
)
SELECT letter FROM Letters;


# ------------------------------------------------Procedure-------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE `p2`()
LANGUAGE SQL
DETERMINISTIC
  SQL SECURITY DEFINER
  COMMENT 'A procedure'
  BEGIN
    SELECT 'Hello World !';
  END
//
CALL p2();

DELIMITER //
CREATE PROCEDURE TestProc(OUT t INTEGER(11))
NOT DETERMINISTIC
  SQL SECURITY INVOKER
  COMMENT ''
  BEGIN
    SELECT price INTO 't' FROM Printer LIMIT 0, 1;
  END
//
CALL TestProc(@a);
SELECT @a;

USE aplib;
DELIMITER //
-- n число записей на страницу
-- p номер страницы, по умолчанию - первая
CREATE PROCEDURE paging(IN n INTEGER, IN p INTEGER)
  BEGIN
    DECLARE first INT DEFAULT 0;
    DECLARE total INT;

    SELECT COUNT(*) INTO total FROM book;

    IF p = 0 OR p IS NULL OR total/n < p
    THEN
      SET p = 1;
    END IF;

    IF n > total
    THEN
      SET n = total;
      SET p = 1;
    END IF;

    SET first = (n*p)-n;
    SELECT * FROM book LIMIT first, n;
  END
//
CALL paging(2, 1);

USE sql_ex_computer;
DELIMITER //
CREATE PROCEDURE `proc_CURSOR`(OUT param1 INT, OUT max_hd DOUBLE)
  BEGIN
    DECLARE col1 DECIMAL(12,2);
    DECLARE col2 DOUBLE;
    DECLARE sum DECIMAL(12,2);
    DECLARE stop TINYINT;

    DECLARE cur1 CURSOR FOR SELECT price, hd FROM PC;/*Объявление курсора и его заполнение */
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET stop = 1;/*Что делать, когда больше нет записей*/

    OPEN cur1;/*Открыть курсор*/

    SET stop = 0;
    SET sum = 0;

    WHILE stop = 0 DO
      FETCH cur1 INTO col1, col2;/*Назначить значение переменных, равными текущим значениям столбцов*/

      IF max_hd IS NULL
      THEN SET max_hd = col2;
      END IF;

      IF col2 > max_hd
      THEN SET max_hd = col2;
      END IF;

      SET sum = sum + col1;
    END WHILE;

    CLOSE cur1; /*Закрыть курсор*/

    SET param1 = sum;
  END//

CALL proc_CURSOR(@sum, @max_hd);
SELECT @sum, @max_hd;



# ------------------------------------------------TRIGGER---------------------------------------------------------------
USE sql_ex_computer;

DELIMITER //
 CREATE TRIGGER test_insertPC_trigger BEFORE INSERT ON PC
 FOR EACH ROW
 BEGIN
  SET NEW.cd = LEFT(NEW.cd,3);
  SET NEW.price = NEW.price/65;
 END//
INSERT INTO Product VALUES ('NEW', '6324','PC');
INSERT INTO PC VALUES (13, '6324', 500, 64, 40, '50xdfkgj', 85000);

DELIMITER //
CREATE TRIGGER test_updatePC_trigger BEFORE UPDATE ON PC
  FOR EACH ROW
  BEGIN
    SET NEW.cd = LEFT(NEW.cd,3);
    SET NEW.price = NEW.price/65;
  END//
UPDATE PC SET cd = '50xdfkgj', price = 85000 WHERE code = 13;

DELIMITER //
CREATE TRIGGER test_deletePC_trigger1 BEFORE DELETE ON PC
  FOR EACH ROW
  BEGIN
    INSERT INTO Product VALUES ('trig', '9999','PC');-- просто вставляем какую-то ерунду при удалении
  END//

CREATE TRIGGER test_deletePC_trigger2 AFTER DELETE ON PC
  FOR EACH ROW
  BEGIN
    DELETE FROM Product WHERE model = OLD.model;-- вместо каскада
  END//
DELETE FROM PC WHERE code = 13;

-- триггер обновляющий суммарные просмотры книг у авторов при обновлении книги
-- можно было использовать вместо логики в джава-методе BookService.update
USE aplib;
DELIMITER //
CREATE TRIGGER update_book_trigger BEFORE UPDATE ON book
  FOR EACH ROW
  BEGIN
    IF OLD.author_id != NEW.author_id THEN
    -- обновляем просмотры старых авторов обновляемой книги
    UPDATE author SET views = views - (SELECT b.views FROM book b WHERE b.id = OLD.id) WHERE id = OLD.author_id;
    -- обновляем просмотры новых авторов обновляемой книги
    UPDATE author SET views = views + (SELECT b.views FROM book b WHERE b.id = OLD.id) WHERE id = NEW.author_id;
    END IF;
  END//

UPDATE book SET author_id=140 WHERE id=48;





# ------------------------------------------------EXPLAIN,PROFILE + index---------------------------------------------------------------

SET profiling = 0;
SET profiling_history_size = 0;
SET profiling_history_size = 100;
SET profiling = 1;
SHOW PROFILE FOR QUERY 402;

SELECT * FROM book WHERE name='Посмертные записки Пиквикского клуба';
SELECT * FROM book ORDER BY name;
CREATE INDEX index1 ON book(name);
SELECT * FROM book ORDER BY name;

SHOW PROFILES;



USE sql_ex_computer;
DELIMITER //
CREATE PROCEDURE `rows_generator`(IN min INT, IN max INT)
  BEGIN
    DECLARE `index` INT DEFAULT min;

    WHILE `index` < max DO
      INSERT INTO Product VALUES ('B', `index`, 'PC');
      INSERT INTO PC(model, speed, ram, hd, cd, price) VALUES (`index`,500,64,5,concat('12x',`index`),600);
      SET `index` = `index` + 1;
    END WHILE;
  END//

CALL rows_generator(3000, 4999);

EXPLAIN SELECT * FROM Product, PC WHERE PC.cd LIKE '%12%' ORDER BY PC.cd;

CREATE INDEX index_pc_cd ON PC(cd);

SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd;
SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd;
SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd;
SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd;
SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd;
SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd;
SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd;
SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd;
SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd;

SHOW PROFILES;

-- при большом количестве не повторяющихся записей (около 8000 строк) 
-- разница в выборке с индексом и без него почти 10-кратная:

# с индексом (CREATE INDEX index_pc_cd ON PC(cd)):
# query_id    duration      query
# 10061	    0.00048825	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10062	    0.00036650	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10063	    0.00023600	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10064	    0.00025250	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10065	    0.00026275	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10066	    0.00023075	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10067	    0.00024250	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10068	    0.00043200	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10069	    0.00026600	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10070	    0.00023450	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# после удаления индекса:
# query_id    duration      query
# 10073	    0.00426150	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10074	    0.00294475	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10075	    0.00193200	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10076	    0.00198300	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10077	    0.00195475	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10078	    0.00200175	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10079	    0.00278550	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10080	    0.00199400	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
# 10081	    0.00243475	  SELECT * FROM PC WHERE PC.cd ='12x4500' ORDER BY PC.cd
USE sql_ex_computer;
EXPLAIN SELECT * FROM PC; -- type = ALL
EXPLAIN SELECT * FROM PC WHERE PC.price = 600; -- type = ALL
EXPLAIN SELECT * FROM PC WHERE PC.cd = '12x4500'; -- type = ref (работает созданный мной индекс index_pc_cd)
EXPLAIN SELECT * FROM Product WHERE maker = 'A'; -- type = ALL
EXPLAIN SELECT * FROM Product WHERE model = '1232'; -- type = const (работает дефолтный индекс MySQL)
use sql_ex_inc_out;
EXPLAIN SELECT * FROM Income_o WHERE point = 1 AND  date < '2001-03-24'; -- type = range



# ------------------------- План запроса ORACLE --------------------------------------
-- сначало это
EXPLAIN PLAN FOR
SELECT ROW_NUMBER() OVER(ORDER BY ORDER_TYPE) as num, NOTICE_ID, ORDER_ID, ORDER_NAME,ORDER_TYPE,STATUS FROM NOTIF_Z.NOTICE;
-- потом просмотр результатов
SELECT*FROM TABLE(dbms_xplan.display(NULL,NULL,'basic'));-- вар 1
SELECT PLAN_TABLE_OUTPUT FROM TABLE(DBMS_XPLAN.DISPLAY());-- вар 2 - более информативный


-- пример 1 (нет индекса на столбец-фильтр)
EXPLAIN PLAN for
SELECT * FROM NOTIF_Z.ORDERS o WHERE o.PLACER_ORG_ROLE = 'OA';
SELECT PLAN_TABLE_OUTPUT FROM TABLE(DBMS_XPLAN.DISPLAY());-- вар 2 - более информативный
# ----------------------------------------------------------------------------
# | Id  | Operation         | Name   | Rows  | Bytes | Cost (%CPU)| Time     |
# ----------------------------------------------------------------------------
# |   0 | SELECT STATEMENT  |        |    95 | 18430 |     5   (0)| 00:00:01 |
# |*  1 |  TABLE ACCESS FULL| ORDERS |    95 | 18430 |     5   (0)| 00:00:01 | полный перебор всех строк таблицы
# ----------------------------------------------------------------------------

-- пример 2 (все данные из индекса)
EXPLAIN PLAN for
SELECT o.ORDER_ID FROM NOTIF_Z.ORDERS o;
SELECT PLAN_TABLE_OUTPUT FROM TABLE(DBMS_XPLAN.DISPLAY());-- вар 2 - более информативный
# ------------------------------------------------------------------------------
# | Id  | Operation        | Name      | Rows  | Bytes | Cost (%CPU)| Time     |
# ------------------------------------------------------------------------------
# |   0 | SELECT STATEMENT |           |   380 |  1900 |     1   (0)| 00:00:01 |
# |   1 |  INDEX FULL SCAN | PK_ORDERS |   380 |  1900 |     1   (0)| 00:00:01 |
# ------------------------------------------------------------------------------


-- пример 3 (есть индекс на столбец-фильтр - не уникальный)
EXPLAIN PLAN for
SELECT * FROM NOTIF_Z.ORDERS o WHERE o.ORGANIZATION_ID = 11988;
SELECT PLAN_TABLE_OUTPUT FROM TABLE(DBMS_XPLAN.DISPLAY());-- вар 2 - более информативный
# ----------------------------------------------------------------------------------------------------------
# | Id  | Operation                   | Name                       | Rows  | Bytes | Cost (%CPU)| Time     |
# ----------------------------------------------------------------------------------------------------------
# |   0 | SELECT STATEMENT            |                            |     1 |   194 |     2   (0)| 00:00:01 |
# |   1 |  TABLE ACCESS BY INDEX ROWID| ORDERS                     |     1 |   194 |     2   (0)| 00:00:01 |
# |*  2 |   INDEX RANGE SCAN          | IDX_ORDERS_ORGANIZATION_ID |     1 |       |     1   (0)| 00:00:01 | поиск по индексу
# ----------------------------------------------------------------------------------------------------------



-- пример 4 (есть индекс на столбец-фильтр - уникальный)
EXPLAIN PLAN for
SELECT * FROM NOTIF_Z.ORDERS o WHERE o.ORDER_ID = 10281;
SELECT PLAN_TABLE_OUTPUT FROM TABLE(DBMS_XPLAN.DISPLAY());-- вар 2 - более информативный
# -----------------------------------------------------------------------------------------
# | Id  | Operation                   | Name      | Rows  | Bytes | Cost (%CPU)| Time     |
# -----------------------------------------------------------------------------------------
# |   0 | SELECT STATEMENT            |           |     1 |   194 |     1   (0)| 00:00:01 |
# |   1 |  TABLE ACCESS BY INDEX ROWID| ORDERS    |     1 |   194 |     1   (0)| 00:00:01 |
# |*  2 |   INDEX UNIQUE SCAN         | PK_ORDERS |     1 |       |     0   (0)| 00:00:01 | поиск по уникальному индексу
# -----------------------------------------------------------------------------------------



-- пример 5 (поиск напрямую по системному указателю ROWID)
EXPLAIN PLAN for
SELECT * FROM NOTIF_Z.ORDERS o WHERE o.ROWID = 'AABBRHAAKAAAAMSAAF';
SELECT PLAN_TABLE_OUTPUT FROM TABLE(DBMS_XPLAN.DISPLAY());-- вар 2 - более информативный
# -------------------------------------------------------------------------------------
# | Id  | Operation                  | Name   | Rows  | Bytes | Cost (%CPU)| Time     |
# -------------------------------------------------------------------------------------
# |   0 | SELECT STATEMENT           |        |     1 |   194 |     1   (0)| 00:00:01 |
# |   1 |  TABLE ACCESS BY USER ROWID| ORDERS |     1 |   194 |     1   (0)| 00:00:01 | поиск по ROWID
# -------------------------------------------------------------------------------------



# ----------------------------------------Пользователи и права доступа--------------------------------------------------
# Авторизация в MySQL:
# sudo mysql --user=root --password=4
# Для выхода:
# exit
CREATE USER 'owner' IDENTIFIED BY '4';
CREATE USER 'aplib_owner' IDENTIFIED BY '4';
CREATE USER 'user_only_select' IDENTIFIED BY '4';
CREATE USER 'user_dml_select' IDENTIFIED BY '12345';

#GRANT [тип прав] ON [имя базы данных].[имя таблицы] TO ‘non-root’@'localhost’;
GRANT ALL PRIVILEGES ON *.* TO 'owner';
GRANT GRANT OPTION ON *.* TO 'owner';
GRANT ALL PRIVILEGES ON aplib.* TO 'aplib_owner';
GRANT SELECT ON *.* TO 'user_only_select';
GRANT SELECT, INSERT, UPDATE, DELETE ON *.* TO 'user_dml_select';
FLUSH PRIVILEGES;

# user_dml_select до REVOKE
USE sql_ex_computer;
SELECT * FROM PC WHERE PC.cd ='12x' ORDER BY PC.cd; # Ok
INSERT INTO Product VALUES ('B', '9999', 'PC'); # Ok
ALTER TABLE PC CHANGE model model_1 VARCHAR(50) NOT NULL; # - ALTER command denied to user 'user_dml_select'

# REVOKE
REVOKE SELECT ON *.* FROM 'user_dml_select';
FLUSH PRIVILEGES;

# user_dml_select после REVOKE
INSERT INTO Product VALUES ('B', '19991', 'PC'); # - ok
SELECT * FROM PC WHERE PC.cd ='12x' ORDER BY PC.cd; # - SELECT command denied to user 'user_dml_select'

SELECT User,Host FROM mysql.user;
SHOW GRANTS FOR user_dml_select;
SHOW GRANTS FOR 'owner';