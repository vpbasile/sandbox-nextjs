import { type } from "os"
import SelectList from "./selectList"
import { field } from "./field"
import { styles } from "../helpersUniversal/tsStyles"
import { inputCell, submitCell } from "./table"

type propsType = {
	fields: field[]
}

export default function InputRow(props: propsType) {
	const fields = props.fields;
	let fieldCount = 0;
	const cells = fields.map((thisField) => {
		switch (thisField.type) {
			case 'string': return inputCell(fieldCount++, thisField.matchID, thisField.defaultValue, thisField.changeFunction, "");
			case 'number': return (<td key={fieldCount++}>
				<label className="collapse" htmlFor="uid">UID</label>
				<input name={thisField.matchID} id={thisField.matchID} defaultValue={thisField.defaultValue}
					onChange={thisField.changeFunction} className={styles.fields} />
			</td>);
			case 'boolean': return <td key={fieldCount++}></td>
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