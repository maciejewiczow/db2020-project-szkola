create user if not exists application;
CREATE DATABASE if not exists szkola character set UTF8MB4 collate utf8mb4_bin;
GRANT SELECT, UPDATE, INSERT, DELETE ON szkola.* TO application;
