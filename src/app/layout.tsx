import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import SoccerChaseStrip from "@/components/SoccerChaseStrip";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} | Software Engineer & Project Manager | University of Maryland`,
    template: `%s | ${site.name}`,
  },
  description:
    "Kasra Sedghi is a CS + Finance student at the University of Maryland building software, analyzing markets, and shipping projects across engineering and venture capital.",
  keywords: [
    "Kasra Sedghi",
    "Software Engineer",
    "University of Maryland",
    "Computer Science",
    "Finance",
    "Amazon SDE Intern",
    "Dingman Venture Capitalist Group",
    "Web Development",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    url: site.domain,
    siteName: `${site.name} Portfolio`,
    title: `${site.name} | Software Engineer & Project Manager`,
    description:
      "CS + Finance student at the University of Maryland building software, analyzing markets, and shipping projects.",
    images: [{ url: "/KSphoto.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Software Engineer & Project Manager`,
    description:
      "CS + Finance student at the University of Maryland building software, analyzing markets, and shipping projects.",
    images: ["/KSphoto.png"],
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              jobTitle: "Software Engineer & Project Manager",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "University of Maryland",
              },
              description:
                "Software Engineer and Finance student at the University of Maryland, building across CS, data, and venture capital.",
              url: site.domain,
              image: `${site.domain}/KSphoto.png`,
              sameAs: [site.github, site.linkedin],
              worksFor: { "@type": "Organization", name: "Amazon", jobTitle: "SDE Intern" },
            }),
          }}
        />
        <MotionProvider>
          <div className="fixed inset-x-0 top-0 z-50 flex flex-col">
            <SoccerChaseStrip />
            <Navbar />
          </div>
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
