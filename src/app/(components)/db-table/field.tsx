import { URL } from "url";

export type field = {
	matchID: string;
	displayLabel: string;
	type: "string" | "number" | "link" | "list" | "list-multi";
	defaultValue: any;
	changeFunction: any;
	listTable?: string;
	url?:URL;
};
