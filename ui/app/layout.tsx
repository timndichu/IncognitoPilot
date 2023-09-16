import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Afrineuron Bot",
  description: "Your local AI code interpreter.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google" content="notranslate" />
        <link rel="icon" href="/bot.png" />
      </head>
      <body className={inter.className + " h-screen"}>{children}</body>
    </html>
  );
}
