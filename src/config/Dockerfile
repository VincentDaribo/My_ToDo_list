FROM mariadb:latest as builder
WORKDIR /docker-entrypoint-initdb.d
COPY . .
CMD ["sed", "-i", "s/exec \"$@\"/echo \"not running $@\"/", "/usr/local/bin/docker-entrypoint.sh"]
ENV MYSQL_ROOT_PASSWORD=root
COPY ../../epytodo.sql .
CMD ["/usr/local/bin/docker-entrypoint.sh", "mysqld", "--datadir", "/initialized-db", "--aria-log-dir-path", "/initialized-db"]
FROM mariadb:latest
COPY --from=builder /initialized-db /var/lib/mysql