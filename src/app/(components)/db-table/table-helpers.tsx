import { styles } from "../tsStyles";

// <> Functions for building the tables
export function tableHeader(headers: string[]) {
	let numberColumn = 0;
	return (
		<thead>
			<tr>
				{headers.map(eachOne => { return (<th key={`header-col#${numberColumn++}`}>{eachOne}</th>) })}
			</tr>
		</thead>
	)
}

export function buttonCell(text: string, callbackF: () => void, type?: string) {
	return <td><button className={styles.button} value={text} onClick={callbackF}>{text}</button></td>
}

export function submitCell() {
	return <td><button className={styles.button} type="submit">Submit</button></td>
}

export function inputCell(matchID: string, defaultValue: string | number, typingF: (arg0: any) => void, cssClasses?: string) {
	return (<td>
		<label className="collapse" htmlFor="uid">UID</label>
		<input name={matchID} id={matchID} defaultValue={defaultValue}
			onChange={typingF} className={cssClasses} />
	</td>)
}