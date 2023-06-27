import { styles } from "./tsStyles";

type propsType = { id: string, headerText: string, children?: any };

export default function Section(props: propsType) {
	const headerText = props.headerText;
	return <div className={`w-full ${styles.bubble} ${styles.spacious}`}>
		<h2 className={styles.reallyBig + styles.roomy}>{headerText}</h2>
		{props.children}
	</div>;
}