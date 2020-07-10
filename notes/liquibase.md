### Что такое liquibase, какие еще системы миграции бывают?
Система управления миграциями базы данных, бывают Flyway и Liquibase

### Что такое Database First Approach и Code First Approach, какие плюсы и минусы?
+ Database First Approach - сначала создаем БД и по ней генерим или руками создаем маппинг в коде
		чуть дольше, но БД будет хорошо спроектирована, к тому же обычно разработка начинается с описания таблиц
+ Code First Approach - сначала создаем сущности в коде и по ним генерим таблицы в БД
		наверно чуть быстрее, но подходит только для мальеньких проектов и чревато корявой структурой бд
	
### Как liqubase хранит свои файлы. Распишите таблицы и столбцы которые создает liquibase и их назначение
+ databasechangelog - таблица для отслеживания какие чейнджсеты уже отработали или упали с ошибкой, первичных ключей нет, каждый чейнджсет определяется уникально через “id”, “author”, и “filename”. tag - теги для отката
	
+ databasechangeloglock - для блокирования одновременного запуска нескольких инстансов ликви (как было например на приме, когда накатывали ликви на стенд)

### Как откатить миграцию liquibase?
по тегу, по порядку, по времени

+ через мавен плагин:
```
mvn liquibase:rollback -Dliquibase.rollbackTag=1.0
mvn liquibase:rollback -Dliquibase.rollbackCount=1
mvn liquibase:rollback "-Dliquibase.rollbackDate=Jun 03, 2017"
```
	
+ напрямую через ликвибейз (выполнять надо из директории ресурсов проекта):
```
D:\Programs\liquibase\liquibase-3.10.1\liquibase --url="jdbc:postgresql://localhost:5432/account_db" --classpath=D:\Programs\liquibase\postgresql-42.2.12.jar --driver=org.postgresql.Driver --username=postgres --password=password --changeLogFile=db\changelog\db.changelog-master.yaml --logLevel=info rollbackCount 1
```
```
D:\Programs\liquibase\liquibase-3.10.1\liquibase --url="jdbc:postgresql://localhost:5432/account_db" --classpath=D:\Programs\liquibase\postgresql-42.2.12.jar --driver=org.postgresql.Driver --username=postgres --password=password --changeLogFile=db\changelog\db.changelog-master.yaml --logLevel=info rollback 1.0
```
+ либо можно сгенерить SQL для отката:
```
mvn liquibase:rollbackSQL -Dliquibase.rollbackCount=5
```
		
### Что не может откатить liquibase?
+ автоматом может откатиться create table, rename column, add column, создание констрейнтов и другое для чего ликви может сгенерить SQL отката. Остальное (например drop table, insert, update и др.) должно содержать секцию rollback иначе при попытке отката выпадет ошибка