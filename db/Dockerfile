FROM mysql

COPY init.sql /docker-entrypoint-initdb.d/init.sql

RUN chmod -R 777 /docker-entrypoint-initdb.d