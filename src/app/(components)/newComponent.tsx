import next from "next"
import Link from "next/link"
import { run } from "node:test"
import { browser } from "process"
import { styles } from "./tsStyles"
import { useState } from "react"
import Table from "./table"
import { Divider } from "./divider"

type propsType = any;
type person = {}

export default function SectionJournal(props: propsType) {

	const [myState, setMyState] = useState("No query has been sent.");
	const [secondState, setSecondState] = useState([{ "id": 1, "name": "Doe", "birthdate": "1990-01-01", "preferred_contact_method": 1, "groups": 1 }, { "id": 2, "name": "Smith", "birthdate": "1985-05-10", "preferred_contact_method": 2, "groups": 1 }, { "id": 3, "name": "Johnson", "birthdate": "1992-08-15", "preferred_contact_method": 2, "groups": 2 }, { "id": 4, "name": "Williams", "birthdate": "1988-11-20", "preferred_contact_method": 1, "groups": 2 }, { "id": 5, "name": "Brown", "birthdate": "1994-03-25", "preferred_contact_method": 1, "groups": 3 }]);

	function parseMyData(data: any): void {
		console.log(data);
		const displayString = `Successful response from the server! Server has been up since ${data.serverUpSince}. Databse query returned ${data.rowsReturned} rows.`
		setMyState(displayString)
		setSecondState(data.dbResponse);
		// I should also query the database for the list of the column names
	}

	const queryDB = () => {
		const url = "http://localhost:8000/"
		const displayString = "Attempting to send query to " + url;
		console.log(displayString);
		setMyState(displayString);
		fetch(url).then(response => response.json()).then(data => parseMyData(data))
			.catch(error => { setMyState("An error occurred - see console for details."); console.log(error); });
	};

	const buttonElement = <button onClick={queryDB} className={styles.button + styles.roomy}>Send query</button>;

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

	const translatedArray = secondState.map((thisRow) => {
		return (
			[thisRow.id, thisRow.name, thisRow.birthdate]
		)
	})

	let keyCounter = 0;
	let rowKey = 0;
	return (
		<>
			<div className={styles.bubble + styles.spacious}>{myState}</div>
			{buttonElement}
			<div className={styles.bubble + styles.spacious}>
				{/* This is doing it manually, but I alreayd have a component that does this for me. */}
				{/* 
				<table>
				{secondState.map(eachRow => {
					return (<tr key={rowKey++}>
						<td>{eachRow.name}</td><td>{eachRow.id}</td>
					</tr>)
				})} 
			</table>
				*/}
				<Table dataLabels={["Id", "Name", "DOB"]} dataContents={translatedArray} />
			</div>
			<Divider />
			{stuffToSay}
		</>
	)
}


