import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [xIsNext, setXIsNext] = useState(true); 
  const [history, setHistory] = useState([Array(9).fill(null)]); 
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[history.length - 1]; 
  
  function onPlay(nextSquares) {
    setHistory([...history, nextSquares])
    setXIsNext(!xIsNext);
  };
  
  function jumpTo(move) {
    
  }

  const moves = history.map((squars, move) => {
    let description = '';

    if (move > 0) {
      description = `go to ${move}`;
    } else {
      description = 'go to start the game';
    };
    return <li>
        <button>{description}</button>
      </li>
  }
  );

  return (
    <div>
      <Game xIsNext={xIsNext} squares={currentSquares} onPlay={onPlay} />
      <ol>{moves}</ol>
    </div>
  ) 
}

function Game({xIsNext, squares, onPlay}) {
  
  function calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for(let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] ===  squares[c]) {
        return squares[a];
      };
    };
    return null;
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner()) {
      return;
    };
    
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'Y';
    };
    onPlay(nextSquares);
    calculateWinner();
  }; 

  function Square({value, onSquareClick}) {
    return ( 
      <button 
        className="square" 
        onClick={onSquareClick}
      >
        {value}
      </button>
    )
  };

  let winner = calculateWinner();
  let status;
  if (winner) status = `winner is ${winner}`;
  else status = `Next player ${xIsNext ? 'X' : 'O'}` 

  return (
    <div className="container">
     <p>{status}</p>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />   
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />       
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  )
}

export default App
