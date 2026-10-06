"use client";

import { Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";

type GameControlsProps = {
  onNewGame: () => void;
};

export function GameControls({ onNewGame }: GameControlsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div whileHover={reduceMotion ? undefined : { scale: 1.025 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} transition={{ type: "spring", stiffness: 500, damping: 28 }}>
      <Button
        type="button"
        size="sm"
        onClick={onNewGame}
        className="h-10 rounded-full border border-pink-300/25 bg-[linear-gradient(135deg,#ff2d8d,#e81775)] px-4 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(255,45,141,0.28)] hover:bg-[linear-gradient(135deg,#ff5bab,#ff2d8d)] focus-visible:border-pink-100 focus-visible:ring-pink-300/80"
        aria-label="Start a new round and keep the current session scores"
      >
        <Plus aria-hidden="true" className="size-4" strokeWidth={2.5} />
        <span className="hidden sm:inline">New Game</span>
        <span className="sm:hidden">New</span>
      </Button>
    </motion.div>
  );
}
