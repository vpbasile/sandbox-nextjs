  // ---------------------------------------------
  // <> Table utilities
  // ---------------------------------------------

import { useState } from "react";

// <> Types used wihen working with tables
type list = number;
type listMulti = number;
type tableData = undefined | string | number | boolean | list | listMulti;
type fieldType = "string" | "number" | "boolean" | "list" | "list-multi" | "uid"
type field = {
	matchID: string;
	labelText: string;
	type: fieldType;
	defaultValue: tableData;
	changeFunction?: ((arg0: any) => void);
	listTable?: string;
	// url?: URL;
};
type inputFieldType = string | number | readonly string[] | undefined;

function empty(): (arg0: any) => void { return () => { }; }
const dataHeaders = (fields:field[]) => { return (fields.map((eachField) => { return (eachField.labelText) })) }

  // ---------------------------------------------
  // <> END Table utilities
  // ---------------------------------------------