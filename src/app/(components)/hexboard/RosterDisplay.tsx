import Table, { empty, field, tableData } from "../db-table/table";
import { hexagon } from "./hexDefinitions";

export default function RosterDisplay(props: { hexRoster: hexagon[] }) {
	const fieldsForHexes: field[] = [
		{ matchID: "q", labelText: "q", type: "number", defaultValue: "q", changeFunction: empty, automatic: false },
		{ matchID: "r", labelText: "r", type: "number", defaultValue: "r", changeFunction: empty, automatic: false },
		{ matchID: "text", labelText: "Text", type: "string", defaultValue: "Text", changeFunction: empty, automatic: false },
		{ matchID: "cssClasses", labelText: "Styles", type: "string", defaultValue: "cssClasses", changeFunction: empty, automatic: false }
	]


	const hexRoster = props.hexRoster
	const rosterTable: tableData[][] = hexRoster.map((hex) => { return [hex.q, hex.r, hex.hexText, hex.cssClasses] })
	let tableKeyNumber = 0
	return (
		<Table dataContents={rosterTable} fields={fieldsForHexes} newRowF={function (recordInfo: any): void {
			throw new Error("Function not implemented.");
		}} />

	)
}