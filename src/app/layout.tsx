import type { Metadata } from "next";
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import ContentProtection from "@/components/ContentProtection";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "DB Photography - Professional Photography Portfolio",
  description: "DB Photography - Professional wedding, portrait, and event photography. Book your session today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${greatVibes.variable}`}>
      <body className="font-body antialiased content-protected">
        <ContentProtection />
        {children}
      </body>
    </html>
  );
}
