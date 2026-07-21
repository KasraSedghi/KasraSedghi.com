import type { Metadata } from "next";
import Image from "next/image";
import Timeline from "@/components/Timeline";
import { experience } from "@/data/experience";
import { education, activities } from "@/data/education";
import { skillGroups, certifications, awards } from "@/data/skills";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kasra Sedghi's journey through software engineering, finance, and venture capital at the University of Maryland.",
};

export default function AboutPage() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-4xl px-6 pb-16 text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl">About Me</h1>
        <p className="mt-3 text-white/70">
          Software Engineer & Finance Student, building at the intersection of code and capital
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-6 pb-20 md:grid-cols-2 md:items-center">
        <div className="mx-auto h-56 w-56 overflow-hidden rounded-2xl border-2 border-gold/40 shadow-gold-lg md:mx-0">
          <Image src="/KSphoto.png" alt="Kasra Sedghi" width={280} height={280} className="h-full w-full object-cover" />
        </div>
        <div className="space-y-4 text-white/70">
          <p>
            A software engineer and business-minded builder with a blend of technical depth and
            an entrepreneurial mindset — I care about solutions that solve real problems and hold
            up under real usage.
          </p>
          <p>
            I&rsquo;m double-majoring in Computer Science and Finance, with a Data Science minor,
            at the University of Maryland&rsquo;s Interdisciplinary Business Honors College —
            splitting my time between shipping software, evaluating startups as a venture analyst,
            and learning what makes both durable.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-12 text-center text-3xl font-bold">Professional Experience</h2>
        <Timeline entries={experience} />
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-10 text-center text-3xl font-bold">Education</h2>
        <div className="grid gap-6 sm:grid-cols-1">
          {education.map((e) => (
            <div key={e.id} className="rounded-xl border border-white/10 bg-ink-raised p-6">
              <h3 className="font-semibold text-white">{e.school}</h3>
              <p className="text-gold">{e.degree}</p>
              <p className="text-sm text-white/60">{e.period}</p>
              {e.program && <p className="mt-2 text-sm text-white/60">{e.program}</p>}
              <p className="mt-3 text-sm text-white/70">{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-10 text-center text-3xl font-bold">Activities & Affiliations</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {activities.map((a) => (
            <div key={a.id} className="rounded-xl border border-white/10 bg-ink-raised p-6 transition-shadow hover:shadow-gold">
              <h3 className="font-semibold text-white">{a.name}</h3>
              <p className="text-sm text-gold">{a.role}</p>
              <p className="text-xs text-white/60">{a.period}</p>
              <p className="mt-3 text-sm text-white/70">{a.description}</p>
              {a.href && (
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-gold underline underline-offset-2">
                  Learn more
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-10 text-center text-3xl font-bold">Skills & Technologies</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-ink-raised px-3 py-1 text-xs text-white/70 transition-colors hover:border-gold hover:text-gold"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold">Certifications</h3>
          <ul className="space-y-1 text-sm text-white/70">
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-10 text-center text-3xl font-bold">Awards & Recognition</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {awards.map((award) => (
            <span
              key={award}
              className="rounded-full border border-gold/30 bg-ink-raised px-4 py-2 text-sm text-white/80"
            >
              🏆 {award}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
