'use client';

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function Terminal({ dict, lang }: { dict: any, lang: string }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(["SYSTEM_INIT: SUCCESSFUL", "TYPE 'HELP' FOR COMMANDS"]);
  const { toggleTheme } = useTheme();
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = bottomRef.current?.parentElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    let response = "";

    switch (cmd) {
      case "help":
        response = "AVAILABLE: ABOUT, THEME, CLEAR, BLOG";
        break;
      case "about":
        response = dict.about.description;
        break;
      case "blog":
        router.push(`/${lang}/blog`);
        response = "REDIRECTING_TO_BLOG...";
        break;
      case "theme":
        toggleTheme();
        response = "SYSTEM_THEME_TOGGLED";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        response = `COMMAND_NOT_FOUND: ${cmd}`;
    }

    setHistory([...history, `> ${input}`, response]);
    setInput("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-background/90 border border-primary/30 p-4 font-mono text-xs md:text-sm box-glow-cyan">
      <div className="flex justify-between border-b border-primary/20 pb-2 mb-4 opacity-50">
        <span>DEV_TERMINAL_v1.0.4</span>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
      </div>

      <div className="h-48 overflow-y-auto mb-4 scrollbar-hide space-y-1">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith(">") ? "text-primary" : "text-primary/60"}>
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleCommand} className="flex gap-2">
        <span className="text-primary animate-pulse">█</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-primary w-full"
          autoFocus
          placeholder="ENTER_COMMAND..."
        />
      </form>
    </div>
  );
}