import Link from "next/link"
import { field, tableData } from "../../db-table/field"
import { styles } from "../../helpersUniversal/tsStyles"
import Table, { empty } from "../../db-table/table"
import { useState } from "react";
import { eType } from "../../helpersUniversal/usefulTypes";
import ErrorBoundary from "../../helpersUniversal/ErrorBoundary";

export default function DisplayNotes() {
	// ---------------------------------------------
	// <> Step 1 - Define types
	// ---------------------------------------------
	type task = { uid: number, title: string, complete: boolean };
	type expectedServerResponse = {
		serverUpSince: string
		rowsReturned: number
		dbResponse: task[]
	}

	// ---------------------------------------------
	// <> Step 2 - Initialize some values
	// ---------------------------------------------
	const spoofData: task[] = []
	// States for storage and display
	// const [displayState, SETdisplayState] = useState("No query has been sent.");
	const [dataState, SETdataState] = useState(spoofData);
	const dbURL = "http://localhost:8000/notes/tasks"
	function queryDB(dbURL: string): void {
		const displayString = "Attempting to send query to " + dbURL;
		console.log(displayString);
		fetch(dbURL).then(response => response.json()).then(data => {
			const rows = unwrapData(data);
			SETdataState(rows);
		})
			.catch(error => { console.log(error); });
	}
	// ---------------------------------------------------------------------------------------------------------------------
	// <>DATA<>notes - This is part of the data definition of the tasks table in the notes database.  
	// It should conatin all of the information unique to a database.
	//  ---------------------------------------------------------------------------------------------------------------------
	// <> States used for creating a new record
	const [idTemp, SETidTemp] = useState(99); // This should be set by nextID
	const [titleTemp, SETtitleTemp] = useState("New task")
	const fieldsForTasks: field[] = [
		{ matchID: "uid", displayLabel: "UID", type: "number", defaultValue: idTemp, changeFunction: (e: eType) => SETidTemp(+(e.target.value)), automatic:true },
		{ matchID: "title", displayLabel: "Title", type: "string", defaultValue: titleTemp, changeFunction: (e: eType) => SETtitleTemp(e.target.value) , automatic:false},
		{ matchID: "complete", displayLabel: "Complete", type: "boolean", defaultValue: false, changeFunction: empty , automatic:false}
	]

	// ---------------------------------------------
	// <> Finding and diplaying the data
	// ---------------------------------------------



	// Translation functions

	function tasksToTable(tasks: task[]): tableData[][] {
		return tasks.map(thisTask => {
			return (
				[thisTask.uid, thisTask.title, thisTask.complete]
			)
		})
	}

	function unwrapData(data: expectedServerResponse): task[] {
		const rowsReturned = data.rowsReturned;
		if (rowsReturned) {
			console.log(`Successful response from the server! Server has been up since ${data.serverUpSince}. Databse query returned ${rowsReturned} rows.`)
			return data.dbResponse;
		}
		else return ([{ uid: 99, title: "Blank task", complete: true }]);
	}

	// SPOOF<>DATA<>notes Test data used in the editable table until I can store this data in the database.
	const headersTest = ["Key", "Title", "URL"]
	const dataTest: tableData[][] = [

	]

	// ---------------------------------------------
	// <> Create 
	// ---------------------------------------------
	function createTask(recordInfo: task) {
		// <> FIX <> I should build the list of fields from the fieldsForObject array, but that's a task for another day. 
		const queryString = `INSERT INTO tasks (title, complete) VALUES ('${recordInfo.title}', ${recordInfo.complete})`;
		
	}

	// ---------------------------------------------
	// <> Misc/Etc
	// ---------------------------------------------

	const stuffToSay =
		<ul className={`list-disc ${styles.spacious}`}>
			Background:
			<li><Link className={styles.link} href="https://expressjs.com/en/guide/routing.html#response-methods">Reference on the Response methods</Link></li>
			<li><Link className={styles.link} href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes">This tutorial</Link> might be helpful, though it is using mongoose instead of sqlite3.</li>
			<li><Link className={styles.link} href="https://medium.com/@codesprintpro/rest-api-using-sqlite3-nodejs-and-expressjs-f8c0c0847fe5">This tutorial</Link> was helpful setting up the express server with the sqlite3 database, but it left me stuck when I got to the point of calling the express controllers from my application.</li>
			<li>To test the database connection, at the command line run < span className='' > npm run database</span >, then in the browser, go to < Link href="http://localhost:8000/" > http://localhost:8000/</Link></li>
			<li>Boostrapped like this: <Link href="https://tailwindcss.com/docs/guides/nextjs">Next with Tailwind	</Link></li>
			<li><Link href='https://stackoverflow.com/questions/56583738/how-to-connect-to-a-sqlite-db-from-a-react-app'>sqlite3</Link></li>
			<li><Link href='https://nextjs.org/docs/getting-started/react-essentials'>Server components</Link></li>
			<li>I am using Tailwind - sometimes I do not get updates in the app when I save my tailwind config.  I cannot figure out how to trigger them manually.  I tried Mantine, but there was too much coding involved.</li>

		</ul>
	// ---------------------------------------------
	// <> Main return
	// ---------------------------------------------
	if (dataState === spoofData) { queryDB(dbURL); }
	return (
		<ErrorBoundary>
			<Table dataContents={tasksToTable(dataState)} fields={fieldsForTasks} editable={true} newRowF={createTask}/>
			<div className={styles.bubble + styles.spacious}>{stuffToSay}</div>
		</ErrorBoundary>
	)
}
