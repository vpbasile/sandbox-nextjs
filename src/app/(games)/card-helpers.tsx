type cardData = { uid: number, rank: string, suit: string }

export function displayCard(cardUID: number, deckInfo: cardData[]): string {
	const uid = cardUID;
	const cardData: cardData | undefined = deckInfo.find((card) => card.uid === uid)
	if (cardData) return `${cardData.rank} of ${cardData.suit}`
	else return " ";
}