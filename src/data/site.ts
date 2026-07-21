// Site-wide facts. Single source of truth for contact/social info —
// components should import from here, never hardcode an email or handle.
export const site = {
  name: "Kasra Sedghi",
  role: "Software Engineer & Finance Student",
  tagline: "Building tech solutions across code, capital, and campus.",
  location: "College Park, MD",
  email: "sedghik07@gmail.com",
  phone: "443-815-1871",
  linktree: "https://linktr.ee/KasraSedghi",
  linkedin: "https://linkedin.com/in/kasrasedghi",
  github: "https://github.com/KasraSedghi",
  domain: "https://kasrasedghi.com",
} as const;
