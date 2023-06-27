"use client"
import { use, useState } from "react";
import { styles } from "../structure/tsStyles";
import { buttonCell, tableHeader } from "./table-helpers";
import InputRow from "./inputRow";
import { field } from "./field";


// <> Define component props
type propsTable = {
	dataContents: (string | number)[][];
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

	// <> States
	const [isEditing, selectForEdit] = useState<number | null>(null)

	type row = { rowUID: string, fields: { key: string, value: string }[] }

	function tableRow(indexRow: number, fields: any[], isEditing: boolean) {
		let indexCell = 0
		if (isEditing) {
			return (<tr key={`row#${indexRow}`}>
				{fields.map((element) => { return cellEdit(`cell#${indexRow}-${indexCell++}`, element) })}
				{saveButton()}
			</tr>)
		}
		else return (<tr key={`row#${indexRow}`}>
			{fields.map((element) => { return cellDisplay(`cell#${indexRow}-${indexCell++}`, element) })}
			{editable && editButton(indexRow)}
		</tr>)
	}

	// <> Matching buttons
	function editButton(rowID: number) { return (buttonCell("Edit", () => selectForEdit(rowID))) }
	function saveButton() { return (buttonCell("Save", () => selectForEdit(null))) }

	// <> Matching cells
	function cellDisplay(indexCell: string, contentsCell: string) {
		return <td className={styles.roomy} key={`cell#${indexCell}`}>
			{contentsCell}
		</td>
	}

	function cellEdit(indexCell: string, contentsCell: string) {
		return <td className={styles.roomy} key={`cell#${indexCell}`}>
			<input className={styles.roomy} defaultValue={contentsCell}></input>
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
					return tableRow(numIndex, contentsRow, (numIndex === isEditing));
				})}
				<InputRow fields={fields} />
			</tbody>
		</table>
	);


}