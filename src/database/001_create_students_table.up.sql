 CREATE DATABASE student_portal;


 CREATE TABLE 
            students(id serial primary key, 
                       name varchar(100),
                       email varchar(100) unique, 
                       password varchar(225),
                       phone varchar(12));