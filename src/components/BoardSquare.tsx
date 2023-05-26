import {useEffect, useState} from "react"

function boardSquare({ squareKey, handleTurn, currentTurn }: { squareKey: number, handleTurn: any, currentTurn: string }) {

	const [display, setDisplay] = useState(currentTurn)

	function selectSquare() {
		if (display === "X" || display === "O") return
		setDisplay(handleTurn(squareKey))
	}

	useEffect(() => {
		setDisplay(currentTurn)
	}, [])

	return (
		<div
			className={'square'}
			onClick={selectSquare}
		>
			<p>
				{display}
			</p>
		</div>
	)
}

export default boardSquare
