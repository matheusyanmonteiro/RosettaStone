"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Se não estiver montado, renderizamos o botão sem o texto dinâmico
  // para evitar o erro de Hydration que você recebeu
  if (!mounted) {
    return (
      <button className="font-mono text-[10px] tracking-widest border border-primary/30 px-3 py-1 opacity-0">
        [ SYS: LOADING ]
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="font-mono text-[10px] tracking-widest border border-primary/30 px-3 py-1 hover:bg-primary/10 transition-all uppercase"
    >
      <span className="text-primary">
        [ {theme === "matrix" ? "SYS: MATRIX" : "SYS: NEUROMANCER"} ]
      </span>
    </button>
  );
}