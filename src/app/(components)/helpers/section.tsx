import { JsxElement } from "typescript";
import { styles } from "./tsStyles";
import { ReactNode } from "react";

type propsType = { id: string, headerText: string, children?: ReactNode };

export default function Section(props: propsType) {
	const headerText = props.headerText;
	return <div className={`w-full ${styles.bubble} ${styles.spacious}`}>
		<h2 className={styles.reallyBig + styles.roomy}>{headerText}</h2>
		{props.children}
	</div>;
}