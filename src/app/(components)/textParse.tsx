"use client"

import { useState } from "react"
import Table from "./table"
import { data } from "autoprefixer"
import { styles } from "./tsStyles"

type propsType = {}

export default function TextParse(props: propsType) {
	const tempString = `Field 1|Field 2|Third Field|Yet another|Field the fifth
	Value apple|value b|
	Value C|Delta Value||Echo Value
	Value C|Delta Value|Echo Value||Nothing|Too much`
	const [stringToParse, setString] = useState(tempString)
	const [dlm, dlmSet] = useState(`|`)
	let dataContainer: string[][] = [];
	// Convert the data to internal type
	// // First, find all the headers
	const lines: string[] = stringToParse.split(`\n`)
	const headersList = lines[0].split(dlm)
	// Then loop through the data
	for (let i = 1; i < lines.length; i++) {
		const thisLine = lines[i]
		dataContainer[i] = thisLine.split(dlm);

	}
	// Build the UI
	return (<>
		<div className="flex flex-row">
			<div id="left-col">
				<label htmlFor="dlmField">Delimiter: </label>
				<input defaultValue={dlm} onChange={(e) => { dlmSet(e.target.value) }} className={`basis-1/4 ${styles.fields}`} /></div>
			<div id="right-col" className={`basis-3/4 ${styles.fields}`}>
				<textarea defaultValue={stringToParse} onChange={(e) => { setString(e.target.value) }} className={`w-full ${styles.bubble} ${styles.spacious} ${styles.fields}`} />
			</div>
		</div>
		<div>
			<Table dataLabels={headersList} dataContents={dataContainer} />
		</div>
	</>)
}