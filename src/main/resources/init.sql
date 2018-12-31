CREATE DATABASE clients;
CREATE USER 'Anica'@'%' IDENTIFIED BY 'Portfolio';
GRANT ALL ON clients.* to 'Anica'@'%';
