"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { CellValue, Player } from "@/hooks/use-tic-tac-toe";

type GameCellProps = {
  index: number;
  value: CellValue;
  isDisabled: boolean;
  isWinning: boolean;
  isGameOver: boolean;
  onSelect: (cellIndex: number) => void;
};

function Mark({ player }: { player: Player }) {
  if (player === "O") {
    return <span aria-hidden="true" className="block w-[42%] shrink-0 aspect-square box-border rounded-full border-[0.34rem] border-pink-400 shadow-[0_0_20px_rgba(255,45,141,0.42)] sm:border-[0.42rem]" />;
  }

  return (
    <span aria-hidden="true" className="relative block size-[45%] shrink-0">
      <span className="absolute top-1/2 left-1/2 h-[0.34rem] w-full -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-gradient-to-r from-white to-pink-300 shadow-[0_0_18px_rgba(255,45,141,0.35)] sm:h-[0.42rem]" />
      <span className="absolute top-1/2 left-1/2 h-[0.34rem] w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-gradient-to-r from-white to-pink-300 shadow-[0_0_18px_rgba(255,45,141,0.35)] sm:h-[0.42rem]" />
    </span>
  );
}

export function GameCell({ index, value, isDisabled, isWinning, isGameOver, onSelect }: GameCellProps) {
  const reduceMotion = useReducedMotion();
  const row = Math.floor(index / 3) + 1;
  const column = (index % 3) + 1;
  const label = value ? `Cell ${index + 1}, row ${row}, column ${column}, ${value}` : `Cell ${index + 1}, row ${row}, column ${column}, empty`;

  return (
    <motion.button
      type="button"
      aria-label={label}
      disabled={isDisabled}
      onClick={() => onSelect(index)}
      className={`group relative flex aspect-square min-h-0 min-w-0 box-border items-center justify-center overflow-hidden rounded-[1rem] border outline-none transition-colors duration-200 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121015] disabled:cursor-not-allowed ${isWinning ? "border-pink-300/70 bg-[linear-gradient(145deg,#3a172d,#211019)] shadow-[inset_0_0_24px_rgba(255,45,141,0.18),0_0_24px_rgba(255,45,141,0.22)]" : "border-white/[0.045] bg-[linear-gradient(145deg,#1a171c,#100f12)]"} ${isGameOver && !isWinning ? "opacity-35" : ""} ${!isDisabled ? "hover:border-pink-400/35 hover:bg-[#21141e] active:border-pink-400/45" : ""}`}
      whileHover={!isDisabled && !reduceMotion ? { scale: 1.025, y: -1 } : undefined}
      whileTap={!isDisabled && !reduceMotion ? { scale: 0.965 } : undefined}
      transition={{ type: "spring", stiffness: 520, damping: 30, mass: 0.45 }}
    >
      {!isDisabled && (
        <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,45,141,0.16),transparent_65%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" />
      )}
      <AnimatePresence initial={false} mode="wait">
        {value ? (
          <motion.span
            key={value}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.65, rotate: value === "X" ? -10 : 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 430, damping: 23, mass: 0.65 }}
          >
            <Mark player={value} />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  );
}
