"use client"

import { useState } from "react"
import Table from "./table"
import { data } from "autoprefixer"
import { styles } from "./tsStyles"

type propsType = {}

export default function TextParse(props: propsType) {
	const tempString = `Field 1|Field 2|Third Field|Yet another|Field the fifth
	Value apple|value b|Nothing else||Also
	Value C|Delta Value||Echo Value
	Value C|Delta Value|Echo Value||Nothing`
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
		<div id="field-col" className={`w-full bg-orange-950`}>
			<textarea defaultValue={stringToParse} onChange={(e) => { setString(e.target.value) }} className={`w-full min-h-800 ${styles.bubble} ${styles.spacious} ${styles.fields}`} />
			<label htmlFor="dlmField">Delimiter: </label>
			<input defaultValue={dlm} onChange={(e) => { dlmSet(e.target.value) }} className={`w-[12rem] ${styles.fields}`} /></div>
		<div>
			<Table dataLabels={headersList} dataContents={dataContainer} />
		</div>
	</>)
}