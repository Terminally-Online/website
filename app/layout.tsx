import type { Metadata } from "next";
import "./globals.css";
import { Jacquarda_Bastarda_9, Inter } from "next/font/google";

const jacquarda = Jacquarda_Bastarda_9({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-jacquarda",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Terminally Online",
  description:
    "Modern tech is a double-edged sword designed to consume as much of your time. It doesn't have to be.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jacquarda.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
