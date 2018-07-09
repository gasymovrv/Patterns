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


# --------------------------------------------------24------------------------------------------------------------------
# Перечислите номера моделей любых типов, имеющих самую высокую цену по всей имеющейся в базе данных продукции.

# Справка по теме:
# Объединение
# Получение итоговых значений
# Подзапросы
# CTE
/*
Вариант для Oracle:
WITH t1(model, price) as (
  SELECT model, price FROM PC
  UNION
  SELECT model, price FROM Laptop
  UNION
  SELECT model, price FROM Printer
)
SELECT model FROM t1
........
 */
USE sql_ex_computer;
SELECT model FROM (
 SELECT model, price FROM PC
 UNION
 SELECT model, price FROM Laptop
 UNION
 SELECT model, price FROM Printer
) t1
WHERE price = (
 SELECT MAX(price) FROM (
  SELECT price FROM PC
  UNION
  SELECT price FROM Laptop
  UNION
  SELECT price FROM Printer
  ) t2
 );

# --------------------------------------------------25------------------------------------------------------------------
# Найдите производителей принтеров, которые производят ПК с наименьшим объемом RAM и с самым быстрым процессором среди всех ПК, имеющих наименьший объем RAM. Вывести: Maker

# Справка по теме:
# Явные операции соединения
# Подзапросы
# Получение итоговых значений
# Предикат IN
USE sql_ex_computer;
SELECT DISTINCT maker FROM Product
WHERE model IN (
  SELECT model FROM PC
  WHERE ram = (
    SELECT MIN(ram) FROM PC
  )
  AND speed = (
    SELECT MAX(speed) FROM PC WHERE ram = (
      SELECT MIN(ram) FROM PC
    )
  )
)
AND
maker IN (
  SELECT maker FROM Product WHERE type = 'printer'
);

# ---------------------------------------------------26-----------------------------------------------------------------
# Найдите среднюю цену ПК и ПК-блокнотов, выпущенных производителем A (латинская буква). Вывести: одна общая средняя цена.

# Справка по теме:
# Явные операции соединения
# Подзапросы
# Объединение
# Получение итоговых значений
USE sql_ex_computer;
SELECT AVG(price)
FROM (
       SELECT p.price
       FROM PC p
         JOIN Product prod ON p.model = prod.model
       WHERE prod.maker = 'A'
       UNION ALL
       SELECT l.price
       FROM Laptop l
         JOIN Product prod ON l.model = prod.model
       WHERE prod.maker = 'A'
     ) t1;

# ---------------------------------------------------27-----------------------------------------------------------------
# Найдите средний размер диска ПК каждого из тех производителей, которые выпускают и принтеры. Вывести: maker, средний размер HD.

# Справка по теме:
# Получение итоговых значений
# Явные операции соединения
# Предикат IN
USE sql_ex_computer;
SELECT
  maker,
  AVG(hd)
FROM (
       SELECT
         prod.maker,
         p.hd
       FROM PC p
         JOIN Product prod ON p.model = prod.model
       WHERE prod.maker in (SELECT prod2.maker FROM Product prod2 WHERE prod2.type = 'Printer')
     ) t1
GROUP BY maker;

# ---------------------------------------------------28-----------------------------------------------------------------
# Используя таблицу Product, определить количество производителей, выпускающих по одной модели.

# Справка по теме:
# Предложение GROUP BY
# Предложение HAVING
# Подзапросы
USE sql_ex_computer;
SELECT COUNT(maker)
FROM Product
WHERE maker IN (SELECT
                  maker
                FROM Product
                GROUP BY maker
                HAVING COUNT(model) = 1);

# ---------------------------------------------------29-----------------------------------------------------------------
# В предположении, что приход и расход денег на каждом пункте приема фиксируется не чаще одного раза в день [т.е. первичный ключ (пункт, дата)],
# написать запрос с выходными данными (пункт, дата, приход, расход).
# Использовать таблицы Income_o и Outcome_o.

# Справка по теме:
# Явные операции соединения
# Объединение
# Оператор CASE
USE sql_ex_inc_out;
SELECT
  i.point,
  i.date,
  CASE
  WHEN i.inc IS NULL
    THEN '-'
  ELSE CAST(i.inc AS CHAR(20))
  END 'inc',
  CASE
  WHEN o.`out` IS NULL
    THEN '-'
  ELSE CAST(o.`out` AS CHAR(20))
  END 'out'
FROM Income_o i
  LEFT JOIN Outcome_o o ON i.point = o.point AND i.date = o.date
UNION
SELECT
  o.point,
  o.date,
  CASE
  WHEN i.inc IS NULL
    THEN '-'
  ELSE CAST(i.inc AS CHAR(20))
  END,
  CASE
  WHEN o.`out` IS NULL
    THEN '-'
  ELSE CAST(o.`out` AS CHAR(20))
  END
FROM Outcome_o o
  LEFT JOIN Income_o i ON o.point = i.point AND o.date = i.date;

# ---------------------------------------------------30-----------------------------------------------------------------
# В предположении, что приход и расход денег на каждом пункте приема фиксируется произвольное число раз (первичным ключом в таблицах является столбец code),
# требуется получить таблицу, в которой каждому пункту за каждую дату выполнения операций будет соответствовать одна строка.
# Вывод: point, date, суммарный расход пункта за день (out), суммарный приход пункта за день (inc).
# Отсутствующие значения считать неопределенными (NULL).

# Справка по теме:
# Предложение GROUP BY
# Внешние соединения
# Объединение
USE sql_ex_inc_out;
#Вариант с вью
/*
CREATE VIEW view_income AS
  SELECT
    i.point,
    i.date,
    SUM(i.inc) sum_inc
  FROM Income i
  GROUP BY i.point, i.date;

CREATE VIEW view_outcome AS
  SELECT
    o.point,
    o.date,
    SUM(o.out) sum_out
  FROM Outcome o
  GROUP BY o.point, o.date;

SELECT vi.point, vi.date, vo.sum_out, vi.sum_inc FROM view_income vi
  LEFT JOIN view_outcome vo ON vi.point = vo.point AND vi.date = vo.date
UNION
SELECT vo.point, vo.date, vo.sum_out, vi.sum_inc FROM view_outcome vo
  LEFT JOIN view_income vi ON vi.point = vo.point AND vi.date = vo.date
*/
#Вариант с CTE
SELECT
  vi.point,
  vi.date,
  vo.sum_out,
  vi.sum_inc
FROM (SELECT
        i.point,
        i.date,
        SUM(i.inc) sum_inc
      FROM Income i
      GROUP BY i.point, i.date) vi
  LEFT JOIN (SELECT
               o.point,
               o.date,
               SUM(o.out) sum_out
             FROM Outcome o
             GROUP BY o.point, o.date) vo ON vi.point = vo.point AND vi.date = vo.date
UNION
SELECT
  vo.point,
  vo.date,
  vo.sum_out,
  vi.sum_inc
FROM (SELECT
        o.point,
        o.date,
        SUM(o.out) sum_out
      FROM Outcome o
      GROUP BY o.point, o.date) vo
  LEFT JOIN (SELECT
               i.point,
               i.date,
               SUM(i.inc) sum_inc
             FROM Income i
             GROUP BY i.point, i.date) vi ON vi.point = vo.point AND vi.date = vo.date
