import next from "next"
import Link from "next/link"
import { run } from "node:test"
import { browser } from "process"
import { styles } from "./tsStyles"
import { useState } from "react"

type propsType = any;

export default function SectionJournal(props: propsType) {

	const [myState,setMyState] = useState("No query has been sent.")

	const queryDB = () => {
		const url = ""
		console.log("Send query to" + url)
		fetch(url).then(response => response.json()).catch(error => { console.log(error); });
	};

	const buttonElement = <button onClick={queryDB} className={styles.button}>Send query</button>;

	const stuffToSay =
		<>
			< p > To test the database connection, at the command line run < span className='' > npm run database</span >, then in the browser, go to < Link href="http://localhost:8000/" > http://localhost:8000/</Link>
			</p >
			{/* <p className={styles.roomy}>Server result: {serverResponse}</p> */}
			< p className={styles.roomy} > This one does not work yet.My next step is to invoke the controller(defined in the server directory) via the UI.</p >
			<ul>
				<li><Link className={styles.link} href="https://expressjs.com/en/guide/routing.html#response-methods">Reference on the Response methods</Link></li>
				<li><Link className={styles.link} href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes">This tutorial</Link> might be helpful, though it is using mongoose instead of sqlite3.</li>
				<li><Link className={styles.link} href="https://medium.com/@codesprintpro/rest-api-using-sqlite3-nodejs-and-expressjs-f8c0c0847fe5">This tutorial</Link> was helpful setting up the express server with the sqlite3 database, but it left me stuck when I got to the point of calling the express controllers from my application.</li>
			</ul>
		</>

	return (
		<>
			{myState}
			{buttonElement}
			<hr className={styles.roomy} />
			{stuffToSay}
		</>
	)
}