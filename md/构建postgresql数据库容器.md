# 使用Docker构建psotgresql数据库容器

## 一、拉取镜像

```shell
docker pull postgres
```

## 二、启动容器

```shell
docker run --name containername --env POSTGRESQL_USER=wms --env POSTGRESQL_PASSWORD=111111 --env POSTGRESQL_DATABASE=wms -p 54321:5432 -v G:/"Program Files"/pgsql/data:/var/lib/pgsql/data f9b577fb1ed6
```

* containername容器名称必须全部小写

## 三、拷贝sql脚本到容器中

```
docker cp localpath containerID:path
```

* 如果需要将容器中文件拷贝到本地，只需要调换路径即可
* copy文件时不需要启动容器

## 四、进入容器

```shell
docker exec -it containerID /bin/bash

postgres
```

* 进入容器之后，用户是root，使用postgres，切换到postgres用户，因为root用户无法使用psql与数据库进行交互

## 五、初始化

> 使用postgres用户进入psql

```sql
# 创建一个用户username
CREATE USER username SUPERUSER PASSWORD 'password';

#创建一个databasename数据库属于user
CREATE DATABASE databasename OWNER user;

#将databasename数据库的所有权限赋予用户user
GRANT ALL PRIVILEGES ON DATABASE databasename to user;
```

* 注意：每条sql语句结束必须以";"结束，否则不能执行。

* 进入psql之后，可以使用help命令，查看命令帮助

* \dt 查看数据库是否创建成功

* \du 列出所有用户

* \l 列出所有数据库

* \q 退出

## 初始化数据库

> exit退出psql，切换到sql脚本所在的目录

```sql
psql -U user -d databse -f fig.sql
```
* 数据库初始化脚本执行完成之后，可以在本地连接容器中的数据库是否创建成功。

初次尝试运行容器并初始化；镜像是从DockerHub拉取,此种方法并不是最好的办法，只适合启动单个容器，初学者练习。如果需要构建Image使用 ***Dockerfile***，如果启动多个Container可以使用 ***docker compose***