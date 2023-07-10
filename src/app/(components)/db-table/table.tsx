"use client"
import { useState } from "react";
import { styles } from "../helpersUniversal/tsStyles";
import InputRow from "./inputRow";
import { field, fieldType, tableData } from "./field";

// <> Types used wihen working with tables
export type list = number;
export type listMulti = number;

// <> Define component props
type propsTable = {
	dataContents: tableData[][];
	fields: field[];
	editable?: boolean;
	newRowF:(recordInfo:any)=>void;
	// Pass down class
	cssClasses?: string;
}
type row = { rowUID: string, fields: { key: string, value: string }[] }

export function submitCell() {
	return <td><button className={styles.button} type="submit">Submit</button></td>
}

// <> FIX <> Why do I need both InutCell and cellEdit?  inputCell is used in inputRow, but why are these separate?
export function inputCell(cellKey: number, matchID: string, contentsCell: tableData, typingF: (arg0: any) => void, cssClasses?: string) {
	if (typeof (contentsCell) === "boolean") { return <td></td> }
	else return (<td key={cellKey}>
		<label className="collapse" htmlFor="uid">UID</label>
		<input name={matchID} id={matchID} defaultValue={contentsCell}
			onChange={typingF} className={styles.fields + cssClasses} />
	</td>)
}

export function empty(): (arg0: any) => void {
	return () => { };
}


export default function Table(props: propsTable) {
	//  <> Cache and initialize
	const data = props.dataContents;
	const editable = props.editable;
	const fields = props.fields;
	let indexRow = 0;


	// <> States
	const [isEditing, selectForEdit] = useState<number | null>(null)


	// ---------------------------------------------
	// <> Table helper functions
	// ---------------------------------------------


	// <> Functions for building the tables
	function tableHeader(headers: string[]) {
		let numberColumn = 0;
		return (
			<thead>
				<tr>
					{headers.map(eachOne => { return (<th key={`header-col#${numberColumn++}`}>{eachOne}</th>) })}
				</tr>
			</thead>
		)
	}

	function buttonCell(text: string, callbackF: () => void, type?: string) {
		return <td><button className={styles.button} value={text} onClick={callbackF}>{text}</button></td>
	}

	function tableRow(indexRow: number, rowValues: tableData[], isEditing: boolean, cssClasses?: string) {
		let indexCell = 0
		if (isEditing) {
			return (<tr key={`row#${indexRow}`}>
				{rowValues.map((element) => { return inputCell(indexCell++, `match${indexCell - 1}`, element, empty) })}
				{saveButton()}
			</tr>)
		}
		else return (<tr key={`row#${indexRow}`} className={cssClasses}>
			{/* Display cells */}
			{rowValues.map((element) => {
				const elementType = typeof (element);
				if (elementType === "boolean")
					return cellDisplay(`cell#${indexRow}-${indexCell++}`, element, elementType);
			})}
			{editable && editButton(indexRow)}
		</tr>)
	}

	// <> Matching buttons
	function editButton(rowID: number) { return (buttonCell("Edit", () => selectForEdit(rowID))) }
	function saveButton() {
		return (buttonCell("Save", () => {
			// <> Put in the request to create a new row.
			return selectForEdit(null);
		}))
	}

	// <> Matching cells
	function cellDisplay(indexCell: string, contentsCell: tableData, typeCell: fieldType) {
		return <td className={styles.roomy} key={`cell#${indexCell}`}>
			{contentsCell}
		</td>
	}

	// function cellEdit(indexCell: string, contentsCell: tableData) {
	// 	if (typeof(contentsCell)==="boolean") {return <td></td>}
	// 	else return <td className={styles.roomy} key={`cell#${indexCell}`}>
	// 		<input className={styles.roomy + 'bg-black text-black rounded '} defaultValue={contentsCell}></input>
	// 	</td>
	// }

	const dataHeaders = fields.map((eachField) => { return (eachField.displayLabel) })

	// <> Come back with the table
	return (
		<table className={`w-full table-auto ${props.cssClasses}`}>
			{tableHeader(dataHeaders)}
			<tbody>
				{data.map((contentsRow) => {
					const numIndex = indexRow++;
					let cssClasses = ""
					if (numIndex % 2 === 0) { cssClasses = "bg-slate-900" }
					return tableRow(numIndex, contentsRow, (numIndex === isEditing), cssClasses);
				})}
				{editable && <InputRow fields={fields} />}
			</tbody>
		</table>
	);


}