"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * A quick penalty shootout widget: pick a corner, the keeper guesses a
 * corner of their own, and a scoreboard tracks goals vs. saves across a
 * best-of-5 round. Distinct on purpose from the other two soccer moments on
 * the site (the draggable hero ball is continuous physics, the timeline
 * ball is scroll driven); this one is discrete and click/tap driven, with a
 * scoreboard and a win/lose outcome, closer to a World Cup shootout graphic
 * than a toy.
 */

type Zone = "left" | "center" | "right";
type ShotOutcome = "goal" | "save";
type Phase = "idle" | "flying" | "result" | "finished";

const ZONES: { key: Zone; label: string; x: string }[] = [
  { key: "left", label: "Aim left", x: "18%" },
  { key: "center", label: "Aim center", x: "50%" },
  { key: "right", label: "Aim right", x: "82%" },
];

const MAX_SHOTS = 5;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export default function PenaltyShootout() {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [ballZone, setBallZone] = useState<Zone>("center");
  const [keeperZone, setKeeperZone] = useState<Zone>("center");
  const [lastOutcome, setLastOutcome] = useState<ShotOutcome | null>(null);
  const [history, setHistory] = useState<ShotOutcome[]>([]);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const goals = history.filter((h) => h === "goal").length;
  const saves = history.filter((h) => h === "save").length;
  const shotsTaken = history.length;

  const flightMs = reducedMotion ? 60 : 550;
  const resultMs = reducedMotion ? 200 : 900;

  function takeShot(zone: Zone) {
    if (phase !== "idle" || shotsTaken >= MAX_SHOTS) return;

    const keeperGuess = ZONES[Math.floor(Math.random() * ZONES.length)].key;
    setBallZone(zone);
    setKeeperZone(keeperGuess);
    setPhase("flying");

    const t1 = setTimeout(() => {
      const outcome: ShotOutcome = keeperGuess === zone ? "save" : "goal";
      setLastOutcome(outcome);
      setHistory((prev) => [...prev, outcome]);
      setPhase("result");

      const t2 = setTimeout(() => {
        setPhase((p) => (p === "result" ? "idle" : p));
      }, resultMs);
      timeouts.current.push(t2);
    }, flightMs);
    timeouts.current.push(t1);
  }

  // Flip to "finished" once the 5th shot's result has been shown.
  useEffect(() => {
    if (shotsTaken >= MAX_SHOTS && phase === "idle") {
      setPhase("finished");
    }
  }, [shotsTaken, phase]);

  function reset() {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    setHistory([]);
    setLastOutcome(null);
    setPhase("idle");
    setBallZone("center");
    setKeeperZone("center");
  }

  const zoneXFor = useMemo(
    () => (zone: Zone) => ZONES.find((z) => z.key === zone)?.x ?? "50%",
    []
  );

  const canShoot = phase === "idle" && shotsTaken < MAX_SHOTS;
  const isFinished = phase === "finished" || shotsTaken >= MAX_SHOTS;

  return (
    <div className="mx-auto w-full max-w-md select-none">
      {/* Scoreboard */}
      <div className="mb-6 flex items-center justify-center gap-6 rounded-xl border border-gold/20 bg-ink-raised px-6 py-3">
        <Scorebox label="YOU" value={goals} />
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/40">Shot</p>
          <p className="text-sm font-semibold text-white">
            {Math.min(shotsTaken + (phase !== "idle" && !isFinished ? 1 : 0), MAX_SHOTS)} / {MAX_SHOTS}
          </p>
        </div>
        <Scorebox label="KEEPER" value={saves} />
      </div>

      {/* Pitch / goal scene */}
      <div className="relative h-[200px] w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-ink-raised to-ink">
        <GoalFrame />

        {/* Goalkeeper */}
        <motion.div
          className="absolute top-[46px] h-10 w-10 -translate-x-1/2"
          style={{ left: zoneXFor(phase === "idle" ? "center" : keeperZone) }}
          animate={{
            left: zoneXFor(phase === "idle" ? "center" : keeperZone),
            rotate: phase === "flying" || phase === "result" ? (keeperZone === "left" ? -18 : keeperZone === "right" ? 18 : 0) : 0,
          }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
        >
          <KeeperSvg diving={phase === "flying" || phase === "result"} />
        </motion.div>

        {/* Ball */}
        <motion.div
          className="absolute h-6 w-6 -translate-x-1/2 rounded-full bg-gradient-to-br from-white to-gold shadow-gold"
          initial={false}
          animate={{
            left: phase === "idle" || phase === "finished" ? "50%" : zoneXFor(ballZone),
            top: phase === "flying" || phase === "result" ? "58px" : "168px",
            scale: phase === "flying" || phase === "result" ? 0.85 : 1,
          }}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" }}
        />

        {/* Zone targets */}
        <div className="absolute inset-x-0 bottom-0 top-0 grid grid-cols-3">
          {ZONES.map((zone) => (
            <button
              key={zone.key}
              type="button"
              disabled={!canShoot}
              onClick={() => takeShot(zone.key)}
              aria-label={zone.label}
              className="group h-full w-full outline-none transition-colors disabled:cursor-default enabled:cursor-pointer enabled:hover:bg-gold/5 focus-visible:bg-gold/10"
            />
          ))}
        </div>

        {/* Outcome flash */}
        {phase === "result" && lastOutcome && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full border border-gold/30 bg-ink/90 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold"
          >
            {lastOutcome === "goal" ? "Goal!" : "Saved"}
          </motion.div>
        )}
      </div>

      {/* Shot history dots */}
      <div className="mt-4 flex justify-center gap-2" aria-hidden="true">
        {Array.from({ length: MAX_SHOTS }).map((_, i) => {
          const outcome = history[i];
          return (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                outcome === "goal"
                  ? "bg-gold"
                  : outcome === "save"
                    ? "bg-white/30"
                    : "border border-white/20"
              }`}
            />
          );
        })}
      </div>

      <p className="mt-3 min-h-5 text-center text-sm text-white/60">
        {isFinished
          ? `Final score: ${goals} to ${saves}. ${goals > saves ? "Shootout won." : goals === saves ? "Even shootout." : "Keeper takes it."}`
          : canShoot
            ? "Pick a corner."
            : ""}
      </p>

      <div className="mt-3 flex justify-center">
        {isFinished ? (
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-gold/40 px-5 py-2 text-sm font-semibold text-gold transition-transform hover:-translate-y-0.5 hover:border-gold"
          >
            Retake shootout
          </button>
        ) : (
          <span className="text-xs uppercase tracking-widest text-white/40">
            Click or tap a corner of the goal
          </span>
        )}
      </div>
    </div>
  );
}

function Scorebox({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="text-[10px] uppercase tracking-widest text-white/40">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function GoalFrame() {
  return (
    <svg
      viewBox="0 0 300 200"
      className="pointer-events-none absolute inset-0 h-full w-full text-white/25"
      fill="none"
      stroke="currentColor"
      preserveAspectRatio="none"
    >
      {/* posts + crossbar */}
      <path d="M20 190 V20 H280 V190" strokeWidth="4" />
      {/* net crosshatch */}
      <g stroke="currentColor" strokeWidth="0.75" opacity="0.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={20 + i * 32.5} y1="20" x2={20 + i * 32.5} y2="190" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="20" y1={20 + i * 28.3} x2="280" y2={20 + i * 28.3} />
        ))}
      </g>
    </svg>
  );
}

function KeeperSvg({ diving }: { diving: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10 drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
      <circle cx="20" cy="10" r="6" fill="#f5f5f5" stroke="#111" strokeWidth="1.2" />
      <rect
        x="10"
        y="17"
        width="20"
        height="16"
        rx="6"
        fill="#FFD700"
        stroke="#111"
        strokeWidth="1.2"
        opacity={diving ? 0.95 : 1}
      />
      <line x1="20" y1="33" x2="20" y2="39" stroke="#111" strokeWidth="1.4" />
    </svg>
  );
}
