-- Create the "tasks" table
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY,
  title VARCHAR,
  complete BOOLEAN
);
-- Insert data into the "tasks" table
INSERT INTO tasks (title, complete)
VALUES ('Another Task', true),
  ('Place a red box around the hex board', false),
  (
    'Fix the display of all the form fields. Make them match the size of the text.',
    false
  ),
  ('Save board data to db.', false),
  ('Save hex roster to db.', false),
  ('Edit buttons should be links', false);

-- Update
  UPDATE tasks SET complete = 1 WHERE uid = 5;
