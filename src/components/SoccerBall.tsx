"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A draggable, physics-y soccer ball. Flick it around the hero — it rolls
 * (rotation tracks distance traveled, like a ball on the ground) and
 * snaps back into its container with a spring. Pure personality touch;
 * disabled visually for prefers-reduced-motion via the drag being optional,
 * not required, to read the hero.
 */
export default function SoccerBall({ size = 96 }: { size?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotate = useMotionValue(0);
  const smoothRotate = useSpring(rotate, { stiffness: 120, damping: 20 });

  // Rolling physics: rotation (degrees) = distance traveled / radius, in radians -> degrees.
  const radius = size / 2;
  const handleDrag = (_: PointerEvent, info: { delta: { x: number; y: number } }) => {
    const distance = info.delta.x; // horizontal drag dominates the "rolling" read
    const deltaDegrees = (distance / radius) * (180 / Math.PI);
    rotate.set(rotate.get() + deltaDegrees + info.delta.y * 0.5);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[260px] w-full max-w-[260px] select-none"
      aria-hidden="true"
    >
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 18 }}
        whileDrag={{ scale: 1.08, cursor: "grabbing" }}
        onDrag={handleDrag as unknown as (e: MouseEvent | TouchEvent | PointerEvent, info: import("framer-motion").PanInfo) => void}
        style={{ rotate: smoothRotate, width: size, height: size }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none"
        title="Flick me"
      >
        <SoccerBallSvg size={size} />
      </motion.div>
    </div>
  );
}

function SoccerBallSvg({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="drop-shadow-[0_10px_25px_rgba(255,215,0,0.35)]"
    >
      <circle cx="50" cy="50" r="48" fill="#f5f5f5" stroke="#111" strokeWidth="1.5" />
      <g fill="#111">
        <polygon points="50,20 60,28 56,40 44,40 40,28" />
        <polygon points="26,38 34,34 40,42 34,53 22,50" />
        <polygon points="74,38 66,34 60,42 66,53 78,50" />
        <polygon points="34,68 44,62 56,62 66,68 58,80 42,80" />
      </g>
      <g stroke="#111" strokeWidth="1.2" fill="none" opacity="0.5">
        <circle cx="50" cy="50" r="48" />
      </g>
    </svg>
  );
}
