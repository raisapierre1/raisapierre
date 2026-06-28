import { useState, useEffect, useRef, useCallback } from "react";

// ─── Design Tokens ───────────────────────────────────────────────
const tokens = {
  dark: {
    bgPrimary: "#0e0f0a",
    bgElevated: "#1a1a1a",
    bgSurface: "#232222",
    bgSurfaceHover: "#303030",
    textFull: "#fdfdfd",
    textHi: "rgba(253,253,253,0.87)",
    textMd: "rgba(253,253,253,0.60)",
    textLo: "rgba(253,253,253,0.55)",
    accentPrimary: "#6416bc",
    accentPrimaryText: "#bb8fea",
    accentSecondary: "#00bf67",
    neutral100: "#303030",
    neutral300: "#505050",
    neutral500: "#7a7a7a",
    info: "#3ca0fa",
  },
  light: {
    bgPrimary: "#f8f7f4",
    bgElevated: "#ffffff",
    bgSurface: "#eeedea",
    bgSurfaceHover: "#e2e1de",
    textFull: "#1a1a1a",
    textHi: "rgba(26,26,26,0.87)",
    textMd: "rgba(26,26,26,0.60)",
    textLo: "rgba(26,26,26,0.50)",
    accentPrimary: "#6416bc",
    accentPrimaryText: "#5a10a8",
    accentSecondary: "#009e55",
    neutral100: "#d4d4d4",
    neutral300: "#b0b0b0",
    neutral500: "#888888",
    info: "#2b7fd4",
  },
};

// ─── Animation hook: fade-up on scroll ───────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Staggered children wrapper ──────────────────────────────────
function StaggerGroup({ children, visible, baseDelay = 0, stagger = 120 }) {
  return children.map((child, i) => (
    <div
      key={i}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * stagger}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * stagger}ms`,
      }}
    >
      {child}
    </div>
  ));
}

// ─── Page transition wrapper ─────────────────────────────────────
function PageTransition({ children, pageKey }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(false);
    const t = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(t);
  }, [pageKey]);
  return (
    <div style={{
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
    }}>
      {children}
    </div>
  );
}

// ─── Animated counter ────────────────────────────────────────────
function AnimCounter({ end, suffix = "", duration = 1500, visible }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = end / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [visible, end, duration]);
  return <span>{val}{suffix}</span>;
}

// ─── Nav link with animated underline ────────────────────────────
function NavLink({ label, active, onClick, t }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none", border: "none", cursor: "pointer",
        color: active ? t.accentPrimaryText : t.textMd,
        fontWeight: active ? 500 : 400,
        fontSize: 14, letterSpacing: "0.5px",
        position: "relative", padding: "8px 0",
        fontFamily: "Roboto, system-ui, sans-serif",
        transition: "color 0.3s ease",
      }}
    >
      {label}
      <span style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: t.accentPrimaryText,
        transform: active || hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
      }} />
    </button>
  );
}

// ─── Case study card with hover reveal ───────────────────────────
function CaseStudyCard({ title, company, tags, desc, role, t, onClick, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: t.bgElevated,
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 150}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 150}ms, box-shadow 0.4s ease`,
        boxShadow: hovered ? `0 12px 40px rgba(100,22,188,0.15)` : "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <div style={{
        height: 200,
        background: `linear-gradient(135deg, ${t.accentPrimary}22, ${t.bgSurface})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${t.accentPrimary}33, transparent)`,
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        }} />
        <span style={{ color: t.textMd, fontSize: 14, zIndex: 1 }}>[ Project Screenshot ]</span>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {tags.map((tag, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 500, letterSpacing: "0.5px",
              color: t.accentPrimaryText, background: `${t.accentPrimary}18`,
              padding: "4px 10px", borderRadius: 100,
            }}>{tag}</span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: t.textLo, marginBottom: 4, fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase" }}>{company}</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: t.textFull, marginBottom: 8, lineHeight: 1.3 }}>{title}</div>
        <div style={{ fontSize: 14, color: t.textMd, lineHeight: 1.6, marginBottom: 12 }}>{desc}</div>
        <div style={{ fontSize: 13, color: t.textLo }}>{role}</div>
        <div style={{
          marginTop: 16, display: "flex", alignItems: "center", gap: 8,
          color: t.accentPrimaryText, fontSize: 14, fontWeight: 500,
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          transition: "transform 0.3s ease",
        }}>
          View case study <span style={{ fontSize: 18 }}>&rarr;</span>
        </div>
      </div>
    </div>
  );
}

// ─── Value card ──────────────────────────────────────────────────
function ValueCard({ icon, title, text, t, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: t.bgElevated,
        borderRadius: 12, padding: 24,
        border: `1px solid ${hovered ? t.accentPrimary + "44" : t.neutral100}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: t.textFull, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14, color: t.textMd, lineHeight: 1.7 }}>{text}</div>
    </div>
  );
}

// ─── Timeline item ───────────────────────────────────────────────
function TimelineItem({ year, role, company, desc, t, index, visible }) {
  return (
    <div style={{
      display: "flex", gap: 20, alignItems: "flex-start",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-30px)",
      transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms`,
    }}>
      <div style={{
        minWidth: 80, fontSize: 13, fontWeight: 500,
        color: t.accentPrimaryText, paddingTop: 2,
      }}>{year}</div>
      <div style={{
        width: 2, minHeight: 60, background: t.neutral100,
        borderRadius: 1, flexShrink: 0,
        position: "relative",
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: t.accentPrimary, border: `2px solid ${t.bgPrimary}`,
          position: "absolute", top: 4, left: -4,
        }} />
      </div>
      <div style={{ paddingBottom: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: t.textFull }}>{role}</div>
        <div style={{ fontSize: 14, color: t.accentPrimaryText, marginBottom: 4 }}>{company}</div>
        <div style={{ fontSize: 14, color: t.textMd, lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

// ─── Theme toggle ────────────────────────────────────────────────
function ThemeToggle({ dark, onToggle, t }) {
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        background: t.bgSurface,
        border: `1px solid ${t.neutral100}`,
        borderRadius: 100, width: 44, height: 24,
        cursor: "pointer", position: "relative",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: "50%",
        background: t.accentPrimary,
        position: "absolute", top: 2,
        left: dark ? 22 : 3,
        transition: "left 0.35s cubic-bezier(0.68,-0.55,0.27,1.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 10,
      }}>
        {dark ? "🌙" : "☀️"}
      </div>
    </button>
  );
}

// ─── CASE STUDIES DATA ───────────────────────────────────────────
const caseStudies = [
  {
    id: "avanti",
    company: "Avanti Studios",
    title: "Brand & Product — 0 to 1",
    tags: ["Brand Identity", "AI / Live Casino", "0-to-1"],
    desc: "Designing the brand and product for a next-gen live casino built on AI-cloned dealers and Unreal Engine.",
    role: "Senior UX/UI Designer & Researcher · 2024–2026",
    timeline: "Aug 2024 — Jan 2026",
  },
  {
    id: "betsson",
    company: "Betsson Group",
    title: "Bet Share — Social Betting",
    tags: ["Product Design", "Sportsbook", "Growth"],
    desc: "Turning every winning bet slip into a shareable acquisition asset across a 20+ brand portfolio.",
    role: "Senior Product Designer · 2021–2024",
    timeline: "Sep 2023 — Aug 2024",
  },
  {
    id: "design-systems",
    company: "Cross-company",
    title: "Design Systems at Scale",
    tags: ["Design Leadership", "Systems Thinking", "Governance"],
    desc: "Lessons from building, contributing to, and inheriting design systems across three iGaming products.",
    role: "Senior Product Designer · 2021–Present",
    timeline: "2021 — Present",
  },
  {
    id: "leovegas",
    company: "LeoVegas",
    title: "Sign-Up for Spain",
    tags: ["UX Research", "Regulated Markets", "Mobile-First"],
    desc: "Designing the Spanish-market sign-up and KYC flow — turning a regulated onboarding into a conversion experience.",
    role: "UX/UI Designer & Researcher · 2018–2019",
    timeline: "Apr 2018 — Aug 2019",
  },
];

const experience = [
  { year: "2024–26", role: "Senior UX/UI Designer & Researcher", company: "Avanti Studios", desc: "Led 0-to-1 brand + product design for AI-powered live casino startup." },
  { year: "2023–24", role: "Senior Product Designer, Sportsbook", company: "Betsson Group", desc: "Owned end-to-end design for growth features across 20+ brand portfolio." },
  { year: "2021–23", role: "UX/UI Designer → Senior", company: "Betsson Group", desc: "Designed and iterated UI across the product suite within the unified design system." },
  { year: "2019–21", role: "Game UX/UI Designer", company: "NetEnt (Evolution)", desc: "Designed game interfaces including Roulette MAX with the 4-wheel mechanic." },
  { year: "2018–19", role: "UX/UI Designer & Researcher", company: "LeoVegas", desc: "Mixed-method research and design for regulated-market sign-up flows." },
  { year: "2015–18", role: "Professor of Design", company: "Uninorte", desc: "Taught interaction design, mentored graduating class as Professor Godmother." },
  { year: "2008–15", role: "Designer & Researcher", company: "Various (Manaus)", desc: "Industrial design, academic research, and early digital product work." },
];

const values = [
  { icon: "🔍", title: "Lead with research", text: "Design without research is decoration. 16 years of mixed-method practice. Published heuristics work still grounds my approach." },
  { icon: "🌍", title: "Design for everyone", text: "The most interesting users are the edge cases. Accessibility isn't a checkbox; it's the floor." },
  { icon: "🧱", title: "Constraints make better design", text: "Regulation. Mobile-first. Multi-brand. Ten-second betting windows. Limits force clarity." },
  { icon: "🤝", title: "Mentorship is the work", text: "At senior level, you're judged on whether the people and systems around you can ship great work." },
];

// ─── MAIN APP ────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("home");
  const t = dark ? tokens.dark : tokens.light;

  // Scroll refs for reveal
  const [heroRef, heroVis] = useScrollReveal(0.1);
  const [workRef, workVis] = useScrollReveal(0.1);
  const [introRef, introVis] = useScrollReveal(0.1);
  const [storyRef, storyVis] = useScrollReveal(0.1);
  const [timeRef, timeVis] = useScrollReveal(0.1);
  const [valRef, valVis] = useScrollReveal(0.1);
  const [contactRef, contactVis] = useScrollReveal(0.1);
  const [statsRef, statsVis] = useScrollReveal(0.2);

  const navigate = useCallback((p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navItems = [
    { label: "Home", key: "home" },
    { label: "Work", key: "work" },
    { label: "About", key: "about" },
    { label: "Contact", key: "contact" },
  ];

  // ─── Navigation bar ────────────────
  const Nav = () => (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: `${t.bgSurface}ee`,
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      borderBottom: `1px solid ${t.neutral100}`,
      padding: "0 32px",
      transition: "background 0.4s ease, border-color 0.4s ease",
    }}>
      <div style={{
        maxWidth: 1080, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 60,
      }}>
        <button
          onClick={() => navigate("home")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 18, fontWeight: 700, color: t.textFull,
            fontFamily: "Roboto, system-ui, sans-serif",
            letterSpacing: "-0.5px",
          }}
        >
          Raisa Pierre
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {navItems.map(n => (
            <NavLink key={n.key} label={n.label} active={page === n.key} onClick={() => navigate(n.key)} t={t} />
          ))}
          <ThemeToggle dark={dark} onToggle={() => setDark(!dark)} t={t} />
        </div>
      </div>
    </nav>
  );

  // ─── Footer ────────────────────────
  const Footer = () => (
    <footer style={{
      background: t.bgSurface, padding: "40px 32px",
      borderTop: `1px solid ${t.neutral100}`,
      transition: "background 0.4s ease",
    }}>
      <div style={{
        maxWidth: 1080, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ color: t.textLo, fontSize: 13 }}>© 2026 Raisa Pierre. Designed by Raisa Pierre, built with Astro.</div>
        <div style={{ display: "flex", gap: 20, fontSize: 13 }}>
          <a href="mailto:raisapierre@gmail.com" style={{ color: t.accentPrimaryText, textDecoration: "none" }}>Email</a>
          <a href="https://linkedin.com/in/raisapierre" style={{ color: t.accentPrimaryText, textDecoration: "none" }}>LinkedIn</a>
          <span style={{ color: t.textLo }}>Stockholm, Sweden</span>
        </div>
      </div>
    </footer>
  );

  // ─── HOME PAGE ─────────────────────
  const HomePage = () => (
    <>
      {/* Hero */}
      <section ref={heroRef} style={{
        minHeight: "80vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "80px 32px",
        maxWidth: 1080, margin: "0 auto",
      }}>
        <StaggerGroup visible={heroVis} stagger={180}>
          <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: "2px", color: t.accentPrimaryText, textTransform: "uppercase", marginBottom: 16 }}>
            Senior UX/UI Designer & Researcher
          </div>
          <h1 style={{
            fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700,
            color: t.textFull, lineHeight: 1.12, margin: 0,
            maxWidth: 700,
          }}>
            From Manaus to Stockholm — designing at the intersection of research, regulation, and real users.
          </h1>
          <p style={{
            fontSize: 20, color: t.textMd, lineHeight: 1.6,
            maxWidth: 580, marginTop: 24,
          }}>
            16+ years designing user-centered products across iGaming, health tech, and e-commerce. Published researcher. Design system builder. Team leader.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
            <button
              onClick={() => navigate("work")}
              style={{
                background: t.accentPrimary, color: "#fff",
                border: "none", borderRadius: 8, padding: "14px 32px",
                fontSize: 15, fontWeight: 500, cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 24px ${t.accentPrimary}44`; }}
              onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
            >
              View my work
            </button>
            <button
              onClick={() => navigate("about")}
              style={{
                background: "none", color: t.accentPrimaryText,
                border: `1px solid ${t.accentPrimary}44`,
                borderRadius: 8, padding: "14px 32px",
                fontSize: 15, fontWeight: 500, cursor: "pointer",
                transition: "background 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={e => { e.target.style.background = `${t.accentPrimary}11`; e.target.style.borderColor = t.accentPrimary; }}
              onMouseLeave={e => { e.target.style.background = "none"; e.target.style.borderColor = `${t.accentPrimary}44`; }}
            >
              About me
            </button>
          </div>
        </StaggerGroup>
      </section>

      {/* Stats bar */}
      <section ref={statsRef} style={{
        padding: "40px 32px", background: t.bgElevated,
        borderTop: `1px solid ${t.neutral100}`, borderBottom: `1px solid ${t.neutral100}`,
        transition: "background 0.4s ease",
      }}>
        <div style={{
          maxWidth: 1080, margin: "0 auto",
          display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 24,
          textAlign: "center",
        }}>
          {[
            { n: 16, s: "+", label: "Years of experience" },
            { n: 20, s: "+", label: "Brands designed for" },
            { n: 3, s: "", label: "Published papers" },
            { n: 6, s: "", label: "Companies" },
          ].map((stat, i) => (
            <div key={i} style={{
              opacity: statsVis ? 1 : 0,
              transition: `opacity 0.5s ease ${i * 150}ms`,
            }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: t.accentPrimaryText }}>
                <AnimCounter end={stat.n} suffix={stat.s} visible={statsVis} />
              </div>
              <div style={{ fontSize: 13, color: t.textMd, marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured work */}
      <section ref={workRef} style={{ padding: "80px 32px", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{
          fontSize: 13, fontWeight: 500, letterSpacing: "2px", color: t.accentPrimaryText,
          textTransform: "uppercase", marginBottom: 12,
          opacity: workVis ? 1 : 0, transition: "opacity 0.5s ease",
        }}>Selected Work</div>
        <h2 style={{
          fontSize: 36, fontWeight: 700, color: t.textFull, margin: "0 0 48px 0",
          opacity: workVis ? 1 : 0, transform: workVis ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16,1,0.3,1) 100ms",
        }}>Case Studies</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340, 1fr))",
          gap: 28,
        }}>
          {caseStudies.map((cs, i) => (
            <CaseStudyCard key={cs.id} {...cs} t={t} index={i} visible={workVis}
              onClick={() => navigate("work")} />
          ))}
        </div>
      </section>

      {/* Brief about */}
      <section ref={introRef} style={{
        padding: "80px 32px", background: t.bgElevated,
        borderTop: `1px solid ${t.neutral100}`,
        transition: "background 0.4s ease",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <StaggerGroup visible={introVis} stagger={150}>
            <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: "2px", color: t.accentPrimaryText, textTransform: "uppercase", marginBottom: 12 }}>About</div>
            <h2 style={{ fontSize: 30, fontWeight: 700, color: t.textFull, margin: "0 0 20px 0", lineHeight: 1.3 }}>
              I grew up in Manaus, in the Brazilian Amazon, studying industrial design and falling in love with how objects and interfaces shape the way people think.
            </h2>
            <p style={{ fontSize: 16, color: t.textMd, lineHeight: 1.7 }}>
              That curiosity took me from academia to the classroom — three years as a professor of design — and then to Stockholm, into the deep end of European iGaming. Today I lead research-driven design across regulated, high-stakes digital products.
            </p>
            <button
              onClick={() => navigate("about")}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: t.accentPrimaryText, fontSize: 15, fontWeight: 500,
                padding: 0, marginTop: 20,
                fontFamily: "Roboto, system-ui, sans-serif",
              }}
            >
              Read my full story &rarr;
            </button>
          </StaggerGroup>
        </div>
      </section>
    </>
  );

  // ─── WORK PAGE ─────────────────────
  const WorkPage = () => {
    const [wkRef, wkVis] = useScrollReveal(0.05);
    return (
      <section ref={wkRef} style={{ padding: "80px 32px", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{
          opacity: wkVis ? 1 : 0, transform: wkVis ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: "2px", color: t.accentPrimaryText, textTransform: "uppercase", marginBottom: 12 }}>Work</div>
          <h1 style={{ fontSize: 48, fontWeight: 700, color: t.textFull, margin: "0 0 16px 0" }}>Selected Work</h1>
          <p style={{ fontSize: 18, color: t.textMd, maxWidth: 600, lineHeight: 1.6, marginBottom: 48 }}>
            Research-led design across regulated iGaming, health tech, and emerging technology.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
          {caseStudies.map((cs, i) => (
            <CaseStudyCard key={cs.id} {...cs} t={t} index={i} visible={wkVis} onClick={() => {}} />
          ))}
        </div>
      </section>
    );
  };

  // ─── ABOUT PAGE ────────────────────
  const AboutPage = () => {
    const [abRef, abVis] = useScrollReveal(0.05);
    const [tlRef, tlVis] = useScrollReveal(0.1);
    const [vlRef, vlVis] = useScrollReveal(0.1);
    return (
      <>
        {/* Story */}
        <section ref={abRef} style={{ padding: "80px 32px", maxWidth: 680, margin: "0 auto" }}>
          <StaggerGroup visible={abVis} stagger={150}>
            <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: "2px", color: t.accentPrimaryText, textTransform: "uppercase" }}>My Story</div>
            <h1 style={{ fontSize: 40, fontWeight: 700, color: t.textFull, margin: "16px 0 28px 0", lineHeight: 1.2 }}>
              From Manaus to Stockholm — designing at the intersection of research, regulation, and real users.
            </h1>
            <p style={{ fontSize: 17, color: t.textHi, lineHeight: 1.8, margin: 0 }}>
              I grew up in Manaus, in the Brazilian Amazon, studying industrial design and falling in love with how objects and interfaces shape the way people think. That curiosity took me from a bachelor's and postgraduate in design to a master's focused on digital artifacts — and then into the classroom, where I spent three years as a professor of design, teaching interaction and mentoring the next generation of Brazilian designers.
            </p>
            <p style={{ fontSize: 17, color: t.textHi, lineHeight: 1.8, margin: "20px 0 0 0" }}>
              In 2018 I moved to Stockholm and landed in the deep end of European iGaming — one of the most regulated, fastest-moving digital product environments on the planet. Over the past eight years I've designed sign-up flows that satisfied gambling regulators and still converted, built design systems that scaled across 20+ brands, and shipped a live casino product powered by AI-cloned dealers from a greenfield brief to commercial launch.
            </p>
            <p style={{ fontSize: 17, color: t.textHi, lineHeight: 1.8, margin: "20px 0 0 0" }}>
              What connects all of it: I lead with research, I design inside constraints, and I believe the system you leave behind matters more than the screens you ship. I've published peer-reviewed work on design heuristics, led teams of 4–12, and built products across iGaming, health tech, and e-commerce that have reached players and patients across Europe and Latin America.
            </p>
            <p style={{ fontSize: 17, color: t.textHi, lineHeight: 1.8, margin: "20px 0 0 0" }}>
              Today I'm a Senior UX/UI Designer & Researcher based in Stockholm — bilingual in English and Portuguese, holding dual Swedish–Brazilian citizenship, and always looking for the next hard problem worth solving.
            </p>
            <button style={{
              background: t.accentPrimary, color: "#fff",
              border: "none", borderRadius: 8, padding: "12px 28px",
              fontSize: 14, fontWeight: 500, cursor: "pointer", marginTop: 28,
              transition: "transform 0.2s ease",
            }}
              onMouseEnter={e => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.target.style.transform = "translateY(0)"}
            >
              ↓ Download Resume (PDF)
            </button>
          </StaggerGroup>
        </section>

        {/* Timeline */}
        <section ref={tlRef} style={{
          padding: "80px 32px", background: t.bgElevated,
          borderTop: `1px solid ${t.neutral100}`,
          transition: "background 0.4s ease",
        }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <h2 style={{
              fontSize: 28, fontWeight: 700, color: t.textFull, marginBottom: 40,
              opacity: tlVis ? 1 : 0, transition: "opacity 0.5s ease",
            }}>Experience</h2>
            {experience.map((exp, i) => (
              <TimelineItem key={i} {...exp} t={t} index={i} visible={tlVis} />
            ))}
          </div>
        </section>

        {/* Values */}
        <section ref={vlRef} style={{ padding: "80px 32px", maxWidth: 1080, margin: "0 auto" }}>
          <h2 style={{
            fontSize: 28, fontWeight: 700, color: t.textFull, marginBottom: 40,
            textAlign: "center",
            opacity: vlVis ? 1 : 0, transition: "opacity 0.5s ease",
          }}>What I believe</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {values.map((v, i) => <ValueCard key={i} {...v} t={t} index={i} visible={vlVis} />)}
          </div>
        </section>
      </>
    );
  };

  // ─── CONTACT PAGE ──────────────────
  const ContactPage = () => {
    const [ctRef, ctVis] = useScrollReveal(0.1);
    return (
      <section ref={ctRef} style={{
        padding: "80px 32px", maxWidth: 560, margin: "0 auto", minHeight: "60vh",
      }}>
        <StaggerGroup visible={ctVis} stagger={150}>
          <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: "2px", color: t.accentPrimaryText, textTransform: "uppercase" }}>Contact</div>
          <h1 style={{ fontSize: 40, fontWeight: 700, color: t.textFull, margin: "16px 0 12px 0" }}>Let's talk</h1>
          <p style={{ fontSize: 17, color: t.textMd, lineHeight: 1.7, marginBottom: 40 }}>
            Open to senior design roles, contract work, and interesting problems. Based in Stockholm, available globally.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { label: "Email", value: "raisapierre@gmail.com", href: "mailto:raisapierre@gmail.com" },
              { label: "LinkedIn", value: "linkedin.com/in/raisapierre", href: "https://linkedin.com/in/raisapierre" },
              { label: "Location", value: "Stockholm, Sweden", href: null },
            ].map((item, i) => (
              <div key={i} style={{
                background: t.bgElevated, borderRadius: 12, padding: "20px 24px",
                border: `1px solid ${t.neutral100}`,
                display: "flex", justifyContent: "space-between", alignItems: "center",
                transition: "border-color 0.3s ease",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = t.accentPrimary + "44"}
                onMouseLeave={e => e.currentTarget.style.borderColor = t.neutral100}
              >
                <div>
                  <div style={{ fontSize: 12, color: t.textLo, marginBottom: 4, fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase" }}>{item.label}</div>
                  <div style={{ fontSize: 16, color: t.textFull, fontWeight: 500 }}>{item.value}</div>
                </div>
                {item.href && (
                  <span style={{ color: t.accentPrimaryText, fontSize: 20 }}>&rarr;</span>
                )}
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 40, padding: "16px 20px",
            background: `${t.accentSecondary}11`,
            border: `1px solid ${t.accentSecondary}33`,
            borderRadius: 8,
          }}>
            <span style={{ color: t.accentSecondary, fontWeight: 500, fontSize: 14 }}>
              ● Open to opportunities
            </span>
          </div>
        </StaggerGroup>
      </section>
    );
  };

  // ─── Render ────────────────────────
  const pages = { home: HomePage, work: WorkPage, about: AboutPage, contact: ContactPage };
  const CurrentPage = pages[page] || HomePage;

  return (
    <div style={{
      fontFamily: "Roboto, system-ui, -apple-system, sans-serif",
      background: t.bgPrimary, minHeight: "100vh",
      transition: "background 0.5s ease, color 0.5s ease",
      color: t.textHi,
    }}>
      <Nav />
      <PageTransition pageKey={page}>
        <CurrentPage />
      </PageTransition>
      <Footer />
    </div>
  );
}