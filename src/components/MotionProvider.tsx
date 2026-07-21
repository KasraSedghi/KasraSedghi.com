"use client";

import { MotionConfig } from "framer-motion";

// Framer Motion's own springs/transforms (the scroll-linked timeline ball,
// the drag physics on the hero soccer ball) run in JS, so the CSS-only
// prefers-reduced-motion override in globals.css doesn't reach them.
// MotionConfig reducedMotion="user" makes Framer Motion honor the OS
// setting for every animation it drives.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
