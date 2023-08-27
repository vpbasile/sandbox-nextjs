import { useState } from "react";
// import { Card } from "./carDisplay";
import { displayCard } from "./card-helpers";

interface PlayerProps {
	characterName: string;
	pointTotal: number;
	hand: number[];
	deck: any[];
}

export default function Player(props: PlayerProps) {
	const [pointTotal, SETpointTotal] = useState(0);
	const hand = props.hand;

	function li(contents: any) {
		return <li className="mr-6 w-25 h-35 border m-2 p-2 rounded">{contents}</li>
	}

	return <div id={"playerDisplay"}>
		{props.characterName}
		<p>Score: {pointTotal}</p>
		<p>Hand: </p>
		<ul className="flex">
			{hand.map(cardID => li(displayCard(cardID, props.deck)))}
		</ul>
	</div>
}
