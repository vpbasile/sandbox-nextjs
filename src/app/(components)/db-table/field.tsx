export type field = {
	matchID: string;
	displayLabel: string;
	type: "string" | "list" | "list-multi";
	defaultValue: any;
	changeFunction: any;
	listTable?: string;
};
