-- Create the "tasks" table
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY,
  title VARCHAR,
  complete BOOLEAN
);
-- Insert data into the "people" table
INSERT INTO tasks (title, complete)
VALUES ('Another Task', true),
  ('Place a red box around the hex board', false),
  ('Save board data to db.', false),
  ('Save hex roster to db.', false);