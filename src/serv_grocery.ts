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
type dbResponse = { error: any; } | {
    serverUpSince: string;
    baseURL: string;
    tableName: string;
    rowsReturned: number;
    dbFields: [string, field][];
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
// <> Types used wihen working with tables
type list = number;
type listMulti = number;
type tableData = undefined | string | number | boolean | list | listMulti;
type fieldType = "string" | "number" | "boolean" | "list" | "list-multi" | "uid" | "lookedUp";
interface mysteryObject { [index: string]: tableData }
type field = {
    labelText: string;
    matchID: string;
    type: fieldType;
    order: number;
    defaultValue?: tableData;
    changeFunction?: (arg0: any) => void;
    listTable?: string;
    choices?: mysteryObject[]
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
 *
 * @param {rowType} rows
 * @param {[string, field][]} fields
 * @param {string} tableName
 * @param {string} serverStartTime
 * @return {*}  {dbResponse}
 */
function structureGroceryResponse(rows: rowType, fields: [string, field][], tableName: string, serverStartTime: string): dbResponse {
    return {
        serverUpSince: serverStartTime,
        baseURL: 'http://localhost:8000/',
        tableName: tableName,
        rowsReturned: rows.length,
        dbFields: fields,
        dbRows: rows
    };
}

async function loadLists(fields: [string, field][]): Promise<[string, field][]> {
    const promises = fields.map(
        async ([matchID, fieldDef]): Promise<[string, field]> => {
            const tableName = fieldDef.listTable;
            // If there is a table, 
            if (tableName) {
                let thisField: field = { ...fieldDef, choices: [] };
                // ...Query the DB for the list of choices
                thisField.choices = await getChoiceList(matchID, thisField);
                return [matchID, thisField];
            }
            // else, just put it back as-is
            else {
                return [matchID, fieldDef];
            }
        }
    );
    // Use Promise.all to await all the promises and return the results as an array
    return Promise.all(promises);
}

function getChoiceList(matchID: string, thisField: field): Promise<mysteryObject[]> {
    return new Promise((resolve, reject) => {
        const tableName = thisField.listTable;
        const choicesQuery = `SELECT * from ${tableName};`;
        db.all(choicesQuery, [], (err: errType, choices: { arg0: number, arg1: string }[]) => {
            if (err) {
                console.log("error", err);
                reject({ "error": `Error fetching table ${tableName}: ${err.message}` });
                return;
            }
            else {
                resolve(choices)
            }
        });
    })
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

const routes = ["purchase", "category", "venue", "product"]

app.listen(HTTP_PORT, () => {
    console.log(`Start time: ${serverStartTime}`)
    console.log("Server is listening on port " + HTTP_PORT);
    routes.forEach((route) => console.log(`Try out path ${BASEURL}/${route}`))
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
    app.get("/purchase", (req: reqType, res: resType, next: any) => {
        const tableName = 'purchase'
        const fields: [string, field][] = [
            ["product_name", { labelText: "Item", type: "list", order: 1, matchID: "product-list", listTable: "product" }],
            ["total_purchase_price", { labelText: "Total Price", type: "number", order: 2, matchID: "total-price" }],
            ["unit_name", { labelText: "Unit", type: "lookedUp", order: 3, matchID: "unit-name" }],
            ["unit_count", { labelText: "Count", type: "number", order: 4, matchID: "unit-count" }],
            ["venue_name", { labelText: "Venue", type: "list", order: 5, matchID: "venue-list", listTable: "venue" }],
            ["purchase_date", { labelText: "Date", type: "string", order: 6, matchID: "purchase-date" }],
            ["category_name", { labelText: "Category", type: "list", order: 7, matchID: "category", listTable: "category" }],
            ["purchase_id", { labelText: "UID", type: "uid", order: 8, matchID: "purchase-id" }],
        ];

        const query = `SELECT 
        purchase.purchase_id,
        purchase.product_id,
        product.product_name,
        purchase.total_purchase_price,
        product.unit_name,
        purchase.unit_count,
        purchase.venue_id,
        venue.venue_name,
        purchase.purchase_date,
        purchase.category_id,
        category.category_name
        FROM
        purchase
        JOIN product ON purchase.product_id = product.product_id
        JOIN venue ON purchase.venue_id = venue.venue_id
        JOIN category ON purchase.category_id = category.category_id;
        `
        // Query for purchase data
        db.all(query, [], async (err: errType, rows: rowType) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            } else {
                const fieldsWithLists: [string, field][] = await loadLists(fields)
                // console.log("fieldsWithLists", fieldsWithLists)
                // Now that we've figured out all of our data, pack it up and send it
                const payload = structureGroceryResponse(rows, fieldsWithLists, tableName, serverStartTime);
                // console.log("payload: ", payload)
                res.status(200).json(payload);
                return;
                // End of else
            }
        });
    })

    // Route to get the best prices of everything
    app.get("/whereToGo", (req: reqType, res: resType) => {
        const fields: [string, field][] = [
            ["product_name", { labelText: "Item", type: "list", order: 1, matchID: "product-list", listTable: "product" }],
            ["best_venue", { labelText: "Best Venue", type: "list", order: 2, matchID: "best_venue", listTable: "venue" }],
            ["best_price_per_unit", { labelText: "Price per unit", type: "number", order: 3, matchID: "best_price_per_unit" }]
        ];
        const query = `SELECT
        p.product_name,
        v.venue_name AS best_venue,
        MIN(pu.total_purchase_price / pu.unit_count) AS best_price_per_unit
        FROM
        product p
        JOIN
        purchase pu ON p.product_id = pu.product_id
        JOIN
        venue v ON pu.venue_id = v.venue_id
        WHERE
        (pu.product_id, pu.total_purchase_price / pu.unit_count) IN (
            SELECT
                product_id,
                MIN(total_purchase_price / unit_count) AS min_price_per_unit
            FROM
                purchase
            GROUP BY
                product_id
        )
        GROUP BY
        p.product_name, v.venue_name;
        `

        db.all(query, [], async (err: errType, rows: rowType) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            } else {
                const fieldsWithLists: [string, field][] = await loadLists(fields)
                // console.log("fieldsWithLists", fieldsWithLists)
                // Now that we've figured out all of our data, pack it up and send it
                const payload = structureGroceryResponse(rows, fieldsWithLists, "purchase", serverStartTime);
                // console.log("payload: ", payload)
                res.status(200).json(payload);
                return;
                // End of else
            }
        });
    })



    // Categories Routes
    app.get("/category", (req: reqType, res: resType) => {
        const tableName = "category";
        const fields: [string, field][] = [
            ["category_id", { labelText: "UID", type: "uid", order: 1, matchID: "category_id" }],
            ["category_name", { labelText: "Name", type: "string", order: 2, matchID: "category_name" }]
        ]
        const query = `SELECT * FROM ${tableName}`;

        db.all(query, [], (err: errType, rows: rowType) => {
            if (err) {
                res.status(400).json({ "error": err.message });
            } else {
                const payload = structureGroceryResponse(rows, fields, tableName, serverStartTime);
                res.status(200).json(payload);
            }
        });
    });

    app.post("/category/add", (req: reqType, res: resType) => {
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

    app.delete("/category/:category_id", (req: reqType, res: resType) => {
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
    app.get("/product", (req: reqType, res: resType) => {
        const tableName = "product";

        const fields: [string, field][] = [
            ["category_id", { labelText: "UID", type: "uid", order: 1, matchID: "category_id" }],
            ["category_name", { labelText: "Name", type: "string", order: 2, matchID: "category_name" }]
        ]

        const query = `SELECT * FROM ${tableName}`;

        db.all(query, [], (err: errType, rows: rowType) => {
            if (err) {
                res.status(400).json({ "error": err.message });
            } else {
                const payload = structureGroceryResponse(rows, fields, tableName, serverStartTime);
                res.status(200).json(payload);
            }
        });
    });

    // app.post("/product/add", (req: reqType, res: resType) => {
    //     const { product_name, unit_name } = req.body;
    //     const query = `INSERT INTO product (product_name, unit_name) VALUES (?, ?)`;

    //     db.run(query, [product_name, unit_name], (err: errType) => {
    //         if (err) {
    //             res.status(400).json({ "error": err.message });
    //         } else {
    //             res.status(201).json({ message: "Product added successfully." });
    //         }
    //     });
    // });

    // app.delete("/product/:product_id", (req: reqType, res: resType) => {
    //     const { product_id } = req.params;
    //     const query = `DELETE FROM product WHERE product_id = ?`;

    //     db.run(query, [product_id], (err: errType) => {
    //         if (err) {
    //             res.status(400).json({ "error": err.message });
    //         } else {
    //             res.status(200).json({ message: "Product deleted successfully." });
    //         }
    //     });
    // });

    // // Venues Routes
    // app.get("/venue", (req: reqType, res: resType) => {
    //     const tableName = "venue";
    //     // const fields = tableFields.get(tableName) || []
    //     const query = `SELECT * FROM ${tableName}`;

    //     db.all(query, [], (err: errType, rows: rowType) => {
    //         if (err) {
    //             res.status(400).json({ "error": err.message });
    //         } else {
    //             const payload = structureGroceryResponse(rows, fields, tableName, serverStartTime);
    //             res.status(200).json(payload);
    //         }
    //     });
    // });

    // app.post("/venue/add", (req: reqType, res: resType) => {
    //     const { venue_name } = req.body;
    //     const query = `INSERT INTO venue (venue_name) VALUES (?)`;

    //     db.run(query, [venue_name], (err: errType) => {
    //         if (err) {
    //             res.status(400).json({ "error": err.message });
    //         } else {
    //             res.status(201).json({ message: "Venue added successfully." });
    //         }
    //     });
    // });

    // app.delete("/venue/:venue_id", (req: reqType, res: resType) => {
    //     const { venue_id } = req.params;
    //     const query = `DELETE FROM venue WHERE venue_id = ?`;

    //     db.run(query, [venue_id], (err: errType) => {
    //         if (err) {
    //             res.status(400).json({ "error": err.message });
    //         } else {
    //             res.status(200).json({ message: "Venue deleted successfully." });
    //         }
    //     });
    // });

})