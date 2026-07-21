import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Kasra Sedghi for opportunities, collaboration, or networking.",
};

const CONTACT_CARDS = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "LinkedIn", value: "Connect on LinkedIn", href: site.linkedin },
  { label: "GitHub", value: "View Code Portfolio", href: site.github },
];

const FAQS = [
  {
    q: "What types of projects do you work on?",
    a: "Software development, data analysis, automation, and business or finance modeling, including web applications, AI pipelines, and financial analytics.",
  },
  {
    q: "Do you work remotely?",
    a: "Yes, I'm comfortable working remotely and collaborating with distributed teams, and open to hybrid arrangements.",
  },
  {
    q: "What's your preferred method of communication?",
    a: "Email for initial contact, and flexible with calls and messaging platforms for ongoing projects.",
  },
  {
    q: "Are you available for long term projects?",
    a: "Yes, alongside academic responsibilities. Happy to discuss scope and timeline.",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-36">
      <section className="mx-auto max-w-4xl px-6 pb-16 text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Get In Touch</h1>
        <p className="mt-3 text-white/70">Ready to collaborate? Let&rsquo;s discuss your project.</p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {CONTACT_CARDS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel={c.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="rounded-xl border border-white/10 bg-ink-raised p-6 text-center transition-shadow hover:shadow-gold"
            >
              <h3 className="font-semibold text-gold">{c.label}</h3>
              <p className="mt-1 text-sm text-white/70">{c.value}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-20">
        <h2 className="mb-8 text-center text-2xl font-bold">Send a Message</h2>
        <ContactForm />
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <h2 className="mb-10 text-center text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {FAQS.map((f) => (
            <div key={f.q} className="rounded-xl border border-white/10 bg-ink-raised p-6">
              <h3 className="mb-2 font-semibold text-white">{f.q}</h3>
              <p className="text-sm text-white/70">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
