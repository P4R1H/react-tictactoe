import { useState } from 'react'
import './App.css'

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isXTurn, setIsXTurn] = useState(true)
  const [winningSquares, setWinningSquares] = useState(Array(9).fill(false))
  let hasWon = 0;

  function calculateWinner(squares) {
    const winningLines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal
      [2, 4, 6]  // diagonal
    ]

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        hasWon = 1;
        return {
          winner: squares[a],
          line: [a, b, c]
        }
      }
    }

    const isDraw = squares.every(square => square !== null)
    return {
      winner: isDraw ? 'Draw' : null,
      line: []
    }
  }

  function handleClick(position) {
    if (squares[position] || hasWon) {
      return
    }

    const newSquares = squares.slice()
    newSquares[position] = isXTurn ? 'X' : 'O'
    
    const newResult = calculateWinner(newSquares)
    if (newResult.winner && newResult.winner !== 'Draw') {
      const newWinningSquares = Array(9).fill(false)
      newResult.line.forEach(pos => newWinningSquares[pos] = true)
      setWinningSquares(newWinningSquares)
    }

    setSquares(newSquares)
    setIsXTurn(!isXTurn)
  }

  function resetGame() {
    setSquares(Array(9).fill(null))
    setIsXTurn(true)
    setWinningSquares(Array(9).fill(false))
    hasWon = 0;
  }

  const result = calculateWinner(squares)
  let status
  if (result.winner === 'Draw') {
    status = 'Game is a Draw!'
  } else if (result.winner) {
    status = 'Winner: ' + result.winner
  } else {
    status = 'Next Player: ' + (isXTurn ? 'X' : 'O')
  }

  const buttons = squares.map((square, i) => (
    <button 
      key={i} 
      onClick={() => handleClick(i)} 
      style={{backgroundColor: winningSquares[i] ? 'red' : 'green'}}
    >
      {square}
    </button>
  ))

  return (
    <>
    <div className="container">
      <div className="cells">
        {buttons}
      </div>
      <div className="stats">
        <div id="status">{status}</div>
        <button className="new-game" onClick={resetGame}>New Game</button>
      </div>
    </div>
    </>
  )
}

export default App