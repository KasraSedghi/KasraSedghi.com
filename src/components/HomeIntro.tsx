"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * The home page opens on a penalty shootout that plays itself: five shots,
 * a diving keeper, a scoreboard tallying goals against saves, and then the
 * whole thing fades out to reveal the hero underneath. It is a one-time
 * cinematic, not a game, so it auto-plays, offers a Skip, runs only once per
 * browser session (sessionStorage), and is skipped entirely for
 * prefers-reduced-motion visitors. The hero always renders underneath in the
 * server HTML, so this never gates content or hurts SEO.
 */

type Corner = "left" | "center" | "right";
type Phase = "ready" | "kick" | "goal" | "save" | "reset";
type ShotState = { index: number; ball: Corner; keeper: Corner; phase: Phase };

const SESSION_KEY = "home-intro-seen";
const CORNER_X: Record<Corner, string> = { left: "28%", center: "50%", right: "72%" };
const CORNERS: Corner[] = ["left", "center", "right"];
const TOTAL = 5;

// Per-shot beats (ms): fly to goal, hold on the result, then reset to the spot.
const KICK = 470;
const HOLD = 470;
const RESET = 210;
const STEP = KICK + HOLD + RESET; // one full shot

export default function HomeIntro() {
  const [show, setShow] = useState(false);
  const [fading, setFading] = useState(false);
  const [shot, setShot] = useState<ShotState | null>(null);
  const [results, setResults] = useState<("goal" | "save")[]>([]);
  const [spin, setSpin] = useState(0);
  const [finished, setFinished] = useState(false);
  const timers = useRef<number[]>([]);

  const goals = results.filter((r) => r === "goal").length;
  const saves = results.length - goals;

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  const dismiss = () => {
    clearTimers();
    setFading(true);
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    setShow(true);

    const at = (fn: () => void, delay: number) => {
      timers.current.push(window.setTimeout(fn, delay));
    };
    const rand = () => CORNERS[Math.floor(Math.random() * CORNERS.length)];

    // Predetermine a satisfying scoreline (3 or 4 goals of 5) so the intro
    // reliably ends on a win rather than an unlucky 0/5.
    const goalCount = 3 + Math.floor(Math.random() * 2);
    const plan = Array.from({ length: TOTAL }, (_, i) => i < goalCount);
    for (let i = plan.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [plan[i], plan[j]] = [plan[j], plan[i]];
    }

    let t = 380; // let the overlay fade in first
    plan.forEach((isGoal, i) => {
      const ball = rand();
      let keeper = rand();
      if (isGoal) {
        while (keeper === ball) keeper = rand();
      } else {
        keeper = ball;
      }

      at(() => {
        setShot({ index: i, ball, keeper, phase: "kick" });
        setSpin((s) => s + 720);
      }, t);
      at(() => {
        setShot((s) => (s ? { ...s, phase: isGoal ? "goal" : "save" } : s));
        setResults((r) => [...r, isGoal ? "goal" : "save"]);
      }, t + KICK);
      at(() => {
        setShot((s) => (s ? { ...s, phase: "reset" } : s));
      }, t + KICK + HOLD);
      t += STEP;
    });

    at(() => setFinished(true), t);
    at(() => setFading(true), t + 950);

    return clearTimers;
  }, []);

  if (!show) return null;

  const phase = shot?.phase ?? "ready";
  const ballCorner = shot?.ball ?? "center";
  const keeperCorner = shot?.keeper ?? "center";
  const keeperDiving = phase === "kick" || phase === "goal" || phase === "save";

  const ballTarget =
    phase === "kick" || phase === "goal"
      ? { left: CORNER_X[ballCorner], top: "30%", scale: 0.72 }
      : phase === "save"
        ? { left: CORNER_X[keeperCorner], top: "44%", scale: 0.78 }
        : { left: "50%", top: "82%", scale: 1 };

  const shotNumber = shot ? Math.min(shot.index + 1, TOTAL) : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: fading ? 0.7 : 0.3, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (fading) setShow(false);
      }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-ink px-6"
    >
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-5 top-24 rounded-full border border-white/20 px-4 py-1.5 text-xs uppercase tracking-widest text-white/60 transition-colors hover:border-gold hover:text-gold"
      >
        Skip
      </button>

      {/* Scoreboard */}
      <div className="mb-6 flex items-center gap-5 rounded-xl border border-gold/25 bg-ink-raised px-6 py-3">
        <Team name="KASRA" score={goals} highlight />
        <span className="text-white/30">vs</span>
        <Team name="KEEPER" score={saves} />
      </div>

      {/* Pitch scene */}
      <div className="relative aspect-[3/2] w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-ink-raised to-ink shadow-gold">
        <GoalNet />

        {/* Net ripple on a goal */}
        <AnimatePresence>
          {phase === "goal" && (
            <motion.span
              key={`ripple-${shot?.index}`}
              className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold"
              style={{ left: CORNER_X[ballCorner], top: "30%" }}
              initial={{ scale: 0.3, opacity: 0.8 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        {/* Goalkeeper */}
        <motion.div
          className="absolute top-[30%] h-14 w-14 -translate-x-1/2"
          animate={{
            left: keeperDiving ? CORNER_X[keeperCorner] : "50%",
            rotate: keeperDiving ? (keeperCorner === "left" ? -32 : keeperCorner === "right" ? 32 : 0) : 0,
            y: keeperDiving && keeperCorner !== "center" ? 10 : 0,
          }}
          transition={{ duration: 0.32, ease: "easeOut" }}
        >
          <Keeper reaching={keeperDiving} />
        </motion.div>

        {/* Ball */}
        <motion.div
          className="absolute h-7 w-7 -translate-x-1/2 -translate-y-1/2"
          initial={{ left: "50%", top: "82%" }}
          animate={{ ...ballTarget, rotate: spin }}
          transition={{
            left: { duration: 0.42, ease: "easeOut" },
            top: { duration: 0.42, ease: phase === "kick" ? "easeOut" : "easeIn" },
            scale: { duration: 0.42 },
            rotate: { duration: 0.42, ease: "linear" },
          }}
        >
          <Ball />
        </motion.div>

        {/* Goal / save particles + badge */}
        <AnimatePresence>
          {(phase === "goal" || phase === "save") && (
            <ResultBadge key={`badge-${shot?.index}`} kind={phase === "goal" ? "goal" : "save"} />
          )}
        </AnimatePresence>

        {/* Penalty spot */}
        <span className="absolute left-1/2 top-[82%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/40" />
      </div>

      {/* Shot pips + status line */}
      <div className="mt-5 flex items-center gap-2">
        {Array.from({ length: TOTAL }).map((_, i) => {
          const r = results[i];
          return (
            <span
              key={i}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                r === "goal" ? "bg-gold" : r === "save" ? "bg-white/35" : "border border-white/25"
              }`}
            />
          );
        })}
      </div>

      <p className="mt-4 min-h-6 text-center text-sm text-white/60">
        {finished
          ? `Final: ${goals} to ${saves}. ${goals > saves ? "Shootout won." : goals === saves ? "Even shootout." : "Well fought."}`
          : shot
            ? `Shot ${shotNumber} of ${TOTAL}`
            : "Warming up..."}
      </p>
    </motion.div>
  );
}

function Team({ name, score, highlight }: { name: string; score: number; highlight?: boolean }) {
  return (
    <div className="text-center">
      <p className={`text-[10px] uppercase tracking-widest ${highlight ? "text-gold" : "text-white/50"}`}>
        {name}
      </p>
      <p className="text-2xl font-bold text-white tabular-nums">{score}</p>
    </div>
  );
}

function GoalNet() {
  return (
    <svg
      viewBox="0 0 300 200"
      className="pointer-events-none absolute inset-x-0 top-2 mx-auto h-[60%] w-[86%] text-white/25"
      fill="none"
      stroke="currentColor"
      preserveAspectRatio="none"
    >
      <path d="M18 118 V16 H282 V118" strokeWidth="4" strokeLinejoin="round" />
      <g strokeWidth="0.6" opacity="0.45">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v${i}`} x1={18 + i * 24} y1="16" x2={18 + i * 24} y2="118" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="18" y1={16 + i * 25.5} x2="282" y2={16 + i * 25.5} />
        ))}
      </g>
    </svg>
  );
}

function Keeper({ reaching }: { reaching: boolean }) {
  return (
    <svg viewBox="0 0 56 56" className="h-14 w-14 drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]">
      {/* arms: out when reaching, down when set */}
      {reaching ? (
        <path d="M28 30 L8 20 M28 30 L48 20" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M28 30 L14 40 M28 30 L42 40" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none" />
      )}
      <circle cx="28" cy="14" r="6" fill="#f5f5f5" stroke="#111" strokeWidth="1.4" />
      <rect x="19" y="20" width="18" height="20" rx="6" fill="#FFD700" stroke="#111" strokeWidth="1.4" />
      <path d="M22 40 L20 52 M34 40 L36 52" stroke="#111" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Ball() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7 drop-shadow-[0_4px_10px_rgba(255,215,0,0.4)]">
      <circle cx="14" cy="14" r="12.5" fill="#f5f5f5" stroke="#111" strokeWidth="1.2" />
      <path d="M14 6l4.5 3.3-1.7 5.3h-5.6L9.5 9.3z" fill="#111" />
      <path
        d="M14 1.5l1.6 3M25 10l-3 1.8M20 25l-1.2-3.2M8 25l1.2-3.2M3 10l3 1.8"
        stroke="#111"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ResultBadge({ kind }: { kind: "goal" | "save" }) {
  const isGoal = kind === "goal";
  const particles = isGoal ? 10 : 0;
  return (
    <>
      <motion.div
        className={`pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-widest ${
          isGoal ? "border-gold/50 bg-gold/15 text-gold" : "border-white/30 bg-white/10 text-white/80"
        }`}
        initial={{ opacity: 0, y: 8, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {isGoal ? "Goal!" : "Saved"}
      </motion.div>
      {Array.from({ length: particles }).map((_, i) => {
        const angle = (i / particles) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="pointer-events-none absolute left-1/2 top-[30%] h-1.5 w-1.5 rounded-full bg-gold"
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: Math.cos(angle) * 60, y: Math.sin(angle) * 60, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        );
      })}
    </>
  );
}
