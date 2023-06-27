-- Create the "people" table
CREATE TABLE people (
  id INTEGER PRIMARY KEY,
  name VARCHAR,
  birthdate DATE,
  preferred_contact_method INTEGER,
  groups INTEGER,
  FOREIGN KEY (groups) REFERENCES groups(id),
  FOREIGN KEY (preferred_contact_method) REFERENCES contact_methods(id)
);

-- Create the "groups" table
CREATE TABLE groups (
  id INTEGER PRIMARY KEY,
  title VARCHAR,
  sortorder INTEGER
);

-- Create the "contact_methods" table
CREATE TABLE contact_methods (
  id INTEGER PRIMARY KEY,
  title VARCHAR
);

-- Insert data into the "people" table
INSERT INTO people (id, name, birthdate, preferred_contact_method, groups) VALUES
(1, 'John Doe', '1990-01-01', 1, 1),
(2, 'Jane Smith', '1985-05-10', 2, 1),
(3, 'Alice Johnson', '1992-08-15', 2, 2),
(4, 'Bob Williams', '1988-11-20', 1, 2),
(5, 'Emma Brown', '1994-03-25', 1, 3);

-- Insert data into the "groups" table
INSERT INTO groups (id, title, sortorder) VALUES
(1, 'Group A', 1),
(2, 'Group B', 2),
(3, 'Group C', 3),
(4, 'Group D', 4),
(5, 'Group E', 5);

-- Insert data into the "contact_methods" table
INSERT INTO contact_methods (id, title) VALUES
(1, 'Email'),
(2, 'Phone'),
(3, 'SMS'),
(4, 'Mail'),
(5, 'In-person');
