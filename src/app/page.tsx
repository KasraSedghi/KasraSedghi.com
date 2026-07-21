import Link from "next/link";
import Hero from "@/components/Hero";
import { site } from "@/data/site";

const QUICK_LINKS = [
  { href: "/about/", title: "About Me", desc: "My journey, experience, and expertise", emoji: "🙋" },
  { href: "/projects/", title: "Projects", desc: "Latest work and technical achievements", emoji: "💻" },
  { href: "/contact/", title: "Get In Touch", desc: "Ready to collaborate? Let's talk", emoji: "✉️" },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-10 text-center text-3xl font-bold">What I Do</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-gold/20 bg-ink-raised p-8 text-center transition-all hover:-translate-y-1 hover:border-gold hover:shadow-gold-lg"
            >
              <div className="mb-4 text-3xl">{link.emoji}</div>
              <h3 className="mb-2 font-semibold text-white group-hover:text-gold">{link.title}</h3>
              <p className="text-sm text-white/70">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 py-16">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-8 px-6">
          <Link href={site.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-gold">
            LinkedIn
          </Link>
          <Link href={site.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-gold">
            GitHub
          </Link>
          <Link href={`mailto:${site.email}`} className="flex items-center gap-2 text-white/70 hover:text-gold">
            Email
          </Link>
        </div>
      </section>
    </>
  );
}
