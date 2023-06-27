import { styles } from "../tsStyles";

type propsType = {
	tableName: string, url: string, onSelect: (e: Event) => void
}

export default function SelectList(props: propsType) {
	const tableName = props.tableName;
	let listContents;
	const urlToQuery = props.url + tableName;
	console.log("Attempting to query " + urlToQuery)
	fetch(urlToQuery).then(data => { listContents = data }).catch(error => { console.log("An error occurred - see console for details."); console.log(error); });

	console.log(listContents);

	return (
		<select className={styles.fields}>
			<option>This</option>
			<option>That</option>
		</select>
	)

}