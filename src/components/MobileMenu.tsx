'use client';

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu({ dict, lang }: { dict: any, lang: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden fixed bottom-8 right-8 z-[110]">
      {/* O Balão Cyberpunk */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-48 bg-background/95 border border-primary/40 backdrop-blur-xl p-4 box-glow-cyan animate-float">
          <div className="flex flex-col gap-4 font-mono text-[10px] tracking-widest">
            <div className="text-primary/40 border-b border-primary/20 pb-1 flex justify-between">
              <span>SYSTEM_LINKS</span>
              <span>X_01</span>
            </div>
            <Link 
              href={`/${lang}/blog`} 
              onClick={() => setIsOpen(false)}
              className="text-primary hover:glow-cyan transition-all"
            >
              &gt; {dict.nav.blog.toUpperCase()}
            </Link>
            <div className="opacity-30 pointer-events-none italic">
              &gt; NO_OTHER_MODULES
            </div>
          </div>
        </div>
      )}

      {/* Botão Gatilho (Trigger) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 flex items-center justify-center border-2 transition-all duration-500 ${
          isOpen ? 'bg-primary border-primary text-background rotate-45' : 'bg-background border-primary/60 text-primary hover:box-glow-cyan'
        }`}
      >
        <span className="font-bold text-xl">{isOpen ? '×' : '+'}</span>
      </button>
    </div>
  );
}