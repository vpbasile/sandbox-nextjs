import next from "next"
import Link from "next/link"
import { run } from "node:test"
import { browser } from "process"
import { styles } from "../tsStyles"
import { useState } from "react"
import Table from "./table"
import SelectList from "./selectList"
import { inputCell, submitCell, tableHeader } from "./table-helpers"
import InputRow from "./inputRow"
import { field } from "./field"

type propsType = any;
type person = {}

export default function SectionJournal(props: propsType) {

	const [myState, setMyState] = useState("No query has been sent.");
	const [secondState, setSecondState] = useState([
		{ "id": 0, "name": "", "birthdate": "", "preferred_contact_method": 1, "groups": 1 },
		{ "id": 0, "name": "", "birthdate": "", "preferred_contact_method": 1, "groups": 1 },
		{ "id": 0, "name": "", "birthdate": "", "preferred_contact_method": 1, "groups": 3 }
	]);


	// <> States used for creating a new record
	const [idTemp, SETidTemp] = useState("99"); // This should be set by nextID
	const [nameTemp, SETnameTemp] = useState("Name Name");
	const [birthdateTemp, SETbirthdateTemp] = useState("1990-01-01")

	function parseMyData(data: any): void {
		console.log(data);
		const displayString = `Successful response from the server! Server has been up since ${data.serverUpSince}. Databse query returned ${data.rowsReturned} rows.`
		setMyState(displayString)
		setSecondState(data.dbResponse);
		// I should also query the database for the list of the column names
	}

	let listMethods, listGroups;
	const dbURL = "http://localhost:8000/"
	const queryDB = () => {
		const displayString = "Attempting to send query to " + dbURL;
		console.log(displayString);
		setMyState(displayString);
		fetch(dbURL).then(response => response.json()).then(data => parseMyData(data))
			.catch(error => { setMyState("An error occurred - see console for details."); console.log(error); });
	};

	const buttonElement = <button onClick={queryDB} className={styles.button + styles.roomy}>Send query</button>;

	const stuffToSay =
		<ul>
			<li><Link className={styles.link} href="https://expressjs.com/en/guide/routing.html#response-methods">Reference on the Response methods</Link></li>
			<li><Link className={styles.link} href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes">This tutorial</Link> might be helpful, though it is using mongoose instead of sqlite3.</li>
			<li><Link className={styles.link} href="https://medium.com/@codesprintpro/rest-api-using-sqlite3-nodejs-and-expressjs-f8c0c0847fe5">This tutorial</Link> was helpful setting up the express server with the sqlite3 database, but it left me stuck when I got to the point of calling the express controllers from my application.</li>
			<li>To test the database connection, at the command line run < span className='' > npm run database</span >, then in the browser, go to < Link href="http://localhost:8000/" > http://localhost:8000/</Link></li>
		</ul>

	const translatedArray = secondState.map((thisRow) => {

		return (
			[thisRow.id, thisRow.name, thisRow.birthdate, thisRow.preferred_contact_method, thisRow.groups]
		)
	})

	let keyCounter = 0;
	let rowKey = 0;

	const dataHeaders = ["Id", "Name", "DOB", "Group", "Preferred Contact Method"]
	const fieldsForTable: field[] = [
		{ matchID: "uid", displayLabel: "UID", type: "string", defaultValue: idTemp, changeFunction: (e) => { SETidTemp(e.target.value) } },
		{ matchID: "name", displayLabel: "Name", type: "string", defaultValue: nameTemp, changeFunction: (e) => { SETnameTemp(e.target.value) } },
		{ matchID: "birthdate", displayLabel: "DOB", type: "string", defaultValue: birthdateTemp, changeFunction: (e) => { SETbirthdateTemp(e.target.value) } },
		{ matchID: "contactMethod", displayLabel: "Preferred Contact Method", type: "list", defaultValue: 1, changeFunction: (e): void => console.log(e.target.value) },
		{ matchID: "groups", displayLabel: "Groups", type: "list-multi", defaultValue: 1, changeFunction: (e): void => console.log(e.target.value) }
	]
	return (
		<>
			<div className={styles.bubble + styles.spacious}>
				<form action="/send-data-here" method="post">
					<table>
						<thead>
							<tr>
								<th></th>
								<th><label htmlFor="name">Name</label></th>
								<th><label htmlFor="birthdate">Date of Birth</label></th>
								<th><label htmlFor="groups">Groups</label></th>
								<th><label htmlFor="method">Preferred Contact Method</label></th>
								<th>---</th>
							</tr>
						</thead>
						<tbody>
							<InputRow fields={fieldsForTable} />
							{inputCell("uid", idTemp, (e) => { SETidTemp(e.target.value), "" })}
							{inputCell("name", nameTemp, (e) => { SETnameTemp(e.target.value) }, "")}
							{inputCell("birthdate", birthdateTemp, (e) => { SETbirthdateTemp(e.target.value) }, "")}
							<td><SelectList url={dbURL} tableName="groups"
								onSelect={(e): void => console.log(e.target.value)} />
							</td>
							<td><SelectList url={dbURL} tableName="groups"
								onSelect={(e): void => console.log(e.target.value)} />
							</td>
						</tbody>
					</table>
				</form>
			</div>
			<div className={styles.bubble + styles.spacious}>
				<Table cssClasses="" editable={true} dataLabels={dataHeaders} dataContents={translatedArray} />
			</div>
			{buttonElement}
			<div className={styles.bubble + styles.spacious}>Response: {myState}</div>
			{stuffToSay}
		</>
	)
}


