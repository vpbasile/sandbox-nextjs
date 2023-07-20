import { useState } from 'react';

interface DiceRollerProps {
	numDice: number;
	numSides: number;
}

const getRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function DiceRoller(props: DiceRollerProps) {
	const numDice = props.numDice;
	const numSides = props.numSides;
	const [diceResult, setDiceResult] = useState<number | null>(null);

	const rollDice = () => {
		let total = 0;
		for (let i = 0; i < numDice; i++) {
			const roll = getRandomNumber(1, numSides);
			total += roll;
		}
		setDiceResult(total);
	};

	return (
		<div>
			<button onClick={rollDice}>Roll {numDice}d{numSides}</button>
			{diceResult !== null && <p>Dice Result: {diceResult}</p>}
		</div >
	);
};