'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

const Navbar = ({ dict }: { dict: any }) => {
  const [scrolled, setScrolled] = useState(false);
  const { lang } = useParams() as { lang: string };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: dict.nav.about, href: `/${lang}#about` },
    { label: dict.nav.projects, href: `/${lang}#projects` },
    { label: dict.nav.blog, href: `/${lang}/blog` },
    { label: dict.nav.contact, href: `/${lang}#contact` },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 font-mono ${
          scrolled ? "bg-background/90 backdrop-blur-md border-b border-primary/20 py-2" : "py-4"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href={`/${lang}`} className="text-base md:text-lg tracking-wider text-primary glow-cyan">
            {"<DEV/>"}
          </Link>

          {/* Links Desktop: Desaparecem no Mobile */}
          <div className="hidden md:flex gap-8 text-sm">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-primary transition-colors tracking-wider">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Controles: Ajustados para Mobile */}
          <div className="flex items-center gap-1 md:gap-4 scale-90 md:scale-100 origin-right">
             <div className="hidden sm:block text-primary text-[10px] tracking-widest opacity-60 border border-primary/30 px-2 py-0.5">
              v1.0.0
            </div>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Menu Flutuante: Aparece apenas no Mobile */}
      <MobileMenu dict={dict} lang={lang} />
    </>
  );
};

export default Navbar;