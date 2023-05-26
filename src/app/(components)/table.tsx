"use client"
import { use, useState } from "react";


// <> Define component props
type propsTable = {
	dataLabels: string[]
	dataContents: string[][]
	// Pass down class
	cssClasses?: string
}

export default function Table(props: propsTable) {
	//  <> Cache and initialize
	const headers = props.dataLabels;
	const data = props.dataContents;
	let indexRow = 0;
	const standardCss = "rounded p-3 w-full"

	// <> States
	const [isEditing, selectForEdit] = useState<number | null>(null)
	const [keyTemp, keySetTemp] = useState<number | null>(null)
	const [titleTemp, titleSetTemp] = useState<number | null>(null)
	const [urlTemp,urlSetTemp] = useState<number | null>(null)

	// <> Functions for building the tables
	function tableHeader(headers: string[]) {
		let numberColumn = 0;
		return <thead>
			<tr>{headers.map(eachOne => { return (<th key={`header-col#${numberColumn++}`}>{eachOne}</th>) })}</tr>
		</thead>
	}
	type row = { rowUID: string, fields: { key: string, value: string }[] }

	function tableRow(indexRow: number, fields: any[], isEditing: boolean) {
		let indexCell = 0
		if (isEditing) {
			return (<tr key={`row#${indexRow}`} className={`border border-slate-100`} >
				{saveButton()}
				{fields.map((element) => { return cellEdit(`cell#${indexRow}-${indexCell++}`, element) })}
			</tr>)
		}
		else return (<tr key={`row#${indexRow}`} >
			{editButton(indexRow)}
			{fields.map((element) => { return cellDisplay(`cell#${indexRow}-${indexCell++}`, element) })}
		</tr>)
	}
	function editButton(rowID: number) {
		return <td><button className={`${standardCss} bg-slate-700 text-slate-100`} value={"Edit"} onClick={() => selectForEdit(rowID)}>Edit</button></td>

	}
	function saveButton() {
		return <td><button className={`${standardCss} bg-slate-100 text-slate-700`} value={"Save"}>Save</button></td>
	}

	function cellDisplay(indexCell: string, contentsCell: string, appendStyle?: string) {
		return <td className={`${standardCss} ${appendStyle}`} key={`cell#${indexCell}`}>{contentsCell}</td>
	}

	function cellEdit(indexCell: string, contentsCell: string, appendStyle?: string) {
		return <td className={`${standardCss} bg-slate-700 text-slate-100 ${appendStyle}`} key={`cell#${indexCell}`}>
			<input className={`bg-slate-700 text-slate-100`} value={contentsCell}></input>
		</td>
	}


	// <> Come back with the table
	return (
		<table className={`w-full table-auto ${props.cssClasses}`}>
			{tableHeader(headers)}
			<tbody>
				{data.map((contentsRow) => {
					const numIndex = indexRow++;
					return tableRow(numIndex, contentsRow, (numIndex === isEditing));
				})}
			</tbody>
		</table>
	);


}