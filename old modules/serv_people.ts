// // const express = require("express");
// // const sqlite3 = require('sqlite3');
// // const cors = require('cors');

// // ---------------------------------------------
// // <> BEGIN UTILS
// // ---------------------------------------------


// // ---------------------------------------------
// // <> Types
// // ---------------------------------------------

// type fixme = any;
// // type errType = sqlite3.Error | null;
// type errType = fixme
// type rowType = string | any[];
// type dbRows = { error: any; } | {
//     serverUpSince: string;
//     baseURL: string;
//     tableName: string;
//     rowsReturned: number;
//     dbRows: rowType;
// };
// type reqType = {
//     params: any;
//     body?: fixme;
//     method: fixme;
//     headers: fixme;
// };
// type resType = {
//     status: (arg0: number) => {
//         (): fixme;
//         new(): fixme;
//         json: fixme;
//         end?: fixme;
//     };
//     send: fixme;
// };

// // ---------------------------------------------
// // <> Utility functions
// // ---------------------------------------------
// /**
//  * Puts the database response in a wrapper with some metadata
//  */
// /**
* zzzz
*/
/**
* zzzz
*/
function structureResponse(rows: rowType, tableName: string, serverStartTime: string): dbRows {
//     return {
//         serverUpSince: serverStartTime,
//         baseURL: 'http://localhost:8000/',
//         tableName: tableName,
//         rowsReturned: rows.length,
//         dbRows: rows
//     };
// }

// // ---------------------------------------------
// // <> END UTILS
// // ---------------------------------------------

// // <> Initialize the app
// var app = express();
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json()); // Add this line to parse JSON request bodies

// // <> Define the databases
// type dbProfile = { name: string, path: string }
// const databaseList: dbProfile[] = [
//     // These paths will end up finding the database in the application root directory.  Later, I'd like to store it in the sever directory, but for now that'a not important
//     { name: 'people', path: './people.db' },
//     { name: 'notes', path: './notes.db' },
//     { name: 'trivia', path: './trivia.db' },
// ]

// function dbProfile(dbName: string): dbProfile | undefined { return databaseList.find((eachDB) => { return eachDB.name === dbName; }); }

// // <> Listen on port 8000 and log the url to the console.
// const HTTP_PORT = 8000
// const baseURL = `http://localhost:${HTTP_PORT}/`

// function timestamp() {
//     const now = new Date();
//     const hours = now.getHours().toString().padStart(2, "0");
//     const minutes = now.getMinutes().toString().padStart(2, "0");
//     const seconds = now.getSeconds().toString().padStart(2, "0");
//     return hours + ":" + minutes + ":" + seconds;
// }
// const serverStartTime = timestamp();

// app.listen(HTTP_PORT, () => {
//     console.log(`Start time: ${serverStartTime}`)
//     console.log("Server is listening on port " + HTTP_PORT);
//     console.log(baseURL)
// });

// // <> FIXME Need to add a GET with a dbName - return a list of all tables in that database

// // GET with a dbName and tableName
// app.get("/:dbName/:tableName", (req: reqType, res: resType, next: any) => {
//     const tableName = req.params.tableName;
//     // <> Select a database
//     const dbName = req.params.dbName;
//     const selectedDB = databaseList.find((eachDB) => { return eachDB.name === dbName });
//     if (selectedDB === undefined) { console.error(`Database ${dbName} not found.`); }
//     else {
//         // <> Connect to the Database
//         const dbPath = selectedDB.path;
//         const db = new sqlite3.Database(dbPath, (err: errType) => {
//             if (err) {
//                 console.error(`Error opening database ${selectedDB.name}: ` + err.message);
//             } else {
//                 console.log(`Database ${selectedDB.name} found at ` + dbPath)
//                 db.all(`SELECT * FROM ` + tableName, [], (err: errType, rows: rowType) => {
//                     if (err) {
//                         res.status(400).json({ "error": err.message });
//                         return;
//                     } else {
//                         res.status(200).json(structureResponse(rows, tableName, serverStartTime));
//                         return;
//                     }
//                 })
//             }
//         });
//     }

// })

// // ---------------------------------------------
// // <> db_people
// // ---------------------------------------------
// // Default GET
// const defaultRoute = app.get("/", (req: reqType, res: resType, next: any) => {
//     // <> Select a database
//     const selectedDB = databaseList[0];

//     // <> Connect to the Database
//     const dbPath = selectedDB.path;
//     const db = new sqlite3.Database(dbPath, (err: errType) => {
//         if (err) {
//             console.error(`Error opening database ${selectedDB.name}: ` + err.message);
//         } else {
//             console.log(`Database ${selectedDB.name} found at ` + dbPath)
//         }
//         const tableName = 'people'
//         db.all("SELECT * FROM " + tableName, [], (err: errType, rows: rowType) => {
//             if (err) {
//                 res.status(400).json({ "error": err.message });
//                 return;
//             } else {
//                 res.status(200).json(structureResponse(rows, tableName, serverStartTime));
//                 return;
//             }
//         });
//     })

// })