"use client"
import { use, useState } from "react";
import { styles } from "../helpers/tsStyles";
import { buttonCell, tableData, tableHeader } from "./table-helpers";
import InputRow from "./inputRow";
import { field, fieldType } from "./field";


// <> Define component props
type propsTable = {
	dataContents: tableData[][];
	fields: field[];
	editable?: boolean;
	// Pass down class
	cssClasses?: string;
}

export default function Table(props: propsTable) {
	//  <> Cache and initialize
	const data = props.dataContents;
	const editable = props.editable;
	const fields = props.fields;
	let indexRow = 0;

	const quote = '"';

	// <> States
	const [isEditing, selectForEdit] = useState<number | null>(null)

	type row = { rowUID: string, fields: { key: string, value: string }[] }

	function tableRow(indexRow: number, rowValues: tableData[], isEditing: boolean, cssClasses?: string) {
		let indexCell = 0
		if (isEditing) {
			return (<tr key={`row#${indexRow}`}>
				{rowValues.map((element) => { return cellEdit(`cell#${indexRow}-${indexCell++}`, element) })}
				{saveButton()}
			</tr>)
		}
		else return (<tr key={`row#${indexRow}`} className={cssClasses}>
			{/* Display cells */}
			{rowValues.map((element) => { return cellDisplay(`cell#${indexRow}-${indexCell++}`, element, typeof (element)) })}
			{editable && editButton(indexRow)}
		</tr>)
	}

	// <> Matching buttons
	function editButton(rowID: number) { return (buttonCell("Edit", () => selectForEdit(rowID))) }
	function saveButton() { return (buttonCell("Save", () => selectForEdit(null))) }

	// <> Matching cells
	function cellDisplay(indexCell: string, contentsCell: tableData, typeCell: fieldType) {
		if (typeCell === "string") { contentsCell = quote + contentsCell + quote }
		return <td className={styles.roomy} key={`cell#${indexCell}`}>
			{contentsCell}
		</td>
	}

	function cellEdit(indexCell: string, contentsCell: tableData) {
		return <td className={styles.roomy} key={`cell#${indexCell}`}>
			<input className={styles.roomy + 'bg-black text-black rounded '} defaultValue={contentsCell}></input>
		</td>
	}

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