-- БД та же, что и для AptechLibrary.
-- URL: jdbc:mysql://192.168.56.200:3306
-- Login: root
-- Password: 4
-- Схемы:
--    sql_ex_aero
--    sql_ex_computer
--    sql_ex_inc_out
--    sql_ex_painting
--    sql_ex_ships


-----------------------------------------------------24-----------------------------------------------------------------
-- Перечислите номера моделей любых типов, имеющих самую высокую цену по всей имеющейся в базе данных продукции.
-- Справка по теме:
-- Объединение
-- Получение итоговых значений
-- Подзапросы
-- CTE
SELECT model FROM (
 SELECT model, price FROM sql_ex_computer.PC
 UNION
 SELECT model, price FROM sql_ex_computer.Laptop
 UNION
 SELECT model, price FROM sql_ex_computer.Printer
) t1
WHERE price = (
 SELECT MAX(price) FROM (
  SELECT price FROM sql_ex_computer.PC
  UNION
  SELECT price FROM sql_ex_computer.Laptop
  UNION
  SELECT price FROM sql_ex_computer.Printer
  ) t2
 );

-----------------------------------------------------25-----------------------------------------------------------------
-- Найдите производителей принтеров, которые производят ПК с наименьшим объемом RAM и с самым быстрым процессором среди всех ПК, имеющих наименьший объем RAM. Вывести: Maker
-- Справка по теме:
-- Явные операции соединения
-- Подзапросы
-- Получение итоговых значений
-- Предикат IN
SELECT DISTINCT maker FROM sql_ex_computer.Product
WHERE model IN (
  SELECT model FROM sql_ex_computer.PC
  WHERE ram = (
    SELECT MIN(ram) FROM sql_ex_computer.PC
  )
  AND speed = (
    SELECT MAX(speed) FROM sql_ex_computer.PC WHERE ram = (
      SELECT MIN(ram) FROM sql_ex_computer.PC
    )
  )
)
AND
maker IN (
  SELECT maker FROM sql_ex_computer.Product WHERE type = 'printer'
);

-----------------------------------------------------26-----------------------------------------------------------------
-- Найдите среднюю цену ПК и ПК-блокнотов, выпущенных производителем A (латинская буква). Вывести: одна общая средняя цена.
-- Справка по теме:
-- Явные операции соединения
-- Подзапросы
-- Объединение
-- Получение итоговых значений

 