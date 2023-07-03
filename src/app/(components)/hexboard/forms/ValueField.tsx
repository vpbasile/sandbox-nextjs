import React from 'react';
import { styles } from '../../helpers/tsStyles';
import { tableData } from '../../db-table/table-helpers';

export default function ValueField(props: {
	fieldName: string,
	labelText: string,
	type: string,
	defaultValue: tableData, onChangeFunction: any
}) {
	const fieldName = props.fieldName;
	const labelText = props.labelText;
	const type = props.type;
	const defaultValue = props.defaultValue;
	const onChangeFunction = props.onChangeFunction
	return (
		<React.Fragment>
			<label htmlFor={fieldName}>{labelText}</label>
			<input name={fieldName} type={type} className={styles.fields} defaultValue={defaultValue} onChange={(e) => onChangeFunction(+e.target.value)} />
		</React.Fragment>
	)
}