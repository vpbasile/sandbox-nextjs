import CardDeck from "./carDisplay";
import DiceRoller from "./diceRoll";
import Player from "./player";
import deckMaster from "./deck-standard.json"
import Table, { empty, field } from "../(components)/db-table/table";
import { styles } from "../helpersUniversal/tsStyles";
import { useState } from "react";

export default function Gameboard() {
	type cardRoster = number[];
	// Gameplay states
	const [drawPile, SETdrawPile] = useState(shuffle(deckMaster.map(each => each.uid)))
	const emptyHand: number[] = []
	const [player1hand, SETplayer1hand] = useState(emptyHand)

	// UI states
	const [showDeck, SETshowDeck] = useState(false);

	function shuffle(current: cardRoster): cardRoster {
		let newRoster = [...current];
		for (let i = newRoster.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newRoster[i], newRoster[j]] = [newRoster[j], newRoster[i]];
		}
		return newRoster;
	}
	const shuffleDrawPile = () => SETdrawPile(shuffle(drawPile));

	const drawCard = (playerNumber: number) => {
		const newRoster = [...drawPile]
		const drawnCard = newRoster.shift();
		if (drawnCard) {
			SETdrawPile(newRoster)
			const tempHand = [...player1hand]
			tempHand.unshift(drawnCard)
			SETplayer1hand(tempHand);
			return drawnCard
		}
		else return 0;
	}


	// DISPLAY Data definitions
	const fields: field[] = [
		{
			matchID: "rank",
			labelText: `Rank`,
			type: "string",
			defaultValue: "Rank",
			listTable: "ranks",
			changeFunction: empty,
			automatic: false
		},
		{
			matchID: "suit",
			labelText: `Suit`,
			type: "string",
			defaultValue: "Suit",
			listTable: undefined,
			changeFunction: empty,
			automatic: false
		}
	];

	const displayList = drawPile.map((thisCardID) => {
		const cardInfo = deckMaster.find(card => card.uid === thisCardID)
		return [cardInfo?.rank, cardInfo?.suit]
	})

	// <> Main actions

	return <div id="gameboard-display">
		<Player characterName={"Player 1"} pointTotal={0} hand={player1hand} deck={deckMaster} />
		{/* <CardDeck /> */}
		{/* <DiceRoller numDice={1} numSides={6} />
		<DiceRoller numDice={2} numSides={12} /> */}
		<div className={styles.gridContainer}>
			<div className={styles.gridSidebar}>
				<button onClick={shuffleDrawPile} className={styles.button}>Shuffle Deck</button>
				<button onClick={() => drawCard(1)} className={styles.button}>Draw Card</button>
				<button onClick={() => SETshowDeck(!showDeck)} className={styles.button}>Hide/show deck</button>
				<div className={styles.playingCard}>Display a card here</div>
			</div>
			<div className={styles.gridDisplay}>
				{/* editable={false} */}
				{showDeck && displayList && <Table dataContents={displayList} fields={fields} newRowF={empty} />}
			</div>
		</div>
	</div>
}