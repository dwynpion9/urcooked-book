import { useEffect, useState } from "react";

export function AnimatedBear({ size = 120 }: { size?: number }) {
  const [wave, setWave] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWave(true);
      setTimeout(() => setWave(false), 1400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cooking bear mascot"
    >
      {/* ── Chef Toque ── */}
      <rect x="68" y="28" width="64" height="8" rx="4" fill="#e0d8c8" />
      <rect x="72" y="20" width="56" height="12" rx="6" fill="#f0ece2" />
      <ellipse cx="100" cy="16" rx="26" ry="10" fill="#fff" />
      <ellipse cx="82" cy="20" rx="12" ry="8" fill="#f8f4ee" />
      <ellipse cx="118" cy="20" rx="12" ry="8" fill="#f8f4ee" />
      <ellipse cx="100" cy="14" rx="18" ry="8" fill="#fff" />

      {/* ── Ears ── */}
      <circle cx="55" cy="58" r="18" fill="#8B6B47" />
      <circle cx="55" cy="58" r="11" fill="#C4956A" />
      <circle cx="145" cy="58" r="18" fill="#8B6B47" />
      <circle cx="145" cy="58" r="11" fill="#C4956A" />

      {/* ── Head ── */}
      <ellipse cx="100" cy="104" rx="52" ry="48" fill="#8B6B47" />
      <ellipse cx="88" cy="92" rx="18" ry="14" fill="#A07850" opacity="0.35" />

      {/* ── Muzzle ── */}
      <ellipse cx="100" cy="126" rx="28" ry="22" fill="#C4956A" />
      <ellipse cx="100" cy="120" rx="22" ry="14" fill="#D4A87A" opacity="0.5" />

      {/* ── Nose ── */}
      <ellipse cx="100" cy="117" rx="8" ry="5.5" fill="#2a1508" />
      <ellipse cx="98" cy="115" rx="2.5" ry="2" fill="#fff" opacity="0.3" />

      {/* ── Mouth ── */}
      <path d="M90 130 Q100 140 110 130" stroke="#2a1508" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M100 130 L100 136" stroke="#2a1508" strokeWidth="2" strokeLinecap="round" />

      {/* ── Left eye (open) ── */}
      <circle cx="78" cy="96" r="7" fill="#2a1508" />
      <circle cx="80" cy="93" r="2.5" fill="#fff" opacity="0.7" />

      {/* ── Right eye (winking) ── */}
      <path d="M116 96 Q122 90 130 96" stroke="#2a1508" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M116 99 Q122 102 130 99" stroke="#2a1508" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />

      {/* Rosy cheeks */}
      <ellipse cx="68" cy="114" rx="10" ry="7" fill="#e8826a" opacity="0.3" />
      <ellipse cx="132" cy="114" rx="10" ry="7" fill="#e8826a" opacity="0.3" />

      {/* ── Body ── */}
      <ellipse cx="100" cy="185" rx="38" ry="32" fill="#8B6B47" />
      <ellipse cx="100" cy="192" rx="22" ry="18" fill="#C4956A" opacity="0.55" />

      {/* ── Apron ── */}
      <rect x="74" y="150" width="52" height="58" rx="6" fill="#f5f0e8" opacity="0.92" />
      <path d="M74 154 Q60 148 55 158" stroke="#e0d8c8" strokeWidth="4" strokeLinecap="round" />
      <path d="M126 154 Q140 148 145 158" stroke="#e0d8c8" strokeWidth="4" strokeLinecap="round" />
      <line x1="100" y1="150" x2="100" y2="208" stroke="#ddd5c5" strokeWidth="2.5" />
      <rect x="84" y="170" width="32" height="20" rx="4" fill="#ddd5c5" />

      {/* ── Left arm + waving spoon ── */}
      <g
        style={{
          transformOrigin: "48px 160px",
          transition: "transform 0.35s ease",
          transform: wave ? "rotate(-28deg) translateY(-8px)" : "rotate(6deg)",
        }}
      >
        <ellipse cx="48" cy="170" rx="13" ry="18" fill="#8B6B47" transform="rotate(-15 48 170)" />
        {/* wooden spoon */}
        <line x1="28" y1="135" x2="42" y2="168" stroke="#8b5e2a" strokeWidth="4.5" strokeLinecap="round" />
        <ellipse cx="23" cy="127" rx="10" ry="8" fill="#A07040" transform="rotate(-20 23 127)" />
        <ellipse cx="22" cy="126" rx="6" ry="4.5" fill="#8b5e2a" opacity="0.45" transform="rotate(-20 22 126)" />
        <circle cx="24" cy="130" r="0.8" fill="#fff" opacity="0.25" />
      </g>

      {/* ── Right arm (resting) ── */}
      <ellipse cx="152" cy="172" rx="13" ry="18" fill="#8B6B47" transform="rotate(15 152 172)" />

      {/* ── Feet ── */}
      <ellipse cx="82" cy="214" rx="14" ry="8" fill="#7a5a35" />
      <ellipse cx="118" cy="214" rx="14" ry="8" fill="#7a5a35" />
    </svg>
  );
}
