USE y6ng0ky9fvcesrlo;

DROP TABLE burgers;

CREATE TABLE burgers (
  id INTEGER(10) AUTO_INCREMENT,
  burger_name VARCHAR(100),
  devoured BOOLEAN,
  burger_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO burgers (burger_name, devoured) VALUES ("Big Mac", FALSE);
INSERT INTO burgers (burger_name, devoured) VALUES ("Double Cheeseburger", FALSE);
INSERT INTO burgers (burger_name, devoured) VALUES ("Hamburger", FALSE);