import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Kasra Sedghi's technical and business analytics projects — full-stack apps, AI pipelines, and financial models.",
};

export default function ProjectsPage() {
  const technical = projects.filter((p) => p.category === "Technical");
  const business = projects.filter((p) => p.category === "Business & Analytics");

  return (
    <div className="pt-28">
      <section className="mx-auto max-w-4xl px-6 pb-16 text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl">My Projects</h1>
        <p className="mt-3 text-white/70">Showcasing shipped software and analytical work</p>
      </section>

      <ProjectGroup title="Technical Projects" items={technical} />
      <ProjectGroup title="Business & Analytics Projects" items={business} />

      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="text-2xl font-bold">Ready to Start a Project?</h2>
        <p className="mt-2 text-white/70">Let&rsquo;s discuss how we can bring your ideas to life.</p>
        <Link
          href="/contact/"
          className="mt-6 inline-block rounded-full bg-gold px-6 py-3 font-semibold text-ink transition-transform hover:-translate-y-0.5 hover:shadow-gold-lg"
        >
          Get In Touch
        </Link>
      </section>
    </div>
  );
}

function ProjectGroup({ title, items }: { title: string; items: typeof projects }) {
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20">
      <h2 className="mb-10 text-center text-3xl font-bold">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((p) => (
          <article
            key={p.id}
            className="flex flex-col rounded-xl border border-white/10 bg-ink-raised p-6 transition-shadow hover:shadow-gold-lg"
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="font-semibold text-white">{p.name}</h3>
              {p.status === "in-progress" && (
                <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs text-gold">In Progress</span>
              )}
            </div>
            <p className="mb-1 text-xs text-white/60">{p.period}</p>
            <p className="mb-4 text-sm text-white/70">{p.description}</p>

            <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-white/70">
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <div className="mb-4 mt-auto flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">
                  {t}
                </span>
              ))}
            </div>

            {p.href && (
              <Link
                href={p.href}
                target="_blank" rel="noopener noreferrer"
                className="text-sm font-medium text-gold hover:underline"
              >
                View on GitHub →
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
