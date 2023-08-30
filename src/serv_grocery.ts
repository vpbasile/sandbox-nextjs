const express = require("express");
const sqlite3 = require('sqlite3');
const cors = require('cors');

// ---------------------------------------------
// <> Utility Types
// ---------------------------------------------

type fixme = any;
// type errType = sqlite3.Error | null;
type errType = fixme
type rowType = any[];
type dbRows = { error: any; } | {
    serverUpSince: string;
    baseURL: string;
    tableName: string;
    rowsReturned: number;
    dbFields: tableData[][]
    dbRows: rowType;
};
type reqType = {
    params: any;
    body?: fixme;
    method: fixme;
    headers: fixme;
};
type resType = {
    status: (arg0: number) => {
        (): fixme;
        new(): fixme;
        json: fixme;
        end?: fixme;
    };
    send: fixme;
};

// ---------------------------------------------
// <> Utility functions
// ---------------------------------------------
/**
 * Puts the database response in a wrapper with some metadata
*/

function timestamp() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return hours + ":" + minutes + ":" + seconds;
}


// ---------------------------------------------
// <> Table utilities
// ---------------------------------------------

// <> Types used wihen working with tables
type list = number;
type listMulti = number;
type tableData = undefined | string | number | boolean | list | listMulti;
type fieldType = "string" | "number" | "boolean" | "list" | "list-multi" | "uid"
type field = {
    matchID: string;
    labelText: string;
    type: fieldType;
    defaultValue?: tableData;
    changeFunction?: ((arg0: any) => void);
    listTable?: string;
    // url?: URL;
};
type inputFieldType = string | number | readonly string[] | undefined;

function empty(): (arg0: any) => void { return () => { }; }
const dataHeaders = (fields: field[]) => { return (fields.map((eachField) => { return (eachField.labelText) })) }

// ---------------------------------------------
// <> END UTILS
// ---------------------------------------------

// ---------------------------------------------
// <> Grocery-specific functions
// ---------------------------------------------

/**
 * Puts the database response in a wrapper with some metadata
 */
function structureGroceryResponse(rows: rowType, fields: field[], tableName: string, serverStartTime: string) {
    return {
        serverUpSince: serverStartTime,
        baseURL: 'http://localhost:8000/',
        tableName: tableName,
        rowsReturned: rows.length,
        dbFields: fields,
        dbRows: rows
    };
}
// <> Initialize the app
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line to parse JSON request bodies


// ---------------------------------------------
// <> db_groceries
// ---------------------------------------------
const DBNAME = "grocery";
const DBPATH = './grocery.db'

// <> Listen on port 8000 and log the url to the console.
const HTTP_PORT = 8000
const BASEURL = `http://localhost:${HTTP_PORT}`

const serverStartTime = timestamp();

app.listen(HTTP_PORT, () => {
    console.log(`Start time: ${serverStartTime}`)
    console.log("Server is listening on port " + HTTP_PORT);
    console.log("Default path: ", `${BASEURL}/purchases`)
});

// <> Connect to the Database
const db = new sqlite3.Database(DBPATH, (err: errType) => {
    if (err) {
        console.error(`Error opening database ${DBNAME}: ` + err.message);
    } else {
        console.log(`Database ${DBNAME} found at ` + DBPATH)
    }
    // ---------------------------------------------
    // <> Routes
    // ---------------------------------------------

    // Purchases routes
    const defaultRoute = app.get("/purchases", (req: reqType, res: resType, next: any) => {

        const fieldsForThisTable: field[] = [
            { matchID: "product_name", labelText: "Item", type: "string" },
            { matchID: "total_purchase_price", labelText: "Total Price", type: "number" },
            { matchID: "unit_name", labelText: "Unit", type: "string" },
            { matchID: "unit_count", labelText: "Count", type: "number" },
            { matchID: "venue_name", labelText: "Venue", type: "string" },
            { matchID: "purchase_date", labelText: "Date", type: "string" },
            { matchID: "category_name", labelText: "Category", type: "string" },
            { matchID: "purchase_id", labelText: "UID", type: "uid" },
        ];

        function purchasesToTable(datastate: rowType): tableData[][] {
            return datastate.map((row) => {
                return ([
                    row.product_name,
                    row.total_purchase_price,
                    row.unit_name,
                    row.unit_count,
                    row.venue_name,
                    row.purchase_date,
                    row.category_name,
                    row.purchase_id,
                ])
            })
        }
        const tableName = 'purchase'
        const query = `SELECT 
        purchase.purchase_id,
        product.product_name,
        purchase.total_purchase_price,
        product.unit_name,
        purchase.unit_count,
        venue.venue_name,
        purchase.purchase_date,
        category.category_name
    FROM
        purchase
    JOIN product ON purchase.product_id = product.product_id
    JOIN venue ON purchase.venue_id = venue.venue_id
    JOIN category ON purchase.category_id = category.category_id;
    `
        db.all(query, [], (err: errType, rows: rowType) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            } else {
                const payload = structureGroceryResponse(purchasesToTable(rows), fieldsForThisTable, tableName, serverStartTime);
                // console.log("payload: ", payload)
                res.status(200).json(payload);
                return;
            }
        });
    })

    // Categories Routes
    app.get("/categories", (req: reqType, res: resType) => {
        const tableName = "category";
        const query = `SELECT * FROM ${tableName}`;

        db.all(query, [], (err: errType, rows: rowType) => {
            if (err) {
                res.status(400).json({ "error": err.message });
            } else {
                const payload = structureGroceryResponse(rows, fieldsForThisTable, tableName, serverStartTime);
                res.status(200).json(payload);
            }
        });
    });

    app.post("/categories/add", (req: reqType, res: resType) => {
        const { category_name } = req.body;
        const query = `INSERT INTO category (category_name) VALUES (?)`;

        db.run(query, [category_name], (err: errType) => {
            if (err) {
                res.status(400).json({ "error": err.message });
            } else {
                res.status(201).json({ message: "Category added successfully." });
            }
        });
    });

    app.delete("/categories/:category_id", (req: reqType, res: resType) => {
        const { category_id } = req.params;
        const query = `DELETE FROM category WHERE category_id = ?`;

        db.run(query, [category_id], (err: errType) => {
            if (err) {
                res.status(400).json({ "error": err.message });
            } else {
                res.status(200).json({ message: "Category deleted successfully." });
            }
        });
    });

    // Products Routes
    app.get("/products", (req: reqType, res: resType) => {
        const tableName = "product";
        const query = `SELECT * FROM ${tableName}`;

        db.all(query, [], (err: errType, rows: rowType) => {
            if (err) {
                res.status(400).json({ "error": err.message });
            } else {
                const payload = structureGroceryResponse(rows, fieldsForThisTable, tableName, serverStartTime);
                res.status(200).json(payload);
            }
        });
    });

    app.post("/products/add", (req: reqType, res: resType) => {
        const { product_name, unit_name } = req.body;
        const query = `INSERT INTO product (product_name, unit_name) VALUES (?, ?)`;

        db.run(query, [product_name, unit_name], (err: errType) => {
            if (err) {
                res.status(400).json({ "error": err.message });
            } else {
                res.status(201).json({ message: "Product added successfully." });
            }
        });
    });

    app.delete("/products/:product_id", (req: reqType, res: resType) => {
        const { product_id } = req.params;
        const query = `DELETE FROM product WHERE product_id = ?`;

        db.run(query, [product_id], (err: errType) => {
            if (err) {
                res.status(400).json({ "error": err.message });
            } else {
                res.status(200).json({ message: "Product deleted successfully." });
            }
        });
    });

    // Venues Routes
    app.get("/venues", (req: reqType, res: resType) => {
        const tableName = "venue";
        const query = `SELECT * FROM ${tableName}`;

        db.all(query, [], (err: errType, rows: rowType) => {
            if (err) {
                res.status(400).json({ "error": err.message });
            } else {
                const payload = structureGroceryResponse(rows, fieldsForThisTable, tableName, serverStartTime);
                res.status(200).json(payload);
            }
        });
    });

    app.post("/venues/add", (req: reqType, res: resType) => {
        const { venue_name } = req.body;
        const query = `INSERT INTO venue (venue_name) VALUES (?)`;

        db.run(query, [venue_name], (err: errType) => {
            if (err) {
                res.status(400).json({ "error": err.message });
            } else {
                res.status(201).json({ message: "Venue added successfully." });
            }
        });
    });

    app.delete("/venues/:venue_id", (req: reqType, res: resType) => {
        const { venue_id } = req.params;
        const query = `DELETE FROM venue WHERE venue_id = ?`;

        db.run(query, [venue_id], (err: errType) => {
            if (err) {
                res.status(400).json({ "error": err.message });
            } else {
                res.status(200).json({ message: "Venue deleted successfully." });
            }
        });
    });

})