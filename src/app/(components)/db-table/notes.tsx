import Link from "next/link"
import { field } from "./field"
import { styles } from "../structure/tsStyles"

// <>DATA<>notes Test data used in the editable table until I can store this data in the database.
export const headersTest = ["Key", "Title", "URL"]
export const dataTest: (string | number)[][] = [

	[6, "Fix the display of all the form fields.  Make them match the size of the text."],
	[7, "Define link fields"]
	, [5, "Edit buttons should be links", ""]
	
	, [3, `sqlite3`, 'https://stackoverflow.com/questions/56583738/how-to-connect-to-a-sqlite-db-from-a-react-app']
	, [2, 'Server components', 'https://nextjs.org/docs/getting-started/react-essentials']
]

export const testFields: field[] = [
	{ matchID: "uid", displayLabel: "UID", type: "number", defaultValue: 99, changeFunction: null },
	{ matchID: "title", displayLabel: "Title", type: "string", defaultValue: "New title", changeFunction: null },
	{ matchID: "url", displayLabel: "URL", type: "string", defaultValue: "http://", changeFunction: null }
]

export const stuffToSay =
	<ul>
		<li><Link className={styles.link} href="https://expressjs.com/en/guide/routing.html#response-methods">Reference on the Response methods</Link></li>
		<li><Link className={styles.link} href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes">This tutorial</Link> might be helpful, though it is using mongoose instead of sqlite3.</li>
		<li><Link className={styles.link} href="https://medium.com/@codesprintpro/rest-api-using-sqlite3-nodejs-and-expressjs-f8c0c0847fe5">This tutorial</Link> was helpful setting up the express server with the sqlite3 database, but it left me stuck when I got to the point of calling the express controllers from my application.</li>
		<li>To test the database connection, at the command line run < span className='' > npm run database</span >, then in the browser, go to < Link href="http://localhost:8000/" > http://localhost:8000/</Link></li>
	</ul>