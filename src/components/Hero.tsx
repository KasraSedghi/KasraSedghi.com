"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SoccerBall from "@/components/SoccerBall";

const TYPED_TEXT = "Software Engineer & Finance Student";

export default function Hero() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setTyped(TYPED_TEXT.slice(0, i));
      if (i >= TYPED_TEXT.length) clearInterval(timer);
    }, 55);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex min-h-screen items-center bg-gradient-to-br from-ink to-ink-raised pt-24">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            <span className="block text-gold">Kasra Sedghi</span>
            <span className="block">Building</span>
            <span className="block">Tech Solutions</span>
          </h1>
          <p className="mt-4 h-7 text-lg text-white/80">
            {typed}
            <span className="animate-pulse text-gold">|</span>
          </p>
          <p className="mt-4 max-w-md text-white/70">
            Double-majoring in Computer Science and Finance at the University of
            Maryland — shipping full-stack products, running RAG pipelines, and
            learning the venture side of tech.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/about/"
              className="rounded-full bg-gold px-6 py-3 font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:shadow-gold-lg"
            >
              Learn About Me
            </Link>
            <Link
              href="/projects/"
              className="rounded-full border border-gold/40 px-6 py-3 font-semibold text-gold transition-transform hover:-translate-y-0.5 hover:border-gold"
            >
              View Work
            </Link>
          </div>
          <div className="mt-10 flex gap-10">
            <div>
              <p className="text-3xl font-bold text-gold">6+</p>
              <p className="text-sm text-white/60">Internships & Orgs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gold">6+</p>
              <p className="text-sm text-white/60">Projects Shipped</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col items-center gap-3"
        >
          <SoccerBall />
          <p className="text-xs uppercase tracking-widest text-white/60">Flick the ball</p>
        </motion.div>
      </div>
    </section>
  );
}
