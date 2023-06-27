import { type } from "os"
import SelectList from "./selectList"
import { inputCell, submitCell } from "./table-helpers"
import { field } from "./field"

type propsType = {
	fields: field[]
}

export default function InputRow(props: propsType) {
	const fields = props.fields;
	let fieldCount = 0;
	const cells = fields.map((thisField) => {
		switch (thisField.type) {
			case 'string': return inputCell(fieldCount++, thisField.matchID, thisField.defaultValue, thisField.changeFunction, "");
			case 'list':
				const listTable = thisField.listTable
				if (listTable)
					return <td key={fieldCount++}>
						<SelectList tableName={listTable} url={""} 
						onSelect={function (e: Event): void { throw new Error("Function not implemented.") }} />;
					</td>
				else {
					console.log(`List ${thisField.matchID} does not specify a list table.  Lists must specify a list table.`); return <td key={fieldCount++}>Boing</td>
				}
			case 'list-multi': return <td key={fieldCount++}>Nothing</td>;
			default: console.log(`Field type not implemented: ${thisField.type}`);
		}
	})
	return (<tr>
		{cells}
		{submitCell()}
	</tr>)
}