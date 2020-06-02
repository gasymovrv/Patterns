# Установка кафки
+ Полезные ссылки:
    + https://habr.com/ru/post/440400/
    + https://www.howtoforge.com/how-to-setup-apache-zookeeper-cluster-on-ubuntu-1804/
    + https://hevodata.com/blog/how-to-install-kafka-on-ubuntu/

+ Бинарники ставим сюда
```
/opt/zookeeper
/opt/kafka
```

+ Данные этих сервисов будем хранить тут
```
/var/zookeeper
/var/lib/kafka
```

# Работа с кафкой на VirtualBox
1. Открываем терминал 1
    + запуск зукиперов:
		```sudo /opt/zookeeper/bin/zkServer.sh start```
    + запуск кафки:
		```sudo /opt/kafka/bin/kafka-server-start.sh /opt/kafka/config/server.properties```

1. Открываем терминал 2
	+ создание топика (если его еще нет):
		```sudo /opt/kafka/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic "server.starship"```
 	+ создание продюсера:
		```sudo /opt/kafka/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic "server.starship"```

1. Открываем терминал 3
	+ создание консьюмера:
		```sudo /opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic "server.starship" --from-beginning```