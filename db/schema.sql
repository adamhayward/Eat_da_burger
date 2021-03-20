DROP DATABASE IF EXISTS burger_DB;
CREATE DATABASE burger_DB;
USE burger_DB;

CREATE TABLE burgers (
    id INT AUTO_INCREMENT NOT NULL,
    burger VARCHAR(30) NOT NULL,
    consume BOOLEAN DEFAULT false,
    PRIMARY KEY(id)
);

