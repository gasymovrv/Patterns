# Основные команды Docker
+ посмотреть имеющиеся образы
    ```
    sudo docker images
    sudo docker images -q # все IMAGE_ID образов
    ```
  
+ посмотреть все контейнеры
    ```
    sudo docker ps -a
    ```
  
+ посмотреть все запущенные контейнеры
    ```
    sudo docker ps
    ```
  
+ посмотреть/создать/удалить том (volume - это папка для обмена данными с контейнерами)
    ```
    sudo docker volume ls
    sudo docker volume create <имя тома (VOLUME_NAME)>
    sudo docker volume rm <имя тома>
    ```

+ зайти в контейнер консольным клиентом
    ```
    sudo docker exec -it <id или имя контейнера> /bin/bash
    ```
  
+ создать образ
    + Шаблоны
    ```
    sudo docker build -t <имя образа(колонка REPOSITORY)>[:<TAG>] <путь к проекту>
    ```
    + Примеры
    ```
    sudo docker build -t my-docker-test:demo .
    sudo docker build -t my-docker-test .
    ```
  
+ удалить образ
    + Шаблоны
    ```
    sudo docker rmi <имя образа или IMAGE_ID>
    ```
    + Примеры
    ```
    sudo docker rmi my-docker-test
    sudo docker rmi ace393ba5e96
    sudo docker rmi $(sudo docker images -q) # удалить все образы
    ```
  
+ запустить контейнер из образа
    + Шаблоны
    ```
    sudo docker run [--name <задать имя контейнера (колонка NAMES)>] [-d] [--rm] [-p <порт снаружи>:<порт внутри контейнера>] [-v <VOLUME_NAME>:<путь к данным контейнере>] <имя образа, может быть также удаленный из Docker-Hub>
    ```
    + Примеры
    ```
    sudo docker run my-docker-test
    sudo docker run --name my-docker-test_1 my-docker-test
    sudo docker run -d --rm my-docker-test # запуск в фоне + удаление контейнера после остановки
    sudo docker run -p 8080:8080 my-docker-test # проброс порта
    ```  
  
+ остановить контейнер
    + Шаблоны
    ```
    sudo docker stop <имя или id контейнера>
    ```
    + Примеры
    ```
    sudo docker stop 96e049a61ab2
    sudo docker stop my-docker-test_1
    ```
  
+ удалить контейнер
    + Шаблоны
    ```
    sudo docker rm <имя или id контейнера>
    ```
    + Примеры
    ```
    sudo docker rm 0a7b4142b6b2
    sudo docker rm my-docker-test_1
    sudo docker rm $(sudo docker ps -a -q) # удалить все контейнеры
    ```
  
+ удалить все остановленные контейнеры
    ```
    sudo docker rm $(sudo docker ps -a -f status=exited -q)
    ```
### Запуск моих докер-образов на VM
+ MySQL
    ```
    sudo docker run --name mysql_container -e MYSQL_ROOT_PASSWORD=4 -p 3306:3306 -d --rm -v mysql_volume:/var/lib/mysql mysql
    sudo docker exec -it mysql_container /bin/bash # вход в контейнер
    mysql -u root -p # вход в консоль mysql
    > quit # выход из консоли mysql
    sudo docker stop mysql_container # остановка контейнера
    ```
+ Portainer (GUI для докера)
    ```
    sudo docker run -d -p 9001:9000 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
    ```