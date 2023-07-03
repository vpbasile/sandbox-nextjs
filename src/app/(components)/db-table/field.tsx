import { URL } from "url";

export type fieldType = "string" | "number" | "link" | "list" | "list-multi"
export type field = {
	matchID: string;
	displayLabel: string;
	type: fieldType;
	defaultValue: any;
	changeFunction: any;
	listTable?: string;
	url?:URL;
};
