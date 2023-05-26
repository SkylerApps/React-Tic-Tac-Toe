import BoardSquare from "./BoardSquare"
import { useEffect, useState, ReactElement } from "react"

function Board() {
  const [squares, setSquares] = useState<ReactElement[]>([])
  const [currentTurn, setCurrentTurn] = useState<"X" | "O">("X")
  const [playedSquares, setPlayedSquares] = useState<string[]>(Array(9).fill(""))
  const [hasWinner, setHasWinner] = useState<"X" | "O" | "Tie" | "None">("None")

  function takeTurn(key: number) {
    setCurrentTurn(currentTurn === "O" ? "X" : "O")

    const updatedPlayedSquares = [...playedSquares]

    updatedPlayedSquares[key] = currentTurn
    setPlayedSquares(updatedPlayedSquares)

    const isWinner = checkWinner(updatedPlayedSquares, currentTurn)
    if (isWinner) {
      setHasWinner(currentTurn)
    }

    return currentTurn
  }

  function checkWinner(squares: string[], symbol: string): boolean {
    // Return true only when either player 1 or 2 has won the match

    const winningCombinations = [
      [0, 1, 2], // Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonals
      [2, 4, 6]
    ]

    const board = squares.map((square: string) => square)

    if (squares.every((square) => square !== "")) {
      setHasWinner("Tie")
      return false // Tie
    }

    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (board[a] === symbol && board[b] === symbol && board[c] === symbol) {
        return true // Winner found
      }
    }

    return false // No winner
  }

  function initializeBoard() {
    const fillSquares: ReactElement[] = []
    for (let i = 0; i < 9; i++) {
      fillSquares.push(
        <BoardSquare
          key={i}
          squareKey={i}
          handleTurn={takeTurn}
          currentTurn={"*"}
        />
      )
    }
    setSquares(fillSquares)
  }

  function reset() {
    setHasWinner("None")
    setPlayedSquares(Array(9).fill(""))
    setCurrentTurn("X")
  }

  useEffect(() => {
    initializeBoard()
  }, [currentTurn])

  return (
    <div>
      {hasWinner === "None" ? (
        <>
          <h1>Player {currentTurn === "X" ? "1" : "2"}</h1>
          <div className="board">{squares}</div>
        </>
      ) : (
        <div>
          <h1>{hasWinner === "Tie" ? "Tie" : hasWinner === "X" ? "Player 1 has won" : "Player 2 has won"}!</h1>
          <div>
            <button onClick={reset}>Restart?</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Board
