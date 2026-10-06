"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { GameStatus as GameStatusType, Player } from "@/hooks/use-tic-tac-toe";

type GameStatusProps = {
  currentPlayer: Player;
  gameStatus: GameStatusType;
  winner: Player | null;
};

export function GameStatus({ currentPlayer, gameStatus, winner }: GameStatusProps) {
  const reduceMotion = useReducedMotion();
  const message = gameStatus === "won" ? `${winner} wins` : gameStatus === "draw" ? "Draw game" : `${currentPlayer}'s turn`;

  return (
    <div className="flex items-center justify-center gap-2.5" role="status" aria-live="polite">
      <span aria-hidden="true" className="relative flex size-2.5">
        {gameStatus === "playing" && <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink-400 opacity-50" />}
        <span className={`relative inline-flex size-2.5 rounded-full shadow-[0_0_14px_rgba(255,45,141,0.85)] ${gameStatus === "draw" ? "bg-zinc-400" : "bg-pink-400"}`} />
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={message}
          className="text-xs font-semibold tracking-[0.18em] text-zinc-300 uppercase"
          initial={reduceMotion ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
          transition={{ duration: 0.18 }}
        >
          {message}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
