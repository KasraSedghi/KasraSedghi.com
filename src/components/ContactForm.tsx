"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mblkpyjw";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const email = String(data.get("email") ?? "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Subject" name="subject" required />
      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-white/70">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-white outline-none transition-colors focus:border-gold"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-gold px-6 py-3 font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:shadow-gold-lg disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-sm text-emerald-400">Thanks — I&rsquo;ll get back to you within 24 hours.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong — check your inputs, or email me directly.</p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm text-white/70">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-white outline-none transition-colors focus:border-gold"
      />
    </div>
  );
}
