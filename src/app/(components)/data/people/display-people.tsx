import { styles } from "../../helpersUniversal/tsStyles"
import { useState } from "react"
import Table, { list, listMulti } from "../../db-table/table"
import { field, tableData } from "../../db-table/field"
import { eType } from "../../helpersUniversal/usefulTypes"


export default function DisplayPeople() {
	// ---------------------------------------------
	// <> Step 1 - Define types
	// ---------------------------------------------
	type person = { "id": number, "name": string, "birthdate": string, "preferred_contact_method": list, "groups": listMulti }

	type expectedServerResponse = {
		serverUpSince: string
		rowsReturned: number
		dbResponse: person[]
	}

	// ---------------------------------------------
	// <> Step 2 - Initialize some values
	// ---------------------------------------------
	const spoofData: person[] = [
		{ "id": 0, "name": "", "birthdate": "", "preferred_contact_method": 1, "groups": 1 },
		{ "id": 0, "name": "", "birthdate": "", "preferred_contact_method": 1, "groups": 1 },
		{ "id": 0, "name": "", "birthdate": "", "preferred_contact_method": 1, "groups": 3 }
	]
	// States for storage and display
	const [displayState, SETdisplayState] = useState("No query has been sent.");
	const [dataState, SETdataState] = useState(spoofData);

	const dbURL = "http://localhost:8000/"
	const queryDB = () => {
		const displayString = "Attempting to send query to " + dbURL;
		console.log(displayString);
		SETdisplayState(displayString);
		fetch(dbURL).then(response => response.json()).then(data =>
			SETdataState(data.dbResponse))
			.catch(error => { SETdisplayState("An error occurred - see console for details."); console.log(error); });
	};

	// <>DATA<>people - This the data definition of the people table in the people database.  It should conatin all of the information unique to a database. 
	// <> States used for creating a new record
	const [idTemp, SETidTemp] = useState(99); // This should be set by nextID
	const [nameTemp, SETnameTemp] = useState("Name Name");
	const [birthdateTemp, SETbirthdateTemp] = useState("1990-01-01")
	// Define the fields
	const fieldsForPeople: field[] = [
		{ matchID: "uid", displayLabel: "UID", type: "string", defaultValue: idTemp, changeFunction: (e: eType): void => { SETidTemp(+(e.target.value)) }, automatic: false },
		{ matchID: "name", displayLabel: "Name", type: "string", defaultValue: nameTemp, changeFunction: (e: eType) => { SETnameTemp(e.target.value) }, automatic: false },
		{ matchID: "birthdate", displayLabel: "DOB", type: "string", defaultValue: birthdateTemp, changeFunction: (e: eType) => { SETbirthdateTemp(e.target.value) }, automatic: false },
		{ matchID: "contactMethod", displayLabel: "Preferred Contact Method", type: "list", defaultValue: 1, changeFunction: (e: eType): void => console.log(e.target.value), listTable: "methods", automatic:false },
		{ matchID: "groups", displayLabel: "Groups", type: "list-multi", defaultValue: 1, changeFunction: (e: eType): void => console.log(e.target.value), automatic: false }
	]

	// ---------------------------------------------
	// <> Finding and diplaying the data
	// ---------------------------------------------

	// Translation functions
	function peopleToTable(dataState: person[]): tableData[][] {
		return dataState.map((thisRow) => {
			return (
				[thisRow.id, thisRow.name, thisRow.birthdate, thisRow.preferred_contact_method, thisRow.groups]
			)
		})
	}

	function unwrapData(data: expectedServerResponse): person[] {
		console.log(data);
		const displayString = `Successful response from the server! Server has been up since ${data.serverUpSince}. Databse query returned ${data.rowsReturned} rows.`
		SETdisplayState(displayString);
		return data.dbResponse;
		// I should also query the database for the list of the column names
	}

	// ---------------------------------------------
	// <> Misc/Etc
	// ---------------------------------------------
	// ---------------------------------------------
	// <> Main return
	// ---------------------------------------------
	return (
		<>
			<div className={styles.bubble + styles.spacious}>
				<form action="/send-data-here" method="post">
					<Table cssClasses="" editable={true} fields={fieldsForPeople} dataContents={peopleToTable(dataState)} newRowF={createPerson}/>
				</form>
			</div>
			<div className={styles.bubble + styles.spacious}>
				{<button onClick={queryDB} className={styles.button + styles.roomy + "block"}>{displayState}</button>}
			</div>
		</>
	)
}

