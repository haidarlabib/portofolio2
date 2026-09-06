"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export default function HeroProfileCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  // Mouse position values for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for natural dampening
  const springConfig = { stiffness: 140, damping: 18, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map mouse coordinates (-1 to 1) to gentle rotation (-5deg to +5deg)
  const rotateX = useTransform(smoothY, [-1, 1], [6, -6]);
  const rotateY = useTransform(smoothX, [-1, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isTouchDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height; // 0 to 1
    mouseX.set((x - 0.5) * 2); // -1 to 1
    mouseY.set((y - 0.5) * 2); // -1 to 1
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center p-3 sm:p-6 lg:p-8 select-none pointer-events-auto"
      style={{ perspective: 1000 }}
    >
      {/* 1. Ambient Background Glow & Celestial Details */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
        {/* Soft radial blue/cyan aurora */}
        <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-sky-500/10 blur-[90px]" />
        {/* Warm amber/gold center-glow */}
        <div className="absolute w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-amber-500/15 blur-[75px]" />
      </div>

      {/* 2. Orbit Ring & Glowing Orb */}
      <div
        className="absolute inset-[-12%] pointer-events-none flex items-center justify-center -z-10"
        aria-hidden
      >
        {/* Elliptical tilted orbit ring */}
        <div className="w-[118%] h-[118%] rounded-[50%] border border-sky-400/20 rotate-[-18deg] opacity-70 shadow-[0_0_15px_rgba(56,189,248,0.1)] [mask-image:linear-gradient(to_bottom,black_45%,transparent_95%)]" />

        {/* Second faint outer orbit ring */}
        <div className="absolute w-[138%] h-[138%] rounded-[50%] border border-amber-400/10 rotate-[-12deg] opacity-50 [mask-image:linear-gradient(to_bottom,black_30%,transparent_85%)]" />

        {/* Glowing Golden Planet / Orb in upper right orbit */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.08, 1],
                  opacity: [0.85, 1, 0.85],
                }
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] right-[8%] sm:top-[6%] sm:right-[6%] w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-yellow-100 shadow-[0_0_20px_#f59e0b] blur-[0.4px]"
        />

        {/* Subtle twinkling stars */}
        <span className="absolute top-[18%] left-[12%] w-1 h-1 rounded-full bg-ice-100 shadow-[0_0_6px_#fff] animate-pulse" />
        <span
          className="absolute bottom-[22%] right-[14%] w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_#38bdf8] animate-pulse"
          style={{ animationDelay: "1.2s" }}
        />
        <span
          className="absolute top-[35%] right-[2%] w-1 h-1 rounded-full bg-amber-200 shadow-[0_0_6px_#fbbf24] animate-pulse"
          style={{ animationDelay: "2.1s" }}
        />
      </div>

      {/* 3. Floating Profile Card (Main Target) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [-8, 8, -8],
                rotate: [-1.2, 1.2, -1.2],
              }
        }
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          rotateX: shouldReduceMotion || isTouchDevice ? 0 : rotateX,
          rotateY: shouldReduceMotion || isTouchDevice ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative group rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-ink-1/90 via-ink-2/65 to-ink-0/95 border border-ink-3/80 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl w-60 sm:w-72 md:w-80 lg:w-[21.5rem] xl:w-[23rem] transition-shadow duration-500 hover:shadow-[0_35px_80px_-15px_rgba(245,158,11,0.18)]"
      >
        {/* Subtle top rim highlight gradient */}
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent rounded-t-full"
          aria-hidden
        />

        {/* Card Header inside: "BERANDA ●" */}
        <div className="pb-2.5 px-2 flex items-center justify-end">
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-ice-300">
            <span>BERANDA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-ice-100 shadow-[0_0_6px_#fff]" />
          </span>
        </div>

        {/* Photo Container Frame with dark gradient integration */}
        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-b from-ink-0/80 via-ink-1/50 to-ink-0/95 flex items-center justify-center border border-ink-3/40">
          {/* Subtle golden ambient spotlight behind head */}
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.2),transparent_70%)] pointer-events-none"
            aria-hidden
          />

          <img
            src="/profil-hero.png"
            alt="Haidar Labib Izzakif"
            className="w-full h-full object-cover object-top filter drop-shadow-[0_14px_28px_rgba(0,0,0,0.7)]"
          />

          {/* Smooth dark gradient fading bottom edge into background */}
          <div
            className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-ink-0 via-ink-0/65 to-transparent pointer-events-none"
            aria-hidden
          />
        </div>

        {/* Card Footer inside: "DATA ANALYST" & "● Bekasi, ID" */}
        <div className="pt-3 pb-1 px-2 flex items-center justify-between text-ice-300">
          <span className="font-mono tracking-wider text-[10px] sm:text-[11px] uppercase text-ice-300 font-medium">
            DATA ANALYST
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] text-amber-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
            Bekasi, ID
          </span>
        </div>
      </motion.div>

      {/* 4. Floating Decorative Cards */}

      {/* Floating Badge 1: [ Data ] (Top-Left) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [-7, 7, -7],
                rotate: [-2, 2, -2],
              }
        }
        transition={{
          duration: 4.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
        className="absolute -top-2 -left-2 sm:top-2 sm:-left-5 lg:top-4 lg:-left-7 z-20 pointer-events-auto"
      >
        <div className="group rounded-2xl p-2 sm:p-2.5 flex flex-col items-center justify-center gap-1 bg-ink-1/90 border border-ice-100/15 backdrop-blur-xl shadow-xl hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all duration-300 min-w-[58px] sm:min-w-[66px]">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400">
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <span className="text-[10px] sm:text-[11px] font-medium text-ice-200 tracking-wide">
            Data
          </span>
        </div>
      </motion.div>

      {/* Floating Badge 2: [ Code ] (Top-Right) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [7, -7, 7],
                rotate: [2, -2, 2],
              }
        }
        transition={{
          duration: 5.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute -top-3 -right-2 sm:top-1 sm:-right-5 lg:top-3 lg:-right-7 z-20 pointer-events-auto"
      >
        <div className="group rounded-2xl p-2 sm:p-2.5 flex flex-col items-center justify-center gap-1 bg-ink-1/90 border border-ice-100/15 backdrop-blur-xl shadow-xl hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-300 min-w-[58px] sm:min-w-[66px]">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center text-purple-400">
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <span className="text-[10px] sm:text-[11px] font-medium text-ice-200 tracking-wide">
            Code
          </span>
        </div>
      </motion.div>

      {/* Floating Badge 3: [ Insight ] (Bottom-Right) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [-8, 8, -8],
                rotate: [-1.5, 1.5, -1.5],
              }
        }
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.4,
        }}
        className="absolute bottom-10 -right-2 sm:bottom-14 sm:-right-5 lg:bottom-16 lg:-right-7 z-20 pointer-events-auto"
      >
        <div className="group rounded-2xl p-2 sm:p-2.5 flex flex-col items-center justify-center gap-1 bg-ink-1/90 border border-ice-100/15 backdrop-blur-xl shadow-xl hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300 min-w-[58px] sm:min-w-[66px]">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-[10px] sm:text-[11px] font-medium text-ice-200 tracking-wide">
            Insight
          </span>
        </div>
      </motion.div>

      {/* Floating Badge 4: [ Solution ] (Bottom-Left) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [8, -8, 8],
                rotate: [2, -2, 2],
              }
        }
        transition={{
          duration: 5.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute bottom-3 -left-2 sm:bottom-6 sm:-left-4 lg:bottom-8 lg:-left-6 z-20 pointer-events-auto"
      >
        <div className="group rounded-2xl p-2 sm:p-2.5 flex flex-col items-center justify-center gap-1 bg-ink-1/90 border border-ice-100/15 backdrop-blur-xl shadow-xl hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all duration-300 min-w-[58px] sm:min-w-[66px]">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </div>
          <span className="text-[10px] sm:text-[11px] font-medium text-ice-200 tracking-wide">
            Solution
          </span>
        </div>
      </motion.div>
    </div>
  );
}
