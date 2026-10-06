"use client";

import { useCallback, useState } from "react";

export type Player = "X" | "O";
export type CellValue = Player | null;
export type Board = [
  CellValue,
  CellValue,
  CellValue,
  CellValue,
  CellValue,
  CellValue,
  CellValue,
  CellValue,
  CellValue,
];
export type WinningCells = [number, number, number] | null;
export type GameStatus = "playing" | "won" | "draw";

export type Scores = {
  X: number;
  draws: number;
  O: number;
};

const winningCombinations: ReadonlyArray<readonly [number, number, number]> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const createEmptyBoard = (): Board => [null, null, null, null, null, null, null, null, null];

function findWinner(board: Board): { player: Player; cells: [number, number, number] } | null {
  for (const [first, second, third] of winningCombinations) {
    const player = board[first];

    if (player && player === board[second] && player === board[third]) {
      return { player, cells: [first, second, third] };
    }
  }

  return null;
}

export function useTicTacToe() {
  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningCells, setWinningCells] = useState<WinningCells>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [scores, setScores] = useState<Scores>({ X: 0, draws: 0, O: 0 });

  const resetRound = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPlayer("X");
    setWinner(null);
    setWinningCells(null);
    setIsDraw(false);
    setGameStatus("playing");
  }, []);

  const resetGame = useCallback(() => {
    resetRound();
    setScores({ X: 0, draws: 0, O: 0 });
  }, [resetRound]);

  const makeMove = useCallback(
    (cellIndex: number) => {
      if (board[cellIndex] || gameStatus !== "playing") {
        return;
      }

      const nextBoard = [...board] as Board;
      nextBoard[cellIndex] = currentPlayer;
      const result = findWinner(nextBoard);

      setBoard(nextBoard);

      if (result) {
        setWinner(result.player);
        setWinningCells(result.cells);
        setGameStatus("won");
        setScores((previousScores) => ({
          ...previousScores,
          [result.player]: previousScores[result.player] + 1,
        }));
        return;
      }

      if (nextBoard.every((cell) => cell !== null)) {
        setIsDraw(true);
        setGameStatus("draw");
        setScores((previousScores) => ({
          ...previousScores,
          draws: previousScores.draws + 1,
        }));
        return;
      }

      setCurrentPlayer((player) => (player === "X" ? "O" : "X"));
    },
    [board, currentPlayer, gameStatus],
  );

  return {
    board,
    currentPlayer,
    winner,
    winningCells,
    isDraw,
    gameStatus,
    scores,
    makeMove,
    resetRound,
    resetGame,
  };
}
