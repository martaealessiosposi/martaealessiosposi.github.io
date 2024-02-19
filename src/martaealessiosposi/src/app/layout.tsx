import type { Metadata } from "next";
import { Cinzel } from 'next/font/google'
import Header from "./components/header/header";
import "./globals.css";

const cinzel = Cinzel({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marta e Alessio sposi :<3:",
  description: "28/9/2024 - Marta e Alessio sposi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cinzel.className}>
          <Header />
         {children}
      </body>
    </html>
  );
}
