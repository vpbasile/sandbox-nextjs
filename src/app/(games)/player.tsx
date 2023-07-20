import { useState } from "react";
import { Card } from "./cardDeck";
import Section from "../helpersUniversal/section";

interface PlayerProps {
	characterName: string;
	pointTotal: number;
	hand: Card[];
}

export default function Player(props: PlayerProps) {
	const emptyHand: Card[] = []
	const [hand, SEThand] = useState(emptyHand);
	const [pointTotal, SETpointTotal] = useState(0);

	return <Section id={"playerDisplay"} headerText={props.characterName} >
		Score: {pointTotal}
	</Section>
}
