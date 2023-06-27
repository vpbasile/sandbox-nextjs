import { type } from "os"
import SelectList from "./selectList"
import { inputCell, submitCell } from "./table-helpers"
import { field } from "./field"

type propsType = {
	fields: field[]
}

export default function InputRow(props: propsType) {
	const fields = props.fields;
	const cells = fields.map((thisField) => {
		if (thisField.type === "string") {
			return (
				inputCell(thisField.matchID, thisField.defaultValue, thisField.changeFunction, "")
			)
		}

	})
	return (<tr>
		{cells}
		{submitCell()}
	</tr>)
}