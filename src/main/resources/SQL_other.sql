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



# -------------------------------------------различные примеры----------------------------------------------------------
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


#COUNT
UPDATE Product p SET p.maker = NULL WHERE p.type = 'Laptop';
SELECT count(         maker) FROM Product;#выдаст кол-во не-NULL значений данного столбца
SELECT count(DISTINCT maker) FROM Product;#выдаст кол-во уникальных не-NULL значений данного столбца

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


#Рекурсия (для MSSQL)
WITH Letters AS(
SELECT ASCII('A') code, CHAR(ASCII('A')) letter
UNION ALL
SELECT code+1, CHAR(code+1) FROM Letters
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