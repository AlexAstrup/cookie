CREATE SCHEMA test
    AUTHORIZATION alexander;

CREATE TABLE test.bdt_background_train
(
  id    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  one   FLOAT,
  two   FLOAT,
  three FLOAT
);
CREATE TABLE test.bdt_background_test
(
  id    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  one   FLOAT,
  two   FLOAT,
  three FLOAT
);
CREATE TABLE test.bdt_signal_train
(
  id    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  one   FLOAT,
  two   FLOAT,
  three FLOAT
);
CREATE TABLE test.bdt_signal_test
(
  id    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  one   FLOAT,
  two   FLOAT,
  three FLOAT
);
COPY test.bdt_background_train (one, two, three) FROM '/data/BDT_background_train.csv' DELIMITER ',' CSV HEADER;
COPY test.bdt_background_test (one, two, three) FROM '/data/BDT_background_test.csv' DELIMITER ',' CSV HEADER;
COPY test.bdt_signal_train (one, two, three) FROM '/data/BDT_signal_train.csv' DELIMITER ',' CSV HEADER;
COPY test.bdt_signal_test (one, two, three) FROM '/data/BDT_signal_test.csv' DELIMITER ',' CSV HEADER;