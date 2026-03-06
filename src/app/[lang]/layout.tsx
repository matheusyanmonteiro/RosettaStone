import { Orbitron, Share_Tech_Mono, Rajdhani } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeVisuals from "@/components/ThemeVisuals";

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
    <html lang={lang} suppressHydrationWarning> 
      <body className="antialiased overflow-x-hidden font-body bg-background text-foreground">
        <ThemeProvider>
          <ThemeVisuals />
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}