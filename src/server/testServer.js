// Retrieves the table myTable from ./test.db

const express = require("express");
const sqlite3 = require('sqlite3');
var app = express();

// <> Listen on port 8000 and log the url to the console.
const HTTP_PORT = 8000
const baseURL = `http://localhost:${HTTP_PORT}`
const testURL = baseURL + `/people`;

const startTime = new Date();
const startTimeDisplay = startTime.getHours() + ":" + startTime.getMinutes() + ":" + startTime.getSeconds();

app.listen(HTTP_PORT, () => {
  console.log(`Start time: ${startTimeDisplay}`)
  console.log("Server is listening on port " + HTTP_PORT);
  console.log(baseURL + `/test/3`)
  console.log(testURL)

});

const dbPath = './test.db';
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    console.log("Database found at " + dbPath)
  }
});

// Default GET
app.get("/test/:id", (req, res, next) => {
  const statusCode = 200
  const id = req.params.id
  let myObject = {
    numberEntered: id,
    status: statusCode,
    serverUpSince: startTimeDisplay,
    testURL: 'http://localhost:8000/people'
  }
  res.status(statusCode).json(myObject)
  return;
})

app.get("/people", (req, res, next) => {

  const holdThis = db.all("SELECT * FROM myTable", [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json({ rows });
  });
  console.log(holdThis);
});