-- Create the "tasks" table
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY,
  title VARCHAR,
  complete BOOLEAN
);

-- Insert data into the "people" table
INSERT INTO tasks (id, title, complete) VALUES
(1, 'Do something', false);