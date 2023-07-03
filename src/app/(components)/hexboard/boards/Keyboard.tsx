import ErrorBoundary from '@/app/(components)/helpers/ErrorBoundary';
import GameBoard from '../HexBoardSVG';
import { useState } from "react";
import { gameGlobals, hexagon } from '../hexDefinitions';
import { hexOrientations } from '../hexMath';
import CanvasControl from '@/app/(components)/hexboard/forms/CanvasControl';
import BoardControl from '@/app/(components)/hexboard/forms/BoardControl';
import aspectRatio from '../rectMath';
import { clickMessage } from '../hexFunctions';
import { styles } from '../../helpers/tsStyles';


export default function Keyboard() {
	// <> States that control canvas parameters
	const [hexRadius, SEThexRadius] = useState(200);
	const [separationMultiplier, SETseparationMultiplier] = useState(1.1)
	const orientation = hexOrientations["pointy-top"]

	// <> Create the roster of hexes
	const hexList: hexagon[] = [];

	let keyboardCharList = [`qwertyuiop[]`, `asdfghjkl;'`, `zxcvbnm,./`, "_"]
	keyboardCharList.forEach((row, rowIndex) => {
		Array.from(row).forEach((key, keyIndex) => {
			let thisOne: hexagon = { q: keyIndex, r: rowIndex, hexText: key }
			hexList.push(thisOne)

		})
	})

	const cssClasses = ["bg-green", "bg-red", "bg-blue", "bg-purple", "bg-orange"]
	let cssClassIndex = 0;
	function getNextCssClass() {
		let cssClass = cssClasses[cssClassIndex];
		cssClassIndex = (cssClassIndex + 1) % cssClasses.length;
		return cssClass;
	}
	function colorHexes(hexes: hexagon[]) {
		hexes.forEach(hex => { hex.cssClasses = `hover-space ${getNextCssClass()}` })
	}

	colorHexes(hexList);


	const keyboardHexes = hexList.map(hex => {
		// Give all the hexes a cssClasses if they don't already have one
		if (hex.cssClasses === undefined) { hex.cssClasses = "hover-space bg-gray" }
		return hex;
	})

	// <> Gameboard Parameters
	const gameGlobals: gameGlobals = {
		orientation: orientation,
		hexRadius: hexRadius,
		textSize: hexRadius / 2,
		separationMultiplier: separationMultiplier,
		drawBackBoard: false,
		onClick: clickMessage,
	}

	const multiplier = aspectRatio();
	const [canvasWidth, SETcanvasWidth] = useState(2 * hexRadius * 12 * separationMultiplier)
	const [canvasHeight, SETcanvasHeight] = useState(canvasWidth / multiplier)
	const originY = hexRadius * separationMultiplier;
	const [hexGridOrigin, SEThexGridOrigin] = useState({ x: originY * multiplier, y: originY });
	const canvasGlobals = {
		canvasWidth: canvasWidth,
		canvasHeight: canvasHeight,
		hexGridOrigin: hexGridOrigin,
		canvasBackgroundColor: '#000',
	}

	return (
		<ErrorBoundary>
			<div className={styles.gridContainer}>
				<div id="sideBar" className={styles.gridSidebar}>
					<BoardControl
						hexRadius={hexRadius} SEThexRadius={SEThexRadius}
						separationMultiplier={separationMultiplier} SETseparationMultiplier={SETseparationMultiplier}
					/>
					<CanvasControl
						canvasWidth={canvasWidth} SETcanvasWidth={SETcanvasWidth}
						canvasHeight={canvasHeight} SETcanvasHeight={SETcanvasHeight}
						hexGridOrigin={hexGridOrigin} SEThexGridOrigin={SEThexGridOrigin}
					/>
				</div>
				<div id="displayBoardContainer" className={styles.gridDisplay}>
					<div id='displayBoard' className="col-md-10">
						<GameBoard
							hexRoster={keyboardHexes}
							gameGlobals={gameGlobals}
							canvasGlobals={canvasGlobals}
							displayRoster={true}
						//   logo={logo}
						/>
					</div>
				</div>
			</div>
		</ErrorBoundary>

	);
}