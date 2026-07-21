import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink-soft">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-sm text-white/70 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with Next.js & Tailwind.
        </p>
        <div className="flex gap-6">
          <Link href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
            GitHub
          </Link>
          <Link href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
            LinkedIn
          </Link>
          <Link href={`mailto:${site.email}`} className="hover:text-gold">
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
