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
  body?: { id: any; token: any; geo: any; };
};
type resType = {
  status: (arg0: number) => {
    (): any;
    new(): any;
    json: {
      (arg0: dbResponse): void;
      new(): any;
    };
  };
  send: any;
};

// <> Initialize the app
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// <> Define the databases
type dbProfile = { name: string, path: string }
const databaseList: dbProfile[] = [
  // These paths will end up finding the database in the application root directory.  Later, I'd like to store it in the sever directory, but for now that'a not important
  { name: 'people', path: './people.db' },
  { name: 'notes', path: './notes.db' }
]

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
const startTimeDisplay = timestamp();

app.listen(HTTP_PORT, () => {
  console.log(`Start time: ${startTimeDisplay}`)
  console.log("Server is listening on port " + HTTP_PORT);
  console.log(baseURL)
});

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

function structureResponse(rows: rowType, tableName: string): dbResponse {
  return {
    serverUpSince: startTimeDisplay,
    baseURL: 'http://localhost:8000/',
    tableName: tableName,
    rowsReturned: rows.length,
    dbResponse: rows
  };
}

// POST
app.post("/notes/tasks/stamp/", (req: reqType, res: resType, next: any) => {
  const now = timestamp();
  console.log("Route reached at " + now);
  // <> Select a database
  const selectedDB = databaseList[1];
  // <> Connect to the Database
  const dbPath = selectedDB.path;
  const db = new sqlite3.Database(dbPath, (err: errType) => {
    if (err) {
      console.error(`Error opening database ${selectedDB.name}: ` + err.message);
    } else {
      console.log(`Database ${selectedDB.name} found at ` + dbPath)
      const queryString = `INSERT INTO tasks (title, complete) VALUES ("Task created at ${now}", false)`;
      // -- Insert data into the "tasks" table
      db.all(queryString)
      // Now respond
      res.status(200).json(structureResponse([queryString], "tasks"));
      return;
    }
  });
})