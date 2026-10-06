"use client";

import { Grid2X2 } from "lucide-react";

import { useTicTacToe } from "@/hooks/use-tic-tac-toe";

import { GameBoard } from "./game-board";
import { GameControls } from "./game-controls";
import { GameStatus } from "./game-status";
import { Scoreboard } from "./scoreboard";

export function Game() {
  const game = useTicTacToe();

  return (
    <section className="game-entrance relative z-10 mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col" aria-labelledby="game-title">
      <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-white/[0.08] sm:h-16">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] text-pink-400 shadow-[0_0_24px_rgba(255,45,141,0.12)]">
            <Grid2X2 aria-hidden="true" className="size-[17px]" strokeWidth={2.25} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-[0.15em] text-white uppercase sm:text-base">Tic-Tac-Toe</p>
            <p className="mt-0.5 hidden text-xs text-zinc-500 sm:block">Classic strategy, reimagined.</p>
          </div>
        </div>
        <GameControls onNewGame={game.resetRound} />
      </header>

      <div className="mx-auto flex min-h-0 w-full max-w-[28rem] flex-1 flex-col justify-center py-3 sm:py-4">
        <div className="game-hero mb-3 text-center sm:mb-4">
          <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-pink-400 uppercase">Play · Compete · Win</p>
          <h1 id="game-title" className="mt-1.5 text-[1.6rem] leading-[1.05] font-semibold tracking-[-0.055em] text-white sm:mt-2 sm:text-[2.25rem]">
            Classic game. Reimagined.
          </h1>
          <p className="game-subtitle mx-auto mt-2 max-w-xs text-sm leading-5 text-zinc-400">A beautifully crafted Tic-Tac-Toe experience.</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <GameStatus currentPlayer={game.currentPlayer} gameStatus={game.gameStatus} winner={game.winner} />
          <GameBoard
            board={game.board}
            gameStatus={game.gameStatus}
            winningCells={game.winningCells}
            onSelectCell={game.makeMove}
          />
          <Scoreboard currentPlayer={game.currentPlayer} gameStatus={game.gameStatus} scores={game.scores} />
        </div>
      </div>
    </section>
  );
}
