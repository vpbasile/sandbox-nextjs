-- Create the "tasks" table
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY,
  title VARCHAR,
  complete BOOLEAN
);

-- Insert data into the "people" table
INSERT INTO tasks (id, title, complete) VALUES (2, 'Another Task', true);