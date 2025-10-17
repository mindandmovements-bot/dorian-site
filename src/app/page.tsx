"use client";

import React from "react";
import { motion } from "framer-motion";
// Lucide icons (avoid CDN path issues). "Link" is aliased as LinkIcon.
import {
  ArrowRight,
  PlayCircle,
  Trophy,
  GraduationCap,
  Mic,
  Instagram,
  Youtube,
  Mail,
  Sparkles,
  Shield,
  Dumbbell,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Helper components ---
        type SectionProps = {
          id: string;
          eyebrow?: string;
          title?: React.ReactNode;
          subtitle?: React.ReactNode;
          children: React.ReactNode;
        };

const Section: React.FC<SectionProps> = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="w-full py-20 md:py-28">
    <div className="mx-auto max-w-6xl px-4">
      {eyebrow && (
        <p
          className="mb-3 text-xs uppercase tracking-[0.2em]"
          style={{ color: "var(--brand-gold)" }}
        >
          {eyebrow}
        </p>
      )}
      {title && (
        <h2
          className="text-3xl md:text-5xl font-semibold leading-tight"
          style={{ color: "var(--brand-navy)" }}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-3 max-w-2xl" style={{ color: "var(--brand-gray)" }}>
          {subtitle}
        </p>
      )}
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

// --- Small UI pieces ---
type StatProps = {
  label: string;
  value: React.ReactNode;
};

const Stat: React.FC<StatProps> = ({ label, value }) => (
  <div
    className="flex flex-col items-center rounded-2xl border p-6 shadow-sm backdrop-blur-sm"
    style={{ borderColor: "#e6dcc6" }}
  >
    <span
      className="text-3xl md:text-4xl font-bold tabular-nums"
      style={{ color: "var(--brand-navy)" }}
    >
      {value}
    </span>
    <span
      className="mt-1 text-xs uppercase tracking-wide"
      style={{ color: "var(--brand-gray)" }}
    >
      {label}
    </span>
  </div>
);

type PillProps = {
  children: React.ReactNode;
};

const Pill: React.FC<PillProps> = ({ children }) => (
  <span
    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm shadow-sm backdrop-blur"
    style={{ background: "rgba(248,243,231,0.8)", border: `1px solid var(--brand-gold)` }}
  >
    <Sparkles className="h-4 w-4" style={{ color: "var(--brand-gold)" }} /> {children}
  </span>
);


// --- Media gallery (uses hooks at top level) ---
function MediaGallery() {
  // Videos you provided
  const videos = [
    { title: "Game Highlights", type: "youtube" as const, id: "AcxoDAWb8Vk" },
    { title: "Training Day", type: "youtube" as const, id: "-1wbSlKZFeE" },
    { title: "Feature Story", type: "youtube" as const, id: "UzFteJrMTX8" },
  ];

  // React hooks (these store the “open”/“close” state for your popup)
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<typeof videos[number] | null>(null);

  // When you click Watch
  const openVideo = (v: typeof videos[number]) => {
    setActive(v);
    setOpen(true);
  };

  // When you click Close
  const closeVideo = () => {
    setOpen(false);
    setTimeout(() => setActive(null), 200); // stops YouTube audio after closing
  };

  // Thumbnail + embed helpers
  const getThumb = (v: typeof videos[number]) =>
    `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`;
  const getEmbed = (v: typeof videos[number]) =>
    `https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`;

  // What shows up on screen
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {videos.map((v, idx) => (
          <Card
            key={idx}
            className="rounded-2xl"
            style={{ background: "#fffef9", borderColor: "#e6dcc6" }}
          >
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: "var(--brand-navy)" }}>
                {v.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div
                className="aspect-video w-full overflow-hidden rounded-xl border"
                style={{ background: "#e9e1cc", borderColor: "#e6dcc6" }}
              >
                <img
                  src={getThumb(v)}
                  alt={`${v.title} thumbnail`}
                  className="h-full w-full object-cover"
                />
              </div>

              <Button
                className="w-full rounded-xl"
                variant="outline"
                style={{ borderColor: "var(--brand-gold)", color: "var(--brand-navy)" }}
                onClick={() => openVideo(v)}
              >
                <PlayCircle className="mr-2 h-4 w-4" /> Watch
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal for playing video */}
      {open && active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={closeVideo}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideo}
              className="absolute -top-10 right-0 rounded-lg px-3 py-1 text-sm"
              style={{ background: "var(--brand-cream)", color: "var(--brand-navy)" }}
            >
              Close
            </button>

            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <iframe
                key={active.id}
                src={getEmbed(active)}
                title={active.title}
                className="h-full w-full"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}


// --- Page ---
export default function DorianSite() {
  // Branding — Law & Legacy palette
  const BRAND = {
    navy: "#001F3F", // Navy Depth
    gray: "#3B3B3B", // Oxford Gray
    cream: "#F8F3E7", // Classic Cream
    gold: "#C1A45C", // Prestige Gold
    goldBright: "#D9C890", // lighter gold for subtle gradient
    goldDark: "#9E8647", // darker gold for rings/borders
    white: "#ffffff",
  };

  const goldGradient = `linear-gradient(135deg, ${BRAND.gold} 0%, ${BRAND.goldBright} 55%, ${BRAND.gold} 100%)`;

  // Expose CSS vars for easier theming
  const cssVars = {
    "--brand-navy": BRAND.navy,
    "--brand-gray": BRAND.gray,
    "--brand-cream": BRAND.cream,
    "--brand-gold": BRAND.gold,
    "--brand-gold-bright": BRAND.goldBright,
    "--brand-gold-dark": BRAND.goldDark,
    "--brand-white": BRAND.white,
  } as React.CSSProperties;

  // Links (provided by user)
  const LINKS = {
    instagram: "https://www.instagram.com/_iamd3_/",
    skool: "https://www.skool.com/the-nil-network-9895",
    trainBuildBrand: "https://www.TrainBuildBrand.com",
    email: "mailto:dorianlaw27@gmail.com",
  };

  // --- Lightweight smoke tests (run once on mount) ---
  React.useEffect(() => {
  const test = (name: string, fn: () => void) => {
    try {
      fn();
      console.log(`✅ ${name}`);
    } catch (e: unknown) {
      const msg = (e as { message?: string } | undefined)?.message ?? String(e);
      console.error(`❌ ${name}:`, msg);
    } [LINKS.instagram, LINKS.skool, LINKS.trainBuildBrand];
  };
  

    test("Sections render with IDs", () => {
      ["home", "about", "athletics", "nil", "journal", "podcast", "media", "contact"].forEach((id) => {
        if (!document.getElementById(id)) throw new Error(`Missing #${id}`);
      });
    });

    test("Key links wired", () => {
      const ig = document.querySelector('a[href="' + LINKS.instagram + '"]');
      const sk = document.querySelector('a[href="' + LINKS.skool + '"]');
      const tb = document.querySelector('a[href="' + LINKS.trainBuildBrand + '"]');
      if (!ig) throw new Error("Instagram link not found");
      if (!sk) throw new Error("Skool link not found");
      if (!tb) throw new Error("TrainBuildBrand link not found");
    });

    test("Primary CTA exists", () => {
      const btn = Array.from(document.querySelectorAll("button")).find((b) => /Partner with Dorian/i.test(b.textContent || ""));
      if (!btn) throw new Error("Primary CTA button missing");
    });

    test("Icons mounted", () => {
      const svgs = document.querySelectorAll("svg");
      if (svgs.length === 0) throw new Error("No SVG icons rendered");
    });

    // Root wrapper present & unique
    test("Root wrapper present & unique", () => {
      const roots = document.querySelectorAll("#dorian-root");
      if (roots.length !== 1) throw new Error(`Expected 1 root, found ${roots.length}`);
    });

    // Theme CSS variables present
    test("Theme CSS variables present", () => {
      const root = document.getElementById("dorian-root");
      const styles = getComputedStyle(root!);
      if (!styles.getPropertyValue("--brand-navy")) throw new Error("--brand-navy missing");
      if (!styles.getPropertyValue("--brand-gold")) throw new Error("--brand-gold missing");
      if (!styles.getPropertyValue("--brand-cream")) throw new Error("--brand-cream missing");
    });

    // Header uses navy background (quick attribute check)
    test("Header uses navy background", () => {
      const header = document.querySelector("header") as HTMLElement | null;
      const styleAttr = header?.getAttribute("style") || "";
      if (!/--brand-navy/.test(styleAttr)) throw new Error("Header not using brand navy background");
    });

    // NEW: Leadership copy present in Hero
    test("Hero leadership copy updated", () => {
      const heroP = Array.from(document.querySelectorAll('#home p')).find(p => /Freshman \& Sophomore ASB President; Current Junior Vice President/i.test(p.textContent || ''));
      if (!heroP) throw new Error("Updated leadership copy not found in Hero");
    });

    // NEW: Leadership copy present in Academics card
    test("Academics section present", () => {
      const about = document.querySelector('#about');
      if (!about) throw new Error("About section not found");
    });

    // NEW: Journal section exists
    test("Journal section exists", () => {
      const el = document.getElementById('journal');
      if (!el) throw new Error('Missing #journal');
    });

    // NEW: Journal cover image present
    test("Journal cover image present", () => {
      const img = document.querySelector('img[alt="Train, Build, Brand Journal Cover"]');
      if (!img) throw new Error('Journal cover image not found');
    });
  }, []);

  // --- Render ---
  return (
    <div
      id="dorian-root"
      data-testid="root"
      style={cssVars}
      className="min-h-screen text-[color:var(--brand-gray)] bg-[color:var(--brand-cream)]"
    >
      {/* NAV */}
      <header
        className="sticky top-0 z-40 w-full border-b"
        style={{ background: "var(--brand-navy)", borderColor: "#0d2a52" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#home" className="flex items-center gap-3">
            <div
              className="h-8 w-8 rounded-xl"
              style={{
                background: goldGradient,
                boxShadow: `0 0 0 2px var(--brand-gold-dark)`,
              }}
            />
            <span
              className="text-sm font-semibold tracking-wide"
              style={{ color: "var(--brand-cream)" }}
            >
              D3 • Dorian Franklin
            </span>
          </a>
          <nav className="hidden gap-6 md:flex">
            {[
              { href: "#about", label: "About" },
              { href: "#athletics", label: "Athletics" },
              { href: "#nil", label: "NIL Network" },
              { href: "#journal", label: "Journal" },
              { href: "#podcast", label: "Podcast" },
              { href: "#media", label: "Media" },
              { href: "#contact", label: "Contact" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm"
                style={{ color: "rgba(248,243,231,0.9)" }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contact">
              <Button
                size="sm"
                className="rounded-xl border border-transparent"
                style={{ background: goldGradient, color: "var(--brand-navy)" }}
              >
                Partner with Dorian
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(193,164,92,0.25)" }}
        />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div>
            <Pill>Student‑Athlete • WR | DB | ST • Class of 2027</Pill>
            <h1
              className="mt-4 text-4xl font-bold leading-tight md:text-6xl"
              style={{ color: "var(--brand-navy)" }}
            >
              Dorian &quot;D3&quot; Franklin 
            </h1>
            <p className="mt-4 max-w-xl text-lg" style={{ color: "var(--brand-gray)" }}>
              St. John Bosco (Bellflower, CA) • 4.0 GPA • Freshman & Sophomore ASB President; Current Junior Vice President.
              Lockdown coverage at Nickel & Corner. Author of the <span className="font-semibold"> Train, Build, Brand </span> Journal. Creator of
              <span className="font-semibold"> The NIL Network </span>
              and host of the <span className="font-semibold">D3cision Podcast</span>.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#media">
                <Button
                  className="rounded-xl border border-transparent"
                  style={{ background: goldGradient, color: "var(--brand-navy)" }}
                >
                  <PlayCircle className="mr-2 h-4 w-4" /> Watch Highlights
                </Button>
              </a>
              <a href="#nil">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  style={{ borderColor: "var(--brand-gold)", color: "var(--brand-navy)" }}
                >
                  Join The NIL Network <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 md:max-w-md">
              <Stat label="GPA" value="4.0" />
              <Stat label="INTs (’24)" value="2" />
              <Stat label="Offers" value="6+" />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="aspect-[4/5] w-full overflow-hidden rounded-3xl border shadow-2xl"
              style={{ borderColor: "#e6dcc6" }}
            >
              {/* Replace with real photo */}
              <div className="relative h-full w-full">
                <img
                  src="/hero.jpeg"
                  alt="Dorian Franklin Hero Photo"
                  className="absolute inset-0 h-full w-full object-cover rounded-3xl"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{
                    color: "var(--brand-navy)",
                    background: `radial-gradient(600px 280px at 50% 20%, ${BRAND.gold}22, transparent 60%), linear-gradient(180deg, var(--brand-cream), #ffffff)`,
                  }}
                >
                  <span className="text-3xl font-semibold tracking-tight">
                    D3 • Placeholder Image
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <Section
        id="about"
        eyebrow="About Dorian"
        title="Student. Leader. Playmaker."
        subtitle="Focused on faith, academics, and elite football fundamentals — and helping other athletes win in the NIL era."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card
            className="rounded-2xl"
            style={{ background: "#fffef9", borderColor: "#e6dcc6" }}
          >
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2 text-lg"
                style={{ color: "var(--brand-navy)" }}
              >
                <GraduationCap className="h-5 w-5" /> Academics
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm" style={{ color: "var(--brand-gray)" }}>
              Dorian applies the same focus in the classroom that he brings to the field — challenging himself through 
              advanced coursework, earning college credits, and leading his peers at St. John Bosco.<br></br><br></br>

              Current Coursework:<br></br>
              AP Physics 1 • AP Calculus AB • AP English Language & Composition • U.S. History • Religion • Film & Media
              Dual-Enrollment (Los Angeles Southwest College):
              Afro-American History • Interpersonal Communications.<br></br><br></br>
              On pace to earn an Associate of Arts (A.A.) degree in Communications by Spring 2026
              Academic Highlights:<br></br>
              Dual-enrollment student completing transferable college credits while in high school
              Consistent Honor Roll and Advanced Placement scholar
              Academic interests in Law, Business, and Media 
            </CardContent>
          </Card>
          <Card
            className="rounded-2xl"
            style={{ background: "#fffef9", borderColor: "#e6dcc6" }}
          >
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2 text-lg"
                style={{ color: "var(--brand-navy)" }}
              >
                <Shield className="h-5 w-5" /> Positions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm" style={{ color: "var(--brand-gray)" }}>
              Defensive Back (Nickel/Corner), Wide Receiver, and Special Teams.
              Known for eye discipline, leverage, and technique. <br></br><br></br>
              Leadership & Service:<br></br>
              Freshman & Sophomore Class President
              Current Junior Vice President, St. John Bosco High School
              BOSS Program Ambassador — mentoring younger students through leadership and academic excellence
              Active in student government, peer mentorship, and school culture initiatives
            </CardContent>
          </Card>
          <Card
            className="rounded-2xl"
            style={{ background: "#fffef9", borderColor: "#e6dcc6" }}
          >
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2 text-lg"
                style={{ color: "var(--brand-navy)" }}
              >
                <Dumbbell className="h-5 w-5" /> Training
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm" style={{ color: "var(--brand-gray)" }}>
              Dorians development is built on discipline, competition, and consistency — balancing strength 
              & conditioning, film study, and position mastery year-round.<br></br><br></br>
              He plays with the Trillion Boys 7v7 team and trains with Anthony Brown of Ground Zero — the 
              same program thats developed elite athletes like Cam Bynum (Indianapolis Colts). Through 
              IWILLROUTEU strength and wide receiver training.<br></br><br></br> Dorian continues to refine 
              his speed, precision, and technique as both a receiver and defensive back. &quot;No shortcuts. No excuses. Just keep going.&quot;
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ATHLETICS */}
      <Section
        id="athletics"
        eyebrow="Athletics"
        title="Impact plays. Championship standard."
        subtitle="Highlights, measurables, and recent performances."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card
            className="rounded-2xl"
            style={{ background: "#fffef9", borderColor: "#e6dcc6" }}
          >
            <CardHeader>
              <CardTitle
                className="flex items-center gap-2 text-lg"
                style={{ color: "var(--brand-navy)" }}
              >
                <Trophy className="h-5 w-5" /> Team Accolades
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm" style={{ color: "var(--brand-gray)" }}>
              Division 1 state champions & national contenders with St. John
              Bosco. 2025 win vs #19 Orange Lutheran with game‑swing INT.
            </CardContent>
          </Card>
          <Card
            className="rounded-2xl"
            style={{ background: "#fffef9", borderColor: "#e6dcc6" }}
          >
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: "var(--brand-navy)" }}>
                Measurables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm" style={{ color: "var(--brand-gray)" }}>
                <li>Height/Weight: 5&apos;11&quot; - 178lbs </li>
                <li>40: 4.54/ Shuttle / Vert: </li>
                <li>Wingspan / Hand: Wide</li>
              </ul>
            </CardContent>
          </Card>
          <Card
            className="rounded-2xl"
            style={{ background: "#fffef9", borderColor: "#e6dcc6" }}
          >
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: "var(--brand-navy)" }}>
                Recent Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm" style={{ color: "var(--brand-gray)" }}>
                <li>9 tackles, 1 INT (momentum shift) vs Orange Lutheran</li>
                <li>Special Teams: kickoff tackles; punt return unit</li>
                <li>WR: key blocks; possession catch</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* NIL NETWORK */}
      <Section
        id="nil"
        eyebrow="The NIL Network"
        title="A community by athletes, for athletes."
        subtitle="Dorian’s hub for NIL education, deals, and mentorship. Join and be part of the first 100 members club."
      >
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="space-y-4" style={{ color: "var(--brand-gray)" }}>
            <p>
              Inside you’ll find playbooks, live workshops, brand deal
              templates, and a network of athletes, parents, agents, and
              creators who move with strategy.
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>Starter Pack: outreach scripts, rate card, media kit</li>
              <li>Brand‑Ready content prompts & weekly challenges</li>
              <li>Office hours with Dorian & guest mentors</li>
            </ul>
            <div className="flex gap-3 pt-2">
              <a href={LINKS.skool} target="_blank" rel="noreferrer">
                <Button
                  className="rounded-xl border border-transparent"
                  style={{ background: goldGradient, color: "var(--brand-navy)" }}
                >
                  Join on Skool <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href={LINKS.trainBuildBrand} target="_blank" rel="noreferrer">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  style={{ borderColor: "var(--brand-gold)", color: "var(--brand-navy)" }}
                >
                  TrainBuildBrand.com
                </Button>
              </a>
            </div>
          </div>
          <Card
            className="rounded-2xl"
            style={{ background: "#fffef9", borderColor: "#e6dcc6" }}
          >
            <CardContent className="p-6 text-sm" style={{ color: "var(--brand-gray)" }}>
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-xl"
                  style={{ background: BRAND.gold }}
                />
                <p className="font-medium">Why join?</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Stat label="Members Goal" value="100" />
                <Stat label="Weekly Sessions" value="2" />
                <Stat label="Templates" value="25+" />
                <Stat label="Partners" value="10+" />
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* PODCAST */}
      <Section
        id="podcast"
        eyebrow="D3cision Podcast"
        title="Conversations with the next wave."
        subtitle="Recorded in‑studio and on the road. Athletes, coaches, and creators — real stories, real game."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="rounded-2xl"
              style={{ background: "#fffef9", borderColor: "#e6dcc6" }}
            >
              <CardHeader>
                <CardTitle
                  className="flex items-center gap-2 text-lg"
                  style={{ color: "var(--brand-navy)" }}
                >
                  <Mic className="h-5 w-5" /> Episode {i}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm" style={{ color: "var(--brand-gray)" }}>
                <div
                  className="aspect-video w-full overflow-hidden rounded-xl"
                  style={{ background: "#e9e1cc" }}
                />
                <p>
                  Guest teaser, key insight, and a pull‑quote that highlights
                  mindset and actionable takeaways.
                </p>
                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                  style={{ borderColor: "var(--brand-gold)", color: "var(--brand-navy)" }}
                >
                  <PlayCircle className="mr-2 h-4 w-4" /> Play
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* JOURNAL */}
      <Section
        id="journal"
        eyebrow="Journal"
        title="Train, Build, Brand — The Journal"
        subtitle="Training your body, brain & brand. A guided system for the modern student‑athlete."
      >
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <Card className="rounded-2xl" style={{ background: "#fffef9", borderColor: "#e6dcc6" }}>
            <CardContent className="p-4">
              <div className="overflow-hidden rounded-xl border" style={{borderColor: "#e6dcc6"}}>
                <img
                  src="/journal-cover.jpg"
                  alt="Train, Build, Brand Journal Cover"
                  className="w-full h-auto object-cover rounded-xl shadow-md"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              </div>
              <p className="mt-4 text-sm" style={{color: "var(--brand-gray)"}}>
                Built for 12 weeks of performance: daily training logs, mindset prompts, weekly reflection, NIL content prompts, and deal tracking.
              </p>
              <div className="mt-4 flex gap-3">
                <a href={LINKS.trainBuildBrand} target="_blank" rel="noreferrer">
                  <Button className="rounded-xl border border-transparent" style={{ background: goldGradient, color: "var(--brand-navy)" }}>Learn more</Button>
                </a>
                <a href={LINKS.trainBuildBrand} target="_blank" rel="noreferrer">
                  <Button variant="outline" className="rounded-xl" style={{ borderColor: "var(--brand-gold)", color: "var(--brand-navy)" }}>Get the Journal</Button>
                </a>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-3" style={{color: "var(--brand-gray)"}}>
            <h3 className="text-xl font-semibold" style={{color: "var(--brand-navy)"}}>What’s inside</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Body: lifts, mobility, recovery, nutrition</li>
              <li>Brain: goals, habits, gratitude, film notes</li>
              <li>Brand: content prompts, sponsor outreach, analytics</li>
              <li>Weekly review & game day checklists</li>
              <li>Quarterly recap to plan the next phase</li>
            </ul>
            <div className="pt-2 text-sm">
              Prefer digital? We can ship a PDF version. Email <a className="underline" href={LINKS.email.replace('mailto:','mailto:')}>dorianlaw27@gmail.com</a>.
            </div>
          </div>
        </div>
      </Section>

            {/* MEDIA */}
      <Section
      id="media"
  eyebrow="Media"
  title="Highlights & Press"
  subtitle="Select clips, reels, and features."
>
  <MediaGallery />
      </Section>


      {/* CONTACT */}
      <Section
        id="contact"
        eyebrow="Contact"
        title="Partnerships, speaking, and media"
        subtitle="For NIL brand deals, campus visits, and interview requests, reach out below."
      >
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <Card
            className="rounded-2xl"
            style={{ background: "#fffef9", borderColor: "#e6dcc6" }}
          >
            <CardContent className="space-y-4 p-6">
              <label
                className="block text-sm font-medium"
                style={{ color: "var(--brand-navy)" }}
              >
                Name
              </label>
              <input
                className="w-full rounded-xl border bg-white p-3 text-sm outline-none ring-0 focus:border-[color:var(--brand-gold)]"
                style={{ borderColor: "#e6dcc6", color: "var(--brand-gray)" }}
                placeholder="Your name"
              />
              <label
                className="block text-sm font-medium"
                style={{ color: "var(--brand-navy)" }}
              >
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-xl border bg-white p-3 text-sm outline-none ring-0 focus:border-[color:var(--brand-gold)]"
                style={{ borderColor: "#e6dcc6", color: "var(--brand-gray)" }}
                placeholder="you@brand.com"
              />
              <label
                className="block text-sm font-medium"
                style={{ color: "var(--brand-navy)" }}
              >
                Message
              </label>
              <textarea
                rows={4}
                className="w-full rounded-xl border bg-white p-3 text-sm outline-none ring-0 focus:border-[color:var(--brand-gold)]"
                style={{ borderColor: "#e6dcc6", color: "var(--brand-gray)" }}
                placeholder="Tell us about the opportunity"
              />
              <Button
                className="w-full rounded-xl border border-transparent"
                style={{ background: goldGradient, color: "var(--brand-navy)" }}
              >
                Send
              </Button>
              <p className="text-xs" style={{ color: "#8b846f" }}>
                This demo form does not submit. Hook to your provider (Formspree,
                Resend, Airtable, or Skool) when deploying.
              </p>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3" style={{ color: "var(--brand-gray)" }}>
              <Mail className="h-5 w-5" />
              <a href={LINKS.email} className="underline-offset-2 hover:underline">
                dorianlaw27@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3" style={{ color: "var(--brand-gray)" }}>
              <Instagram className="h-5 w-5" />
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-2 hover:underline"
              >
                @_iamd3_ (Instagram)
              </a>
            </div>
            <div className="flex items-center gap-3" style={{ color: "var(--brand-gray)" }}>
              <Youtube className="h-5 w-5" />
              <a href="#" className="underline-offset-2 hover:underline">
                D3cision Podcast (YouTube)
              </a>
            </div>
            <div className="flex items-center gap-3" style={{ color: "var(--brand-gray)" }}>
              <LinkIcon className="h-5 w-5" />
              <a
                href={LINKS.skool}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-2 hover:underline"
              >
                The NIL Network Community
              </a>
            </div>
            <div className="flex items-center gap-3" style={{ color: "var(--brand-gray)" }}>
              <LinkIcon className="h-5 w-5" />
              <a
                href={LINKS.trainBuildBrand}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-2 hover:underline"
              >
                TrainBuildBrand.com
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer
        className="border-t py-10 text-sm"
        style={{ borderColor: "#e6dcc6", color: "var(--brand-gray)", background: "#fffef9" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <p>© {new Date().getFullYear()} D3 Media Brand • All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:underline">
              About
            </a>
            <a href="#nil" className="hover:underline">
              NIL
            </a>
            <a href="#podcast" className="hover:underline">
              Podcast
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

