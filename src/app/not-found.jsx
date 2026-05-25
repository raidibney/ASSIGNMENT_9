"use client";

import Link from "next/link";

function PawIcon({ className, style }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <circle cx="5.5" cy="7" r="2.5" />
      <circle cx="18.5" cy="7" r="2.5" />
      <circle cx="2.5" cy="13" r="2.5" />
      <circle cx="21.5" cy="13" r="2.5" />
      <path d="M12 10c-3.87 0-7 2.69-7 6 0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3 0-3.31-3.13-6-7-6z" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function Moon() {
  return (
    <div style={{ position: "absolute", top: 32, right: 60, animation: "moonBob 5s ease-in-out infinite" }}>
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="22" fill="#2a2a1a" stroke="#FAC775" strokeWidth="1" />
        <circle cx="26" cy="26" r="20" fill="#FAC775" opacity="0.15" />
        <path d="M 36 10 A 20 20 0 1 0 36 42 A 14 14 0 1 1 36 10 Z" fill="#0e0e1a" />
        <circle cx="20" cy="20" r="2" fill="rgba(250,199,117,.2)" />
        <circle cx="30" cy="32" r="1.5" fill="rgba(250,199,117,.15)" />
      </svg>
    </div>
  );
}

function Cloud({ style }) {
  return (
    <div style={{ position: "absolute", opacity: 0.07, ...style }} aria-hidden="true">
      <svg width="90" height="36" viewBox="0 0 90 36">
        <ellipse cx="45" cy="28" rx="42" ry="12" fill="#fff" />
        <ellipse cx="30" cy="22" rx="22" ry="16" fill="#fff" />
        <ellipse cx="58" cy="20" rx="18" ry="14" fill="#fff" />
      </svg>
    </div>
  );
}

const STARS = [
  { w: 2, top: "8%",  left: "12%", anim: "twinkle1 2.1s infinite" },
  { w: 1, top: "14%", left: "28%", anim: "twinkle2 3s infinite .4s" },
  { w: 2, top: "6%",  left: "45%", anim: "twinkle3 2.5s infinite .8s" },
  { w: 1, top: "18%", left: "60%", anim: "twinkle1 1.8s infinite .2s" },
  { w: 2, top: "10%", left: "72%", anim: "twinkle2 2.7s infinite 1s" },
  { w: 1, top: "22%", left: "85%", anim: "twinkle3 3.2s infinite .6s" },
  { w: 2, top: "30%", left: "5%",  anim: "twinkle1 2.3s infinite 1.2s" },
  { w: 1, top: "35%", left: "92%", anim: "twinkle2 2.9s infinite .3s" },
  { w: 2, top: "5%",  left: "38%", anim: "twinkle3 1.9s infinite .9s" },
  { w: 1, top: "25%", left: "55%", anim: "twinkle1 3.1s infinite .5s" },
  { w: 2, top: "12%", left: "80%", anim: "twinkle2 2.4s infinite 1.4s" },
  { w: 1, top: "40%", left: "18%", anim: "twinkle3 2.6s infinite .7s" },
];

const BUILDINGS = [
  { w: 40,  h: 90,  wins: ["on","off","on"] },
  { w: 55,  h: 130, wins: ["on","off","on","off","on"] },
  { w: 35,  h: 70,  wins: ["off","on"] },
  { w: 70,  h: 160, wins: ["on","off","on","off","on","off","on"] },
  { w: 42,  h: 100, wins: ["off","on","off","on"] },
  { w: 38,  h: 80,  wins: ["on","off","on"] },
];

const CHIPS = [
  { color: "#FAC775", label: "142 dogs" },
  { color: "#D4537E", label: "89 cats" },
  { color: "#5DCAA5", label: "34 others" },
];

const FOOTER_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/all-pets",  label: "All pets" },
  { href: "/contact",   label: "Contact" },
  { href: "/help",      label: "Help" },
];

export default function NotFound() {
  return (
    <>
      <style>{`
        @keyframes twinkle1 { 0%,100%{opacity:.9} 50%{opacity:.2} }
        @keyframes twinkle2 { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes twinkle3 { 0%,100%{opacity:.7} 40%{opacity:.1} }
        @keyframes floatCat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes tailWag  { 0%,100%{transform:rotate(-20deg)} 50%{transform:rotate(20deg)} }
        @keyframes eyeGlow  { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes sweep    { 0%{transform:rotate(-35deg)} 100%{transform:rotate(35deg)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes moonBob  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes cloudDrift { 0%{transform:translateX(0)} 100%{transform:translateX(18px)} }
        @keyframes blink2   { 0%,85%,100%{transform:scaleY(1)} 90%{transform:scaleY(0.05)} }

        .nf-cat-wrap   { animation: floatCat 3s ease-in-out infinite; }
        .nf-tail       { animation: tailWag 1.8s ease-in-out infinite; transform-origin: 10px 72px; }
        .nf-eyes       { animation: blink2 5s ease-in-out infinite; transform-origin: 55px 40px; }
        .nf-eye-l      { animation: eyeGlow 3s ease-in-out infinite; }
        .nf-eye-r      { animation: eyeGlow 3s ease-in-out infinite .5s; }
        .nf-spotlight  { animation: sweep 4s ease-in-out infinite alternate; transform-origin: bottom center; }
        .nf-cloud1     { animation: cloudDrift 8s ease-in-out infinite alternate; }
        .nf-cloud2     { animation: cloudDrift 11s ease-in-out infinite alternate-reverse; }
        .nf-content    { animation: fadeUp .7s ease both .1s; opacity: 0; }
        .nf-btn-p:hover { background: #EF9F27 !important; transform: translateY(-2px); }
        .nf-btn-o:hover { background: rgba(255,255,255,.1) !important; transform: translateY(-2px); }
        .nf-footer a:hover { color: #FAC775 !important; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#0e0e1a",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "2.5rem 1rem 2rem",
        position: "relative", overflow: "hidden",
        fontFamily: "inherit",
      }}>

        {/* stars */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
          {STARS.map((s, i) => (
            <div key={i} style={{
              position: "absolute",
              width: s.w, height: s.w,
              top: s.top, left: s.left,
              borderRadius: "50%",
              background: "#fff",
              animation: s.anim,
            }} />
          ))}
        </div>

        {/* moon */}
        <Moon />

        {/* clouds */}
        <Cloud style={{ top: "18%", left: "5%", animation: "cloudDrift 8s ease-in-out infinite alternate" }} />
        <Cloud style={{ top: "10%", right: "8%", animation: "cloudDrift 11s ease-in-out infinite alternate-reverse" }} />

        {/* spotlight */}
        <div style={{
          position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: 340, height: 340, pointerEvents: "none", overflow: "visible",
        }} aria-hidden="true">
          <div className="nf-spotlight" style={{
            position: "absolute", bottom: 0, left: "50%", marginLeft: -90,
            width: 0, height: 0,
            borderLeft: "90px solid transparent",
            borderRight: "90px solid transparent",
            borderBottom: "300px solid rgba(255,220,80,0.045)",
          }} />
        </div>

        {/* rooftop + cat */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }} aria-hidden="true">
          {/* buildings */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: -2 }}>
            {BUILDINGS.map((b, i) => (
              <div key={i} style={{
                width: b.w, height: b.h,
                background: "#1a1a2e",
                borderRadius: "3px 3px 0 0",
                borderTop: "1px solid #2a2a4a",
              }}>
                {b.wins.map((w, j) => (
                  <div key={j} style={{
                    width: 5, height: 5, borderRadius: 1, margin: "4px auto",
                    background: w === "on" ? "#FAC775" : "#2a2a4a",
                    opacity: w === "on" ? 0.7 : 1,
                  }} />
                ))}
              </div>
            ))}
          </div>

          {/* ledge */}
          <div style={{
            width: 260, height: 10,
            background: "#1e1e35",
            borderRadius: "3px 3px 0 0",
            borderTop: "1.5px solid #2e2e55",
          }} />

          {/* cat */}
          <div className="nf-cat-wrap" style={{ position: "relative", display: "inline-block", marginBottom: -4 }}>
            <svg width="110" height="90" viewBox="0 0 110 90" style={{ overflow: "visible" }}>
              {/* tail */}
              <g className="nf-tail">
                <path d="M10 72 Q-8 55 5 40" stroke="#D4537E" strokeWidth="8" fill="none" strokeLinecap="round" />
              </g>
              {/* body */}
              <ellipse cx="55" cy="68" rx="30" ry="22" fill="#2a2a3e" />
              <ellipse cx="55" cy="68" rx="24" ry="16" fill="#323255" />
              {/* head */}
              <ellipse cx="55" cy="40" rx="22" ry="20" fill="#2a2a3e" />
              {/* ears */}
              <polygon points="38,26 33,10 44,24" fill="#2a2a3e" />
              <polygon points="72,26 77,10 66,24" fill="#2a2a3e" />
              <polygon points="39,25 35,14 45,24" fill="#D4537E" opacity="0.5" />
              <polygon points="71,25 75,14 65,24" fill="#D4537E" opacity="0.5" />
              {/* eyes */}
              <g className="nf-eyes">
                <ellipse cx="45" cy="40" rx="6" ry="7" fill="#FAC775" className="nf-eye-l" />
                <ellipse cx="65" cy="40" rx="6" ry="7" fill="#FAC775" className="nf-eye-r" />
              </g>
              <ellipse cx="45" cy="40" rx="3" ry="5" fill="#1a1a2e" />
              <ellipse cx="65" cy="40" rx="3" ry="5" fill="#1a1a2e" />
              <circle cx="46" cy="38" r="1" fill="white" opacity="0.8" />
              <circle cx="66" cy="38" r="1" fill="white" opacity="0.8" />
              {/* nose */}
              <ellipse cx="55" cy="47" rx="4" ry="3" fill="#D4537E" opacity="0.7" />
              {/* whiskers */}
              <line x1="30" y1="44" x2="48" y2="47" stroke="rgba(255,255,255,.3)" strokeWidth="0.8" />
              <line x1="30" y1="48" x2="48" y2="49" stroke="rgba(255,255,255,.3)" strokeWidth="0.8" />
              <line x1="62" y1="47" x2="80" y2="44" stroke="rgba(255,255,255,.3)" strokeWidth="0.8" />
              <line x1="62" y1="49" x2="80" y2="48" stroke="rgba(255,255,255,.3)" strokeWidth="0.8" />
              {/* paws */}
              <rect x="40" y="82" width="10" height="8" rx="3" fill="#1e1e35" />
              <rect x="60" y="82" width="10" height="8" rx="3" fill="#1e1e35" />
            </svg>
          </div>
        </div>

        {/* content */}
        <div className="nf-content" style={{
          position: "relative", zIndex: 3,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem",
          textAlign: "center", maxWidth: 400,
        }}>

          {/* badge */}
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(250,199,117,.12)", color: "#FAC775",
            border: "1px solid rgba(250,199,117,.25)",
            borderRadius: 999, padding: "4px 14px",
            fontSize: 11, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase",
          }}>
            <PawIcon style={{ width: 12, height: 12 }} />
            Up on the rooftop
          </span>

          {/* headline */}
          <h1 style={{ fontSize: 36, fontWeight: 500, lineHeight: 1.15, color: "#f0f0fa", letterSpacing: "-.02em" }}>
            <span style={{ color: "#FAC775" }}>404</span> — page<br />went missing
          </h1>

          {/* subtext */}
          <p style={{ fontSize: 13, color: "rgba(200,200,230,.6)", lineHeight: 1.7, maxWidth: 300 }}>
            Like a cat on a midnight rooftop, this page has vanished into the dark. It may have been rehomed, renamed, or never existed at all.
          </p>

          {/* counter card */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14, width: "100%",
            background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 12, padding: "10px 18px",
          }}>
            <span style={{ fontSize: 11, color: "rgba(200,200,230,.4)", marginRight: "auto" }}>
              Pets waiting for you tonight
            </span>
            {CHIPS.map((c) => (
              <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "rgba(200,200,230,.55)" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.color }} />
                {c.label}
              </div>
            ))}
          </div>

          {/* buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            <Link href="/" className="nf-btn-p" style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "#FAC775", color: "#412402",
              border: "none", borderRadius: 999,
              padding: "11px 22px", fontSize: 13, fontWeight: 500,
              textDecoration: "none", transition: "background .2s, transform .15s",
            }}>
              <ArrowLeftIcon />
              Back to home
            </Link>
            <Link href="/all-pets" className="nf-btn-o" style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "rgba(255,255,255,.06)", color: "rgba(220,220,250,.8)",
              border: "1px solid rgba(255,255,255,.12)", borderRadius: 999,
              padding: "11px 22px", fontSize: 13, fontWeight: 500,
              textDecoration: "none", transition: "background .2s, transform .15s",
            }}>
              <PawIcon style={{ width: 14, height: 14 }} />
              Browse pets
            </Link>
          </div>

          {/* footer links */}
          <div className="nf-footer" style={{
            display: "flex", alignItems: "center", gap: 12,
            paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,.07)",
            fontSize: 12, color: "rgba(200,200,230,.35)",
          }}>
            {FOOTER_LINKS.map((l, i, arr) => (
              <span key={l.href} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Link href={l.href} style={{ color: "rgba(200,200,230,.35)", textDecoration: "none", transition: "color .15s" }}>
                  {l.label}
                </Link>
                {i < arr.length - 1 && <span aria-hidden="true">·</span>}
              </span>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
