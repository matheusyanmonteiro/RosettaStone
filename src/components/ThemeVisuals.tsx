'use client';

import { useTheme } from "@/context/ThemeContext";
import MatrixRain from "./MatrixRain";
import NeuromancerBackground from "./NeuromancerBackground";

export default function ThemeVisuals() {
  const { theme } = useTheme();

  return (
    <>
      <div className="scanlines" />
      <div className="crt-flicker" />
      
      {theme === "matrix" ? (
        <MatrixRain key="matrix-bg" />
      ) : (
        <NeuromancerBackground key="neuro-bg" />
      )}
    </>
  );
}