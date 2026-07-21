"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ExperienceEntry } from "@/data/experience";
import OrgIcon, { type OrgIconKey } from "@/components/OrgIcon";
import BallList from "@/components/BallList";

/**
 * Vertical experience timeline. As the visitor scrolls, a soccer ball rolls
 * down the line, its vertical position and rotation both driven by scroll
 * progress, not by discrete per-item steps. Reaching the bottom triggers a
 * small "still on the pitch" celebration.
 */
export default function Timeline({ entries }: { entries: ExperienceEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [celebrate, setCelebrate] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.3 });
  const ballTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const ballRotate = useTransform(smoothProgress, [0, 1], [0, 1080]); // several full rolls down the line
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(smoothProgress, "change", (value) => {
    if (value > 0.96 && !celebrate) setCelebrate(true);
  });

  return (
    <div ref={containerRef} className="relative mx-auto max-w-2xl">
      {/* Track */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-white/10" />
      {/* Progress fill */}
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-4 top-0 w-0.5 bg-gold/70"
      />
      {/* Rolling ball, scroll-linked */}
      <motion.div
        style={{ top: ballTop, rotate: ballRotate }}
        className="absolute left-4 z-10 -ml-2.5 h-5 w-5 -translate-y-1/2 rounded-full bg-gradient-to-br from-white to-gold shadow-gold"
        aria-hidden="true"
      />

      <ol className="flex flex-col gap-12 py-4">
        {entries.map((entry) => (
          <li key={entry.id} className="relative pl-12">
            <span className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 border-gold bg-ink" />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-white/10 bg-ink-raised p-6 shadow-gold transition-shadow hover:shadow-gold-lg"
            >
              <div className="mb-2 flex items-center gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-gold/30 bg-ink text-gold">
                  <OrgIcon icon={entry.icon as OrgIconKey} />
                </span>
                <div>
                  <h3 className="font-semibold text-white">{entry.title}</h3>
                  <p className="text-sm text-gold">{entry.org}</p>
                  <p className="text-xs text-white/60">{entry.period}</p>
                </div>
              </div>
              <p className="mb-3 text-sm text-white/70">{entry.summary}</p>
              <BallList items={entry.achievements} />
            </motion.div>
          </li>
        ))}
      </ol>

      <GoalCelebration show={celebrate} />
    </div>
  );
}

function GoalCelebration({ show }: { show: boolean }) {
  const particles = Array.from({ length: 10 });
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="relative mx-auto -mt-6 mb-4 flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-ink-raised px-4 py-2 text-sm text-gold"
        >
          {particles.map((_, i) => {
            const angle = (i / particles.length) * Math.PI * 2;
            return (
              <motion.span
                key={i}
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-gold"
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos(angle) * 40,
                  y: Math.sin(angle) * 40,
                  opacity: 0,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            );
          })}
          <span aria-hidden="true">⚽</span>
          <span>Still on the pitch, more to come</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
