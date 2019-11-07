SET GLOBAL local_infile = 1;
DROP DATABASE IF EXISTS hw8;
create database hw8;
GRANT ALL PRIVILEGES ON hw8.* TO 'user'@'%' identified by 'pass';
use hw8;

CREATE TABLE assists
(
Player VARCHAR(20),
Club  VARCHAR(20),
POS VARCHAR(20),
GP VARCHAR(20),
GS VARCHAR(20),
GWA VARCHAR(20),
A VARCHAR(20),
HmA VARCHAR(20),
RdA VARCHAR(20),
min VARCHAR(20),
PRIMARY KEY (Player)
) ;
