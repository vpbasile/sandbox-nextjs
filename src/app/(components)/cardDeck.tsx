"use client"
import { useState } from 'react';
import { styles } from './helpers/tsStyles';
import Table from './db-table/table';
import { field } from './db-table/field';

// Define the card suits
enum Suit {
	Cups = 'Cups',
	Coins = 'Coins',
	Wands = 'Wands',
	Swords = 'Swords',
}

// Define the card ranks
enum Rank {
	Ace = 'Ace',
	Two = 'Two',
	Three = 'Three',
	Four = 'Four',
	Five = 'Five',
	Six = 'Six',
	Seven = 'Seven',
	Eight = 'Eight',
	Nine = 'Nine',
	Ten = 'Ten',
	Jack = 'Jack',
	Queen = 'Queen',
	King = 'King',
}

// Define a type for a card
interface Card {
	suit: Suit;
	rank: Rank;
}

// Create a deck of cards
const createDeck = (): Card[] => {
	const suits = Object.values(Suit);
	const ranks = Object.values(Rank);

	const deck: Card[] = [];

	for (const suit of suits) {
		for (const rank of ranks) {
			deck.push({ suit, rank });
		}
	}

	return deck;
};

const CardDeck: React.FC = () => {
	const [deck, setDeck] = useState<Card[]>(createDeck());
	const [topCard, setTopCard] = useState<Card | null>(null);
	const [displayList, setDisplayList] = useState<string[][] | null>(null);
	const [showDeck, SETshowDeck] = useState(true);

	const shuffleDeck = () => {
		setTopCard(null);
		const shuffledDeck = [...deck];
		for (let i = shuffledDeck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
		}
		// <> Before we update the state, build a table for displaying the cards

		const displayListTemp = shuffledDeck.map((eachCard) => { return [`${eachCard.suit}`, `${eachCard.rank}`]; });
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
		const displayListTemp = remainingDeck.map((eachCard) => { return [`${eachCard.rank}`,`${eachCard.suit}`]; });
		setDisplayList(displayListTemp);

		setTopCard(dealtCard);
		console.log(`Dealt card: ${dealtCard.rank} of ${dealtCard.suit}`);
	};

	const fields: field[] = [
		{
			matchID: "rank",
			displayLabel: `Rank`,
			type: "string",
			defaultValue: "Rank",
			changeFunction: null,
			listTable: "ranks",
		},
		{
			matchID: "suit",
			displayLabel: `Suit`,
			type: "string",
			defaultValue: "Suit",
			changeFunction: null,
			listTable: undefined,
		}
	];
	return (
		<div className={styles.gridContainer}>
			<div className={styles.gridSidebar}>
				<button onClick={shuffleDeck} className={styles.button}>Shuffle Deck</button>
				<button onClick={dealCard} className={styles.button}>Deal Card</button>
				<button onClick={()=>SETshowDeck(!showDeck)} className={styles.button}>Hide/show deck</button>
				<div className={styles.playingCard}>
					{topCard && `${topCard?.rank} of ${topCard?.suit}`}	</div>
			</div>
			<div className={styles.gridDisplay}>
				{/* editable={false} */}
				{showDeck && displayList && <Table dataContents={displayList} fields={fields} />}
			</div>
		</div>
	);
};

export default CardDeck;

