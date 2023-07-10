// https://dev.to/sanity-io/how-to-use-svgs-in-react-3gof

import ErrorBoundary from '@/app/(components)/helpersUniversal/ErrorBoundary';
import Hexagon from './Hexagon';
import { canvasGlobals, coordinateXY, gameGlobals, hexagon } from "./hexDefinitions";
import { directionVectors, hex_to_pixel } from './hexMath';
import { clickMessage } from './hexFunctions';
import RosterDisplay from './RosterDisplay';

//style
import './hex.css';

export interface gameBoardProps {
	gameGlobals: gameGlobals;
	canvasGlobals: canvasGlobals;
	hexRoster: hexagon[];
	textSize?: number;
	cssClasses?: string;
	displayRoster?: boolean
}

export default function GameBoard(props: gameBoardProps) {
	// Initialize variables
	const gameGlobals = props.gameGlobals;
	const hexRoster = props.hexRoster;
	const canvasGlobals = props.canvasGlobals;
	const canvasWidth = canvasGlobals.canvasWidth;
	const canvasHeight = canvasGlobals.canvasHeight;
	const hexGridOrigin = canvasGlobals.hexGridOrigin;
	const cssClasses = props.cssClasses;
	let range = { xMin: 0, xMax: 0, yMin: 0, yMax: 0 }
	// <> Debugging logs
	// console.log(`Canvas size: ${Math.floor(canvasWidth)}, ${Math.floor(canvasHeight)}`)
	// console.log(`Grid origin: ${Math.floor(hexGridOrigin.x)}, ${Math.floor(hexGridOrigin.y)}`)

	// <> Render Functions
	// Side effect: sets range = { xMin: 0, xMax: 0, yMin: 0, yMax: 0 }
	function backBoard(hexRoster: hexagon[], gameGlobals: gameGlobals): string {
		// <> Find the min and max values for q and r.  Convert those to rectangular coordinates.  
		let maxRadius = 0
		hexRoster.forEach(hex => {
			const q = hex.q;
			const r = hex.r;
			const s = -q - r;
			if (Math.abs(q) > maxRadius) { maxRadius = q }
			if (Math.abs(r) > maxRadius) { maxRadius = r }
			if (Math.abs(s) > maxRadius) { maxRadius = s }
		});
		maxRadius++;
		let cornerPoints: coordinateXY[] = directionVectors.map((vector) => {
			const corner = hex_to_pixel(vector.q * maxRadius, vector.r * maxRadius, gameGlobals);
			if (corner.x < range.xMin) { range.xMin = corner.x }
			if (corner.x > range.xMax) { range.xMax = corner.x }
			if (corner.y < range.yMin) { range.yMin = corner.y }
			if (corner.y > range.yMax) { range.yMax = corner.y }
			return corner;
		})
		let returnString: string = ""
		cornerPoints.forEach((point) => {
			if (returnString !== "") { returnString += " " }
			returnString += `${point.x},${point.y}`
		})
		return returnString;

	}

	// <> Do some last minute things to the roster, like assigning unique ids if they are missing
	let hexKey = 0;
	const hexes = hexRoster.map((hex: hexagon) => {
		const thisHexKey = hexKey++;
		return <Hexagon
			gameGlobals={gameGlobals}
			key={thisHexKey}
			id={thisHexKey}
			q={hex.q}
			r={hex.r}
			cssClasses={hex.cssClasses}
			hexText={hex.hexText}
			clickMessage={clickMessage(hex, thisHexKey, hex.hexText)}
		/>
	})
	// Do the math for the bounding hex and box
	const backboardPoints = backBoard(hexRoster, gameGlobals);
	const rectInfo = boundRect(range);

	return (
		<ErrorBoundary boundaryName={"GameBoard"}>
			{/* <> Parent SVG */}
			<svg
				className={cssClasses}
				viewBox={`${-hexGridOrigin.x} ${-hexGridOrigin.y} ${canvasWidth} ${canvasHeight}`}
				style={{ rotate: "0deg", fill: "white", opacity: "0.8" }}
				xmlns="<http://www.w3.org/2000/svg>">
				{gameGlobals.drawBackBoard && <polygon
					style={{}}
					className={`just-grid`}
					id={`backboard`}
					points={backboardPoints}
				/>}
				{/* <> The hexagons */}
				{hexes}
				{/* <> The bounding box */}
				<rect width={rectInfo.width} height={rectInfo.height} x={rectInfo.x} y={rectInfo.y} style={{ fill: "none", stroke: "#F4C9C9", strokeWidth:"10px", opacity: "1.0"} }/>
			</svg>
			{props.displayRoster && <RosterDisplay hexRoster={hexRoster} />}
		</ErrorBoundary>
	)

	function boundRect(range: { xMin: number; xMax: number; yMin: number; yMax: number; }): { width: number, height: number, x: number, y: number } {
		const newRange = {
			xMin: Math.floor(range.xMin), xMax: Math.floor(range.xMax),
			yMin: Math.floor(range.yMin), yMax: Math.floor(range.yMax)
		};
		// console.log(newRange);
		const rectWidth = Math.abs(newRange.xMax - newRange.xMin);
		const rectHeight = Math.abs(newRange.yMax - newRange.yMin);
		return ({
			width: rectWidth,
			height: rectHeight,
			x: -(rectWidth / 2),
			y: -(rectHeight / 2),
		})
	}
}