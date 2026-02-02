import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "A Surprise For You 💖",
  description: "Made with love",
};

import { MusicPlayer } from "@/components/MusicPlayer";
//...
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-warm-white text-love-text overflow-hidden`}
      >
        <MusicPlayer />
        {children}
      </body>
    </html>
  );
}
