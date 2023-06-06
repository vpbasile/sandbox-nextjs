"use client"
import { useState } from 'react';
import { styles } from './tsStyles';
import Table from './table';

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
		const displayListTemp = deck.map((eachCard) => { return [`${eachCard.suit}`, `${eachCard.rank}`]; });
		setDisplayList(displayListTemp);

		setTopCard(dealtCard);
		console.log(`Dealt card: ${dealtCard.rank} of ${dealtCard.suit}`);
	};

	return (
		<div>
			<h1>Card Deck Simulator</h1>
			<button onClick={shuffleDeck} className={styles.button}>Shuffle Deck</button>
			<button onClick={dealCard} className={styles.button}>Deal Card</button>
			<div>
				{topCard && `${topCard?.rank} of ${topCard?.suit}`}
				{displayList && <Table dataLabels={[`Suit`, `Rank`]} dataContents={displayList} editable={false} />}
			</div>
		</div>
	);
};

export default CardDeck;

