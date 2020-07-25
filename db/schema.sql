DROP DATABASE IF EXISTS webex_product;
CREATE DATABASE webex_product;

DROP TABLE IF EXISTS products;
CREATE TABLE products(
   id SERIAL PRIMARY KEY,
   name TEXT,
   status_progress TEXT,
   status_provider TEXT,
   complicity  INTEGER NOT NULL,
   owner_id INTEGER NOT NULL,
   resources INTEGER,
   price INTEGER,
   provider TEXT
   start_date date,
   end_date date
);



