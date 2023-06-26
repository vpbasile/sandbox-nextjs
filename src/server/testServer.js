// Retrieves the table myTable from ./test.db

const express = require("express");
const sqlite3 = require('sqlite3');
const cors = require('cors');

var app = express();
app.use(cors());

// <> Listen on port 8000 and log the url to the console.
const HTTP_PORT = 8000
const baseURL = `http://localhost:${HTTP_PORT}/`

const startTime = new Date();
const startTimeDisplay = startTime.getHours() + ":" + startTime.getMinutes() + ":" + startTime.getSeconds();

app.listen(HTTP_PORT, () => {
  console.log(`Start time: ${startTimeDisplay}`)
  console.log("Server is listening on port " + HTTP_PORT);
  console.log(baseURL)
});

// <> Connect to the Database
const dbPath = './test.db';
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    console.log("Database found at " + dbPath)
  }
});

// Default GET
const defaultRoute = app.get("/", (req, res, next) => {
  let myObject
  db.all("SELECT * FROM people", [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    } else {
      myObject = {
        serverUpSince: startTimeDisplay,
        testURL: 'http://localhost:8000/',
        rowsReturned: rows.length,
        dbResponse: rows
      }
      res.status(200).json(myObject);
      return;
    }
  });
})

// GET with an input id
app.get("/:tableName", (req, res, next) => {
  let myObject
  const tableName = req.params.tableName;
  db.all(`SELECT * FROM `+ tableName, [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    } else {
      myObject = {
        serverUpSince: startTimeDisplay,
        baseURL: 'http://localhost:8000/',
        tableName: tableName,
        rowsReturned: rows.length,
        dbResponse: rows
      }
      res.status(200).json(myObject);
      return;
    }
  })
})