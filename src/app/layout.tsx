import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Webdesigner68 | Créateur d'expériences web uniques",
  description: "Portfolio de Webdesigner68, spécialiste en création de sites web modernes, percutants et innovants.",
  keywords: ["webdesign", "portfolio", "sites web", "design", "UX/UI", "création web"],
  authors: [{ name: "Webdesigner68" }],
  creator: "Webdesigner68",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-[#0f1c3a] text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
