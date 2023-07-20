import CardDeck from "./cardDeck";
import DiceRoller from "./diceRoll";
import Player from "./player";

export default function Gameboard() {
	return <div id="gameboard-display">
		<Player characterName={"Player 1"} pointTotal={0} hand={[]} />
		<CardDeck />
		<DiceRoller numDice={1} numSides={6} />
			<DiceRoller numDice={2} numSides={12} />
	</div>
}