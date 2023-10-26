import React, { useState } from "react";
const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerX, setPlayerX] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinnningCells] = useState([]);
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const handleClick = (index) => {
    if (board[index] === null && winner === null) {
      const newBoard = [...board];
      newBoard[index] = playerX ? "X" : "O";
      setBoard(newBoard);

      //check winner
      const winner = checkWinner(newBoard);
      if (winner) {
        setWinner(winner);
      } else if (newBoard.every((cell) => cell !== null)) {
        setWinner("draw");
      } else {
        setPlayerX(!playerX);
      }
    }
  };

  const checkWinner = (board) => {
    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinnningCells(condition);
        return board[a];
      }
    }
    return null;
  };

  const getCellColor = (cell, index) => {
    if (winningCells.includes(index)) {
      return "green";
    }
    return cell === "X" ? "blue" : "red";
  };

  const renderBoard = () => {
    return (
      <div>
        <div>{JSON.stringify(board)}</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gridGap: "5px",
            marginBottom: 20
          }}
        >
          {board.map((cell, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  handleClick(index);
                }}
                style={{
                  backgroundColor: cell ? getCellColor(cell, index) : "blue",
                  height: 100,
                  width: 100,
                  fontSize: 36,
                  borderRadius: 5
                }}
              >
                {cell}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            setBoard(Array(9).fill(null));
            setPlayerX(true);
            setWinner(null);
            setWinnningCells([]);
          }}
        >
          Restart game
        </button>
        {winner && (
          <p>{winner === "draw" ? "Draw" : `Player${winner} has won`}</p>
        )}
      </div>
    );
  };
  return <div>{renderBoard()}</div>;
};
export default Game;
