export function commaList(list:string[]):string {
	let returnString = ""
	for(let i=0;i<list.length;i++){
		if(returnString!=="") returnString += ", "
		returnString += list[i]
	}
	return returnString
}