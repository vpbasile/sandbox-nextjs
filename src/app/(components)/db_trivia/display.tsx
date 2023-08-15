import { useState } from "react";
import Table, { field, tableData } from "../db-table/table";
import { eType } from "@/app/helpersUniversal/usefulTypes";
import { styles } from "@/app/helpersUniversal/tsStyles";

export default function TriviaDisplay() {
	// ---------------------------------------------
	// <> Step 1 - Define types
	// ---------------------------------------------
	type question = {
		"id": number, "questionText": string, "choices": string, "category": string
	}

	// ---------------------------------------------
	// <> Step 2 - Initialize some values
	// ---------------------------------------------
	const spoofData: question[] = [
		{ id: 0, questionText: "Question text", choices: "[One,Two,Three,Four]", category: "none" },
		{ id: 0, questionText: "Question text", choices: "[One,Two,Three,Four]", category: "none" },
		{ id: 0, questionText: "Question text", choices: "[One,Two,Three,Four]", category: "none" },
		{ id: 0, questionText: "Question text", choices: "[One,Two,Three,Four]", category: "none" }
	]

	// States for storage and display
	const [displayState, SETdisplayState] = useState("No query has been sent.");
	const [dataState, SETdataState] = useState(spoofData);
	const dbURL = "http://localhost:8000/trivia/questions"
	const queryDB = (dbURL: string): void => {
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
	const fieldsForTriva: field[] = [
		{ matchID: "uid", labelText: "UID", type: "uid", defaultValue: idTemp, changeFunction: (e: eType): void => { SETidTemp(+(e.target.value)) } },
		{ matchID: "questionText", labelText: "Question", type: "string", defaultValue: "Question text", changeFunction: () => { } },
		{ matchID: "choices", labelText: "Choices", type: "string", defaultValue: "Question text", changeFunction: () => { } },
		{ matchID: "category", labelText: "Category", type: "string", defaultValue: "general_knowledge", changeFunction: () => { } },
	]

	// ---------------------------------------------
	// <> Finding and diplaying the data
	// ---------------------------------------------

	// Translation functions
	function triviaToTable(dataState: question[]): tableData[][] {
		return dataState.map((thisRow) => { return [thisRow.id, thisRow.questionText, thisRow.choices, thisRow.category] }
		)
	}

	// ---------------------------------------------
	// <> Query the Databse
	// ---------------------------------------------
	if (dataState === spoofData) { queryDB(dbURL); }

	// ---------------------------------------------
	// <> Main return
	// ---------------------------------------------
	return <div className={styles.bubble + styles.spacious}>
		< Table dataContents={triviaToTable(dataState)} fields={fieldsForTriva} newRowF={
			function (arg0: any): void {
				throw new Error("Function not implemented.");
			}
		} ></Table>
	</div>
}