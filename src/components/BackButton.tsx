'use client';

import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest text-primary/70 hover:text-primary transition-all duration-300 mb-4"
    >
      <span className="text-primary group-hover:glow-cyan">{">"} {label}</span>
    </Link>
  );
};

export default BackButton;