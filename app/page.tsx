import { Game } from "@/components/tic-tac-toe/game";

export default function Home() {
  return (
    <main className="relative isolate h-[100svh] overflow-hidden bg-[#060607] px-4 py-3 sm:px-6 sm:py-4 lg:px-10">
      <div aria-hidden="true" className="page-grid absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="page-glow page-glow-top" />
      <div aria-hidden="true" className="page-glow page-glow-bottom" />
      <Game />
    </main>
  );
}
