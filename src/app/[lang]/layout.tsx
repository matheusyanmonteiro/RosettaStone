import { Orbitron, Share_Tech_Mono, Rajdhani } from "next/font/google";
import "../globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-orbitron",
});

const shareTech = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-share-tech",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} className={`${orbitron.variable} ${shareTech.variable} ${rajdhani.variable}`}>
      <body className="antialiased">
        <div className="scanlines" />
        <div className="crt-flicker" />
        {children}
      </body>
    </html>
  );
}