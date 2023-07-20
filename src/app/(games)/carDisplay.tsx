"use client"
import { styles } from '../helpersUniversal/tsStyles';
import Table, { empty, field } from '../(components)/db-table/table';

export default function CardDisplay() {

	const shuffleDeck = () => {
		setTopCard(null);
		const shuffledDeck = [...deck];
		for (let i = shuffledDeck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
		}
		// <> Before we update the state, build a table for displaying the cards
		// <> DATA <> Translation function
		const displayListTemp = shuffledDeck.map((eachCard) => { return [`${eachCard.rank}`, `${eachCard.suit}`]; });
		setDisplayList(displayListTemp);
		// <>
		setDeck(shuffledDeck);
	};

	const dealCard = () => {
		if (deck.length === 0) {
			console.log('No more cards in the deck!');
			return;
		}

		const [dealtCard, ...remainingDeck] = deck;
		setDeck(remainingDeck);
		const displayListTemp = remainingDeck.map((eachCard) => { return [`${eachCard.rank}`, `${eachCard.suit}`]; });
		setDisplayList(displayListTemp);

		setTopCard(dealtCard);
		// console.log(`Dealt card: ${dealtCard.rank} of ${dealtCard.suit}`);
	};

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
	return (
		<div className={styles.gridContainer}>
			<div className={styles.gridSidebar}>
				<button onClick={shuffleDeck} className={styles.button}>Shuffle Deck</button>
				<button onClick={dealCard} className={styles.button}>Deal Card</button>
				<button onClick={() => SETshowDeck(!showDeck)} className={styles.button}>Hide/show deck</button>
				<div className={styles.playingCard}>
					{topCard && `${topCard?.rank} of ${topCard?.suit}`}	</div>
			</div>
			<div className={styles.gridDisplay}>
				{/* editable={false} */}
				{showDeck && displayList && <Table dataContents={displayList} fields={fields} newRowF={empty} />}
			</div>
		</div>
	);
}

