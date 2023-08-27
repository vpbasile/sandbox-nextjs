import Link from "next/link";
import { styles } from "../helpersUniversal/tsStyles";
import Table, { empty, field, tableData } from "./db-table/table";
import { useState } from "react";
import { eType } from "../helpersUniversal/usefulTypes";
import ErrorBoundary from "../helpersUniversal/ErrorBoundary";
import { unwrapData } from "./dbvb_helpers";

export default function DisplayNotes() {
	// ---------------------------------------------
	// <> Step 1 - Define types
	// ---------------------------------------------
	type task = { uid: number; title: string; complete: boolean; };

	// ---------------------------------------------
	// <> Step 2 - Initialize some values
	// States for storage and display
	// ---------------------------------------------
	const spoofData: task[] = [];
	const [dataState, SETdataState] = useState(spoofData);
	const dbURL = "http://localhost:8000/notes/tasks";
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
	// <> DBVB data definition <> notes - This is part of the data definition of the tasks table in the notes database.  
	// It should conatin all of the information unique to a database.
	//  ---------------------------------------------------------------------------------------------------------------------
	// <> States used for creating a new record
	const [idTemp, SETidTemp] = useState(99); // This should be set by nextID
	const [titleTemp, SETtitleTemp] = useState("Title of the new task");
	const fieldsForTasks: field[] = [
		{ matchID: "uid", labelText: "UID", type: "uid", defaultValue: idTemp, changeFunction: (e: eType) => SETidTemp(+(e.target.value)) },
		{ matchID: "title", labelText: "Title", type: "string", defaultValue: titleTemp, changeFunction: (e: eType) => SETtitleTemp(e.target.value) },
		{ matchID: "complete", labelText: "Complete", type: "boolean", defaultValue: false, changeFunction: empty }
	];
	// ---------------------------------------------
	// Translation functions
	// !!!REQUIRED - A ...ToTable function will be necessary for every data structure
	// ---------------------------------------------
	function tasksToTable(tasks: task[]): tableData[][] {
		return tasks.map(thisTask => [thisTask.uid, thisTask.title, thisTask.complete]);
	}

	// ---------------------------------------------
	// <> Create new task
	// ---------------------------------------------
	async function createTask(taskTitle: string) {
		console.log(`Attempting to create task ${taskTitle}`);
		try {
			const response = await fetch('http://localhost:8000/notes/tasks/stamp/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ taskTitle }),
			});
			console.log(`Rsponse from server ${JSON.stringify(response)}`);

			if (!response.ok) {
				throw new Error('Failed to create task.');
			}

			const data = await response.json();
			console.log("Another debug");
			console.log(data.message); // Values inserted successfully.
		} catch (error: any) {
			console.log("Error encountered.");
			console.error(error.message);
		}
		// Now that the tasks have been updated, re-query the database
		queryDB(dbURL);
	}
	// Make a wrapper so that we can pass the function more easily
	function createWrapper() { createTask(titleTemp); }
	// ---------------------------------------------
	// <> Main loop
	// ---------------------------------------------
	// Query the Databse
	if (dataState === spoofData) { queryDB(dbURL); }
	// ---------------------------------------------
	// <> Main return
	// ---------------------------------------------
	return (
		<ErrorBoundary>
			<Table dataContents={tasksToTable(dataState)} fields={fieldsForTasks} editable={true} newRowF={createWrapper} />
			<div className={styles.bubble + styles.spacious}>{<ul className={`list-disc ${styles.spacious}`}>
				Background:
				<li><Link className={styles.link} href="https://expressjs.com/en/guide/routing.html#response-methods">Reference on the Response methods</Link></li>
				<li><Link className={styles.link} href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes">This MDN tutorial</Link> might be helpful, though it is using mongoose instead of sqlite3.</li>
				<li><Link className={styles.link} href="https://medium.com/@codesprintpro/rest-api-using-sqlite3-nodejs-and-expressjs-f8c0c0847fe5">This tutorial</Link> was helpful setting up the express server with the sqlite3 database, but it left me stuck when I got to the point of calling the express controllers from my application.</li>
				<li>To test the database connection, at the command line run <span className=''> npm run database</span>, then in the browser, go to <Link href="http://localhost:8000/"> http://localhost:8000/</Link></li>
				<li>Boostrapped like this: <Link href="https://tailwindcss.com/docs/guides/nextjs">Next with Tailwind	</Link></li>
				<li><Link href='https://stackoverflow.com/questions/56583738/how-to-connect-to-a-sqlite-db-from-a-react-app'>sqlite3</Link></li>
				<li><Link href='https://nextjs.org/docs/getting-started/react-essentials'>Server components</Link></li>
				<li>I am using Tailwind - sometimes I do not get updates in the app when I save my tailwind config.  I cannot figure out how to trigger them manually.  I tried Mantine, but there was too much coding involved.</li>

			</ul>}</div>
		</ErrorBoundary>
	);
}
