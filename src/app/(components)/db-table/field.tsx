import { URL } from "url";

export type tableData = string | number | undefined;
export type fieldType = "string" | "number" | "link" | "list" | "list-multi"
export type field = {
	matchID: string;
	displayLabel: string;
	type: fieldType;
	defaultValue: tableData;
	changeFunction: ((arg0:any)=>void);
	listTable?: string;
	url?:URL;
};
