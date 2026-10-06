"use client";

import { motion, useReducedMotion } from "motion/react";

import type { GameStatus, Player, Scores } from "@/hooks/use-tic-tac-toe";

type ScoreboardProps = {
  currentPlayer: Player;
  gameStatus: GameStatus;
  scores: Scores;
};

const scoreDetails = [
  { label: "X", key: "X", description: "X wins", mark: "x" },
  { label: "Draws", key: "draws", description: "Drawn games", mark: "•" },
  { label: "O", key: "O", description: "O wins", mark: "o" },
] as const;

export function Scoreboard({ currentPlayer, gameStatus, scores }: ScoreboardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="scoreboard-heading">
      <h2 id="scoreboard-heading" className="sr-only">Scoreboard</h2>
      <dl className="grid grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]">
        {scoreDetails.map((score, index) => {
          const isActive = gameStatus === "playing" && score.key === currentPlayer;
          const isDraw = score.key === "draws";

          return (
            <div key={score.label} className={`min-w-0 px-2 py-3.5 text-center transition-colors duration-200 sm:py-4 ${index > 0 ? "border-l border-white/[0.08]" : ""} ${isActive ? "bg-pink-400/[0.06]" : ""}`}>
              <dt className={`flex items-center justify-center gap-1.5 text-[0.65rem] font-semibold tracking-[0.14em] uppercase ${isActive ? "text-pink-300" : "text-zinc-500"}`}>
                <span aria-hidden="true" className={`flex size-3.5 items-center justify-center font-semibold ${isActive ? "text-pink-300" : "text-zinc-500"} ${score.mark === "o" ? "rounded-full border border-current text-[0px]" : "text-sm leading-none"}`}>
                  {score.mark === "o" ? "" : score.mark}
                </span>
                {score.label}
              </dt>
              <dd className="mt-1.5 text-xl font-semibold tracking-[-0.04em] text-white">
                <motion.span
                  key={scores[score.key]}
                  className="inline-block"
                  initial={reduceMotion ? false : { opacity: 0.5, scale: 0.78 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 450, damping: 23 }}
                >
                  {scores[score.key]}
                </motion.span>
              </dd>
              <span className="sr-only">{isDraw ? "Draw games" : score.description}</span>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
