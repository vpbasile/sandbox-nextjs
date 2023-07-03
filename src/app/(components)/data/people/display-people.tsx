import Link from "next/link"
import { styles } from "../../helpers/tsStyles"
import { useState, ChangeEvent } from "react"
import Table from "../../db-table/table"
import { field } from "../../db-table/field"
import { list } from "postcss"

export default function DisplayPeople() {

	const [displayState, SETdisplayState] = useState("No query has been sent.");
	const [dataHolder, SETdataHolder] = useState([
		{ "id": 0, "name": "", "birthdate": "", "preferred_contact_method": 1, "groups": 1 },
		{ "id": 0, "name": "", "birthdate": "", "preferred_contact_method": 1, "groups": 1 },
		{ "id": 0, "name": "", "birthdate": "", "preferred_contact_method": 1, "groups": 3 }
	]);


	// <> States used for creating a new record
	const [idTemp, SETidTemp] = useState(99); // This should be set by nextID
	const [nameTemp, SETnameTemp] = useState("Name Name");
	const [birthdateTemp, SETbirthdateTemp] = useState("1990-01-01")

	function parseMyData(data: any): void {
		console.log(data);
		const displayString = `Successful response from the server! Server has been up since ${data.serverUpSince}. Databse query returned ${data.rowsReturned} rows.`
		SETdisplayState(displayString)
		SETdataHolder(data.dbResponse);
		// I should also query the database for the list of the column names
	}

	const dbURL = "http://localhost:8000/"
	const queryDB = () => {
		const displayString = "Attempting to send query to " + dbURL;
		console.log(displayString);
		SETdisplayState(displayString);
		fetch(dbURL).then(response => response.json()).then(data => parseMyData(data))
			.catch(error => { SETdisplayState("An error occurred - see console for details."); console.log(error); });
	};

	const buttonElement = <button onClick={queryDB} className={styles.button + styles.roomy + "block"}>{displayState}</button>;

	const translatedArray = dataHolder.map((thisRow) => {
		// !!! This should be in the data structure definition file
		// 
		return (
			[thisRow.id, thisRow.name, thisRow.birthdate, thisRow.preferred_contact_method, thisRow.groups]
		)
	})

	let keyCounter = 0;
	let rowKey = 0;

	type eType = ChangeEvent<HTMLInputElement>

	// <>DATA<>people - This is part of the data definition of the people database.  
	// I should rename the db file to pepoel.db 
	// I want a centralized file that contains all of the information unique to that data structure 
	const fieldsForPeople: field[] = [
		{ matchID: "uid", displayLabel: "UID", type: "string", defaultValue: idTemp, changeFunction: (e: eType): void => { SETidTemp(+(e.target.value)) } },
		{ matchID: "name", displayLabel: "Name", type: "string", defaultValue: nameTemp, changeFunction: (e: eType) => { SETnameTemp(e.target.value) } },
		{ matchID: "birthdate", displayLabel: "DOB", type: "string", defaultValue: birthdateTemp, changeFunction: (e: eType) => { SETbirthdateTemp(e.target.value) } },
		{ matchID: "contactMethod", displayLabel: "Preferred Contact Method", type: "list", defaultValue: 1, changeFunction: (e: eType): void => console.log(e.target.value), listTable: "methods" },
		{ matchID: "groups", displayLabel: "Groups", type: "list-multi", defaultValue: 1, changeFunction: (e: eType): void => console.log(e.target.value) }
	]

	return (
		<>
			<div className={styles.bubble + styles.spacious}>
				<form action="/send-data-here" method="post">
					<Table cssClasses="" editable={true} fields={fieldsForPeople} dataContents={translatedArray} />
				</form>
			</div>
			<div className={styles.bubble + styles.spacious}>
				{buttonElement}
			</div>
		</>
	)
}


