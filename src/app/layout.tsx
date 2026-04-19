import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mitologia Grega | Os Deuses do Olimpo",
  description:
    "Uma jornada imersiva pelos reinos da mitologia grega. Do Monte Olimpo ao Submundo de Hades, descubra os deuses, heróis e mitos que moldaram a civilização ocidental.",
  keywords: [
    "mitologia grega",
    "deuses gregos",
    "Monte Olimpo",
    "Zeus",
    "Poseidon",
    "Hades",
    "Atena",
  ],
  openGraph: {
    title: "Mitologia Grega | Os Deuses do Olimpo",
    description:
      "Uma jornada imersiva pelos reinos da mitologia grega.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzel.variable} ${cormorant.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
