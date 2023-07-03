import { field } from "../db-table/field";
import Table from "../db-table/table";
import { tableData } from "../db-table/table-helpers";
import { hexagon } from "./hexDefinitions";

export default function RosterDisplay(props: {hexRoster:hexagon[]}){
	const fieldsForHexes:field[] = [
		{matchID:"q", displayLabel:"q", type:"number",defaultValue:"q",changeFunction:null},
		{matchID:"r", displayLabel:"r", type:"number",defaultValue:"r",changeFunction:null},
		{matchID:"text", displayLabel:"Text", type:"string",defaultValue:"Text",changeFunction:null},
		{matchID:"cssClasses",displayLabel:"Styles", type:"string",defaultValue:"cssClasses",changeFunction:null}
	]


	const hexRoster = props.hexRoster
	const rosterTable:tableData[][] = hexRoster.map((hex)=>{return [hex.q,hex.r,hex.hexText,hex.cssClasses]})
	let tableKeyNumber = 0
	return (
		<Table dataContents={rosterTable} fields={fieldsForHexes} />
		// <table className="table text-info">
		// 	<thead>
		// 		<tr>
		// 			<th>key</th><th>q</th><th>r</th><th>css classes</th><th>text</th>
		// 		</tr>
		// 	</thead>
		// 	<tbody>
		// 		{hexRoster.map((hex:hexagon)=>{
		// 			if (tableKeyNumber>30) {return null};
		// 			return (<tr key={`tableRow-${tableKeyNumber}`} className={hex.cssClasses}>
		// 				<td>{tableKeyNumber++}</td><td>{hex.q}</td><td>{hex.r}</td><td>{hex.cssClasses}</td><td>{hex.hexText}</td>
		// 			</tr>)
		// 		})}
		// 	</tbody>
		// </table>
	)
}