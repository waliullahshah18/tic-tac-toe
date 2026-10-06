import type { Board, GameStatus as GameStatusType, WinningCells } from "@/hooks/use-tic-tac-toe";

import { GameCell } from "./game-cell";

type GameBoardProps = {
  board: Board;
  gameStatus: GameStatusType;
  winningCells: WinningCells;
  onSelectCell: (cellIndex: number) => void;
};

export function GameBoard({ board, gameStatus, winningCells, onSelectCell }: GameBoardProps) {
  const gameIsOver = gameStatus !== "playing";

  return (
    <section aria-labelledby="board-heading" className="game-board-size relative mx-auto">
      <h2 id="board-heading" className="sr-only">Tic-Tac-Toe board</h2>
      <div aria-hidden="true" className="absolute -inset-3 rounded-[2rem] bg-pink-500/15 blur-2xl" />
      <div className="relative aspect-square rounded-[1.65rem] border border-white/[0.1] bg-[#121015] p-2.5 shadow-[0_24px_80px_-28px_rgba(255,45,141,0.42),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-3">
        <div className="grid size-full grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[repeat(3,minmax(0,1fr))] gap-2 sm:gap-3" role="group" aria-label="Tic-Tac-Toe game board">
          {board.map((value, index) => (
            <GameCell
              key={index}
              index={index}
              value={value}
              isDisabled={gameIsOver || value !== null}
              isWinning={winningCells?.includes(index) ?? false}
              isGameOver={gameIsOver}
              onSelect={onSelectCell}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
