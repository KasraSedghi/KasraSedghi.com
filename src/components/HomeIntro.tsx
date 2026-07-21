"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * The home page opens on a penalty shootout the visitor plays: click a
 * corner of the goal to shoot, a keeper dives, and a scoreboard tallies
 * goals against saves over five shots. Win and you get a celebration
 * screen; either way an "Enter site" button (and an always-present Skip)
 * fades the whole thing out to reveal the hero underneath.
 *
 * It runs only once per browser session (sessionStorage) and is skipped
 * entirely for prefers-reduced-motion visitors. The hero always renders in
 * the server HTML underneath, so this never gates content or hurts SEO; it
 * is a client-only overlay.
 */

type Corner = "left" | "center" | "right";
type Phase = "aim" | "kick" | "goal" | "save";
type ShotState = { index: number; ball: Corner; keeper: Corner; phase: Phase };

const SESSION_KEY = "home-intro-seen";
const CORNER_X: Record<Corner, string> = { left: "28%", center: "50%", right: "72%" };
const CORNERS: Corner[] = ["left", "center", "right"];
const TOTAL = 5;
const KICK = 470; // ball flight
const HOLD = 620; // linger on the result before the next shot

export default function HomeIntro() {
  const [show, setShow] = useState(false);
  const [fading, setFading] = useState(false);
  const [shot, setShot] = useState<ShotState>({ index: 0, ball: "center", keeper: "center", phase: "aim" });
  const [results, setResults] = useState<("goal" | "save")[]>([]);
  const [spin, setSpin] = useState(0);
  const [ended, setEnded] = useState(false);
  const timers = useRef<number[]>([]);

  const goals = results.filter((r) => r === "goal").length;
  const saves = results.length - goals;
  const won = goals > saves;

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };
  const at = (fn: () => void, delay: number) => {
    timers.current.push(window.setTimeout(fn, delay));
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    setShow(true);
    return clearTimers;
  }, []);

  // Fallback: if the visitor lingers on the win/result screen, drift into
  // the site on their behalf so nothing gets stuck.
  useEffect(() => {
    if (!ended) return;
    const t = window.setTimeout(() => setFading(true), 8000);
    return () => clearTimeout(t);
  }, [ended]);

  function takeShot(corner: Corner) {
    if (shot.phase !== "aim" || ended || fading) return;
    const index = shot.index;

    // Keeper saves ~32% of the time; on a goal it visibly dives to a
    // different corner, on a save it guesses the same one.
    const saved = Math.random() < 0.32;
    let keeper: Corner = corner;
    if (!saved) {
      const others = CORNERS.filter((c) => c !== corner);
      keeper = others[Math.floor(Math.random() * others.length)];
    }
    const isGoal = !saved;

    setShot({ index, ball: corner, keeper, phase: "kick" });
    setSpin((s) => s + 720);

    at(() => {
      setShot((s) => ({ ...s, phase: isGoal ? "goal" : "save" }));
      setResults((r) => [...r, isGoal ? "goal" : "save"]);
    }, KICK);

    at(() => {
      if (index >= TOTAL - 1) {
        setEnded(true);
      } else {
        setShot({ index: index + 1, ball: "center", keeper: "center", phase: "aim" });
      }
    }, KICK + HOLD);
  }

  const dismiss = () => {
    clearTimers();
    setFading(true);
  };

  if (!show) return null;

  const phase = shot.phase;
  const keeperDiving = phase === "kick" || phase === "goal" || phase === "save";
  const ballTarget =
    phase === "kick" || phase === "goal"
      ? { left: CORNER_X[shot.ball], top: "30%", scale: 0.72 }
      : phase === "save"
        ? { left: CORNER_X[shot.keeper], top: "44%", scale: 0.78 }
        : { left: "50%", top: "82%", scale: 1 };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: fading ? 0.7 : 0.3, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (fading) setShow(false);
      }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center overflow-hidden bg-ink px-6"
    >
      {!ended && (
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-5 top-24 z-20 rounded-full border border-white/20 px-4 py-1.5 text-xs uppercase tracking-widest text-white/60 transition-colors hover:border-gold hover:text-gold"
        >
          Skip
        </button>
      )}

      {ended ? (
        <EndScreen goals={goals} saves={saves} won={won} onEnter={dismiss} />
      ) : (
        <div className="relative z-10 flex flex-col items-center">
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
                  key={`ripple-${shot.index}`}
                  className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold"
                  style={{ left: CORNER_X[shot.ball], top: "30%" }}
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
                left: keeperDiving ? CORNER_X[shot.keeper] : "50%",
                rotate: keeperDiving ? (shot.keeper === "left" ? -32 : shot.keeper === "right" ? 32 : 0) : 0,
                y: keeperDiving && shot.keeper !== "center" ? 10 : 0,
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

            {/* Clickable aim zones (only while waiting for the shot) */}
            {phase === "aim" && (
              <div className="absolute inset-x-[7%] top-2 grid h-[56%] grid-cols-3 gap-1">
                {CORNERS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => takeShot(c)}
                    aria-label={`Shoot ${c}`}
                    className="group flex items-center justify-center rounded-lg transition-colors hover:bg-gold/10"
                  >
                    <motion.span
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 text-gold/70 transition-colors group-hover:border-gold group-hover:text-gold"
                      animate={{ scale: [1, 1.16, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Reticle />
                    </motion.span>
                  </button>
                ))}
              </div>
            )}

            {/* Result badge + goal particles */}
            <AnimatePresence>
              {(phase === "goal" || phase === "save") && (
                <ResultBadge key={`badge-${shot.index}`} kind={phase === "goal" ? "goal" : "save"} />
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
            {phase === "aim"
              ? `Shot ${shot.index + 1} of ${TOTAL}. Click a corner to shoot.`
              : `Shot ${Math.min(shot.index + 1, TOTAL)} of ${TOTAL}`}
          </p>
        </div>
      )}
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

function EndScreen({
  goals,
  saves,
  won,
  onEnter,
}: {
  goals: number;
  saves: number;
  won: boolean;
  onEnter: () => void;
}) {
  const headline = won ? "Shootout won!" : goals === saves ? "Even shootout" : "Good game";
  return (
    <>
      {won && <Confetti />}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {won ? <Trophy /> : <BallBadge />}
        <h2 className="mt-5 text-3xl font-extrabold text-gold sm:text-4xl">{headline}</h2>
        <p className="mt-2 text-white/70">
          You scored {goals} of {TOTAL}
          {won ? " and beat the keeper." : goals === saves ? " and drew with the keeper." : "."}
        </p>
        <div className="mt-4 flex items-center gap-2">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <span
              key={i}
              className={`h-2.5 w-2.5 rounded-full ${i < goals ? "bg-gold" : "bg-white/30"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={onEnter}
          className="mt-8 rounded-full bg-gold px-8 py-3 font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:shadow-gold-lg"
        >
          Enter site
        </button>
      </motion.div>
    </>
  );
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 70 }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2.2 + Math.random() * 1.6,
        drift: (Math.random() - 0.5) * 90,
        spin: 180 + Math.random() * 360,
        gold: Math.random() > 0.4,
        size: 5 + Math.random() * 5,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute top-0 rounded-[1px]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.5,
            backgroundColor: p.gold ? "#FFD700" : "#f5f5f5",
          }}
          initial={{ y: "-10vh", x: 0, opacity: 0, rotate: 0 }}
          animate={{ y: "105vh", x: p.drift, opacity: [0, 1, 1, 0], rotate: p.spin }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
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

function Reticle() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="7" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
    </svg>
  );
}

function Trophy() {
  return (
    <svg viewBox="0 0 48 48" className="h-16 w-16 text-gold drop-shadow-[0_6px_16px_rgba(255,215,0,0.45)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 6h20v8a10 10 0 0 1-20 0z" />
      <path d="M14 9H9a4 4 0 0 0 4 6M34 9h5a4 4 0 0 1-4 6" />
      <path d="M24 24v7M18 39h12M20 39c0-4 8-4 8 0" />
    </svg>
  );
}

function BallBadge() {
  return (
    <svg viewBox="0 0 48 48" className="h-16 w-16 drop-shadow-[0_6px_16px_rgba(0,0,0,0.5)]">
      <circle cx="24" cy="24" r="20" fill="#f5f5f5" stroke="#111" strokeWidth="2" />
      <path d="M24 12l7 5-2.7 8.4h-8.6L17 17z" fill="#111" />
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
