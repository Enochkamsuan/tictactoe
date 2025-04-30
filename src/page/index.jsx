import React, { useState } from "react";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState("X");

  const handleClick = (target) => {
    if (board[target] || checkWinner(board)) return;

    const newBoard = [...board];
    newBoard[target] = playerTurn;

    setBoard(newBoard);

    if (checkDraw(newBoard)) {
      return;
    }

    setPlayerTurn(playerTurn === "X" ? "O" : "X");
  };

  const checkWinner = (index) => {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];

    for (let [a, b, c] of winLines) {
      if (index[a] && index[a] === index[b] && index[a] === index[c]) {
        return index[a];
      }
    }
    return null;
  };

  const winner = checkWinner(board);

  console.log("board", board);

  const checkDraw = (board) => {
    if (checkWinner(board) === null && board.every((cell) => cell !== null)) {
      return true;
    }
  };

  return (
    <div className="bg-cyan-500 h-screen relative p-4">
      <div className="w-full lg:w-[30%] absolute top-[34%] left-0 lg:left-[34%] -transform-x-1/2 -transform-y-1/2 px-10">
        <div className="bg-black p-2">
          <div className="grid grid-cols-3 gap-2">
            {board.map((val, id) => (
              <button
                onClick={() => handleClick(id)}
                key={id}
                className="border border-white text-white text-2xl font-bold p-4"
              >
                {val}
              </button>
            ))}
          </div>
        </div>
        <div className="font-bold text-center my-3">
          {winner
            ? `Winner: ${winner}`
            : checkDraw(board)
            ? "It's a Draw!"
            : `Next: ${playerTurn}`}
        </div>
      </div>
    </div>
  );
};

export default Index;
