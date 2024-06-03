CREATE TABLE BDT_background_train
(
  one   FLOAT,
  two   FLOAT,
  three FLOAT
);
CREATE TABLE BDT_background_test
(
  one   FLOAT,
  two   FLOAT,
  three FLOAT
);
CREATE TABLE BDT_signal_train
(
  one   FLOAT,
  two   FLOAT,
  three FLOAT
);
CREATE TABLE BDT_signal_test
(
  one   FLOAT,
  two   FLOAT,
  three FLOAT
);
COPY BDT_background_train FROM '/data/BDT_background_train.csv' DELIMITER ',' CSV HEADER;
COPY BDT_background_test FROM '/data/BDT_background_test.csv' DELIMITER ',' CSV HEADER;
COPY BDT_signal_train FROM '/data/BDT_signal_train.csv' DELIMITER ',' CSV HEADER;
COPY BDT_signal_test FROM '/data/BDT_signal_test.csv' DELIMITER ',' CSV HEADER;
