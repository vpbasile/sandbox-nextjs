// Retrieves the table myTable from ./test.db

const express = require("express");
const sqlite3 = require('sqlite3');
const cors = require('cors');

// <> Useful types
type errType = { message: any; };
type rowType = string | any[];
type dbResponse = { error: any } | {
  serverUpSince: string;
  baseURL: string;
  tableName: string;
  rowsReturned: number;
  dbResponse: rowType;
};
type reqType = {
  params: any,
  body?: fixme;
  method: fixme;
  headers: fixme;
};

type fixme = any;

type resType = {
  status: (arg0: number) => {
    (): fixme;
    new(): fixme;
    json: fixme;
    end?: fixme
  };
  send: fixme;
};

// <> Initialize the app
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line to parse JSON request bodies

// <> Define the databases
type dbProfile = { name: string, path: string }
const databaseList: dbProfile[] = [
  // These paths will end up finding the database in the application root directory.  Later, I'd like to store it in the sever directory, but for now that'a not important
  { name: 'people', path: './people.db' },
  { name: 'notes', path: './notes.db' },
  { name: 'trivia', path: './trivia.db' },
  { name: "habits", path: "./habits.db" }
]

function dbProfile(dbName: string): dbProfile | undefined { return databaseList.find((eachDB) => { return eachDB.name === dbName; }); }

// <> Listen on port 8000 and log the url to the console.
const HTTP_PORT = 8000
const baseURL = `http://localhost:${HTTP_PORT}/`

function timestamp() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return hours + ":" + minutes + ":" + seconds;
}
const serverStartTime = timestamp();

app.listen(HTTP_PORT, () => {
  console.log(`Start time: ${serverStartTime}`)
  console.log("Server is listening on port " + HTTP_PORT);
  console.log(baseURL)
});

// <> Utility functions
function structureResponse(rows: rowType, tableName: string): dbResponse {
  return {
    serverUpSince: serverStartTime,
    baseURL: 'http://localhost:8000/',
    tableName: tableName,
    rowsReturned: rows.length,
    dbResponse: rows
  };
}

// Default GET
const defaultRoute = app.get("/", (req: reqType, res: resType, next: any) => {
  // <> Select a database
  const selectedDB = databaseList[0];

  // <> Connect to the Database
  const dbPath = selectedDB.path;
  const db = new sqlite3.Database(dbPath, (err: errType) => {
    if (err) {
      console.error(`Error opening database ${selectedDB.name}: ` + err.message);
    } else {
      console.log(`Database ${selectedDB.name} found at ` + dbPath)
    }
  });


  const tableName = 'people'
  db.all("SELECT * FROM " + tableName, [], (err: errType, rows: rowType) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    } else {
      res.status(200).json(structureResponse(rows, tableName));
      return;
    }
  });
})

// GET with a dbName - return a list of all tables in that database

// GET trivia
app.get("/trivia/questions", (req: reqType, res: resType, next: any) => {
  // <> Select a database
  const dbName = req.params.dbName;
  const selectedDB = databaseList.find((eachDB) => { return eachDB.name === "trivia" });
  if (selectedDB === undefined) { console.error(`Database ${dbName} not found.`); }
  else {
    // <> Connect to the Database
    const dbPath = selectedDB.path;
    const db = new sqlite3.Database(dbPath, (err: errType) => {
      if (err) {
        console.error(`Error opening database ${selectedDB.name}: ` + err.message);
      } else {
        console.log(`Database ${selectedDB.name} found at ` + dbPath)
        db.all(`SELECT * FROM questions`, [], (err: errType, rows: rowType) => {
          console.log(rows);
          if (err) {
            res.status(400).json({ "error": err.message });
            return;
          } else {
            res.status(200).json(structureResponse(rows, `questions`));
            return;
          }
        })
      }
    });
  }

})

// GET habits
app.get("/habits", (req: reqType, res: resType, next: any) => {
  // <> Select a database
  const dbName = "habits";
  const selectedDB = dbProfile(dbName);
  if (selectedDB === undefined) { console.error(`Database ${dbName} not found.`); }
  const rows = [
    { "name": "Strech lower back and legs", "category": "self-care", "complete": false },
    { "name": "Take a walk", "category": "activity", "complete": false },
    { "name": "Meditate", "category": "self-care", "complete": false },
    { "name": "Make a meal", "category": "creativity", "complete": false },
    { "name": "Clean living space", "category": "maintenance", "complete": false },
    { "name": "Draw Something", "category": "creativity", "complete": false },
    { "name": "Learn some Spanish", "category": "learning", "complete": false },
    { "name": "Write something", "category": "creativity", "complete": false },
    { "name":"Find my keys", "category": "", "complete": false}
    // { "name":, "category": , "complete": false}

  ]
  res.status(200).json(structureResponse(rows, `questions`));
  // else {
  //   // <> Connect to the Database
  //   const dbPath = selectedDB.path;
  //   const db = new sqlite3.Database(dbPath, (err: errType) => {
  //     if (err) {
  //       console.error(`Error opening database ${selectedDB.name}: ` + err.message);
  //     } else {
  //       console.log(`Database ${selectedDB.name} found at ` + dbPath)
  //       db.all(`SELECT * FROM habits`, [], (err: errType, rows: rowType) => {
  //         console.log(rows);
  //         if (err) {
  //           res.status(400).json({ "error": err.message });
  //           return;
  //         } else {
  //           res.status(200).json(structureResponse(rows, `questions`));
  //           return;
  //         }
  //       })
  //     }
  //   });
  // }

})

// GET with a dbName and tableName
app.get("/:dbName/:tableName", (req: reqType, res: resType, next: any) => {
  const tableName = req.params.tableName;
  // <> Select a database
  const dbName = req.params.dbName;
  const selectedDB = databaseList.find((eachDB) => { return eachDB.name === dbName });
  if (selectedDB === undefined) { console.error(`Database ${dbName} not found.`); }
  else {
    // <> Connect to the Database
    const dbPath = selectedDB.path;
    const db = new sqlite3.Database(dbPath, (err: errType) => {
      if (err) {
        console.error(`Error opening database ${selectedDB.name}: ` + err.message);
      } else {
        console.log(`Database ${selectedDB.name} found at ` + dbPath)
        db.all(`SELECT * FROM ` + tableName, [], (err: errType, rows: rowType) => {
          if (err) {
            res.status(400).json({ "error": err.message });
            return;
          } else {
            res.status(200).json(structureResponse(rows, tableName));
            return;
          }
        })
      }
    });
  }

})

// POST

app.post("/trivia/save/", (req: reqType, res: resType) => {
  try {
    const now = timestamp();
    console.log("Route reached at " + now);
    // If it's not a POST, disallow it.
    if (req.method !== 'POST') return res.status(405).end(); // Method not allowed
    // Ok, now let's do the stuff
    const selectedDB = databaseList[2];
    const question = req.body;
    console.log(`Received a`, question.categoryTag, `question from the client.`);
    // <> Connect to the Database
    const dbPath = selectedDB.path;
    const db = new sqlite3.Database(dbPath, (err: errType) => {
      if (err) {
        console.error(`Error opening database ${selectedDB.name}: ` + err.message);
      } else {
        // Database found
        console.log(`Database ${selectedDB.name} found at ` + dbPath)
        // Does the question already exist in the database?  If so, no need to save it
        db.run(`SELECT * FROM questions WHERE questionText = ?`, question.questionText, function (err: errType, rows: rowType) {
          if (err) res.status(500).json({ error: 'Failed to check for duplicates.' });
          else {
            if (rows) {
              console.log(`The question already exists in the database.  Not saving.`)
              return false;
            } else {

              // Add the question to the database
              const categoryTag = question.categoryTag;
              db.run('INSERT INTO questions (questionText, choices, correctIndex, categoryTag) VALUES (?, ?, ?, ?)', [question.questionText, JSON.stringify(question.choices), question.correctIndex, categoryTag], function (err: errType) {
                if (err) {
                  console.error(`Error saving question: ${err.message}`);
                  res.status(500).json({ error: 'Failed to save question.' });
                } else {
                  console.log(`Question saved. Category: ${categoryTag}`);
                  // Now respond
                  res.status(200).json({ message: 'Question saved successfully.' });
                }
              });
            }
          }
        })

      }
    })
  }
  catch (error) {
    console.error("Error encountered:", error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
})

app.post("/notes/tasks/stamp/", (req: reqType, res: resType, next: any) => {
  console.log(`Server request received:`, req.body)
  try {
    const now = timestamp();
    console.log("Route reached at " + now);
    // If it's not a POST, disallow it.
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method not allowed
    }
    let { taskTitle } = req.body;
    console.log(`Server attempting to create task titled ${taskTitle}.`)
    // <> Select a database
    const selectedDB = databaseList[1];
    // <> Connect to the Database
    const dbPath = selectedDB.path;
    const db = new sqlite3.Database(dbPath, (err: errType) => {
      if (err) {
        console.error(`Error opening database ${selectedDB.name}: ` + err.message);
      } else {
        // Now that the db connection is open, insert the data
        console.log(`Database ${selectedDB.name} found at ` + dbPath)
        const queryString = 'INSERT INTO tasks (title, complete) VALUES (?, ?)';
        console.log(`Prepared query string: ${queryString}`)
        const params = [taskTitle, false];

        db.run(queryString, params, function (err: errType) {
          if (err) {
            console.error(`Error inserting task: ${err.message}`);
            res.status(500).json({ error: 'Failed to create task.' });
          } else {
            console.log(`New task inserted with title: ${taskTitle}`);
            // Now respond
            res.status(200).json({ message: 'Task created successfully.' });
          }
        });
        // Now respond
        // res.status(200).json(structureResponse([queryString], "tasks"));
        return;
      }
    });
  } catch (error) {
    console.error("Error encountered:", error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
})
