import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Tic-Tac-Toe — Classic Strategy, Reimagined",
  description:
    "A beautifully simple, focused Tic-Tac-Toe experience for two players.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
