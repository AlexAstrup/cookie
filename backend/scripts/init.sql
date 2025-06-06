CREATE SCHEMA test
    AUTHORIZATION alexander;

CREATE TABLE test.BDT_background_train
(
  one   FLOAT,
  two   FLOAT,
  three FLOAT
);
CREATE TABLE test.BDT_background_test
(
  one   FLOAT,
  two   FLOAT,
  three FLOAT
);
CREATE TABLE test.BDT_signal_train
(
  one   FLOAT,
  two   FLOAT,
  three FLOAT
);
CREATE TABLE test.BDT_signal_test
(
  one   FLOAT,
  two   FLOAT,
  three FLOAT
);
COPY test.BDT_background_train FROM '/data/BDT_background_train.csv' DELIMITER ',' CSV HEADER;
COPY test.BDT_background_test FROM '/data/BDT_background_test.csv' DELIMITER ',' CSV HEADER;
COPY test.BDT_signal_train FROM '/data/BDT_signal_train.csv' DELIMITER ',' CSV HEADER;
COPY test.BDT_signal_test FROM '/data/BDT_signal_test.csv' DELIMITER ',' CSV HEADER;