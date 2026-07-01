// Full-color realistic SVG illustrations for cooking ingredients.
// Each function returns JSX SVG with item-accurate colors.
// Falls back to Lucide outline icons for non-food items.

import type { ReactNode } from "react";

interface IconProps {
  size?: number;
  className?: string;
}

// Helper to wrap SVG content
function svg(size: number, children: ReactNode, className?: string, viewBox = "0 0 64 64") {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {children}
    </svg>
  );
}

// --- Food illustrations ---

function CarrotIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M38 18 L50 8 L48 16 L44 18 L38 18 Z" fill="#4a8c2a" />
    <path d="M34 16 L42 6 L40 14 L34 16 Z" fill="#5ba832" />
    <path d="M30 18 L36 8 L34 16 L30 18 Z" fill="#6bc23c" />
    <path d="M20 22 C18 24 16 30 20 38 C24 46 32 52 38 50 C44 48 46 40 42 32 C38 24 28 20 20 22 Z" fill="#e67e22" />
    <path d="M22 24 C20 26 19 30 22 36 C25 42 31 47 36 45" stroke="#d35400" strokeWidth="1.5" fill="none" opacity="0.5" />
    <line x1="26" y1="28" x2="28" y2="30" stroke="#d35400" strokeWidth="1" opacity="0.4" />
    <line x1="30" y1="34" x2="32" y2="36" stroke="#d35400" strokeWidth="1" opacity="0.4" />
    <line x1="34" y1="40" x2="36" y2="42" stroke="#d35400" strokeWidth="1" opacity="0.4" />
  </>, className);
}

function TomatoIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <circle cx="32" cy="36" r="18" fill="#e74c3c" />
    <circle cx="28" cy="32" r="4" fill="#ff6b5a" opacity="0.5" />
    <path d="M24 18 L28 14 L32 18 L36 14 L40 18 L36 22 L28 22 Z" fill="#27ae60" />
    <path d="M30 16 L32 12 L34 16" stroke="#2ecc71" strokeWidth="2" fill="none" />
    <path d="M28 20 L26 16 M34 20 L36 16" stroke="#27ae60" strokeWidth="1.5" />
  </>, className);
}

function PotatoIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <ellipse cx="32" cy="34" rx="18" ry="14" fill="#d4a76a" />
    <ellipse cx="28" cy="30" rx="6" ry="4" fill="#e8c896" opacity="0.5" />
    <circle cx="24" cy="32" r="1.5" fill="#a08050" />
    <circle cx="36" cy="36" r="1.5" fill="#a08050" />
    <circle cx="30" cy="40" r="1" fill="#a08050" />
    <circle cx="38" cy="28" r="1" fill="#a08050" />
  </>, className);
}

function OnionIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M32 12 L30 6 L34 6 Z" fill="#4a8c2a" />
    <path d="M28 8 L26 4 L30 6 Z" fill="#5ba832" />
    <path d="M36 8 L38 4 L34 6 Z" fill="#5ba832" />
    <ellipse cx="32" cy="36" rx="16" ry="18" fill="#f0e6d6" />
    <ellipse cx="32" cy="36" rx="12" ry="14" fill="#e8dcc8" />
    <ellipse cx="32" cy="36" rx="8" ry="10" fill="#ddd0b8" />
    <path d="M32 18 L32 54" stroke="#c8b898" strokeWidth="1" opacity="0.5" />
  </>, className);
}

function GarlicIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M32 10 L30 4 L34 4 Z" fill="#9bc53d" />
    <ellipse cx="32" cy="34" rx="14" ry="18" fill="#f5f0e8" />
    <path d="M32 16 L32 52" stroke="#d8cfc0" strokeWidth="1.5" />
    <path d="M24 22 Q20 34 24 48" stroke="#e0d8c8" strokeWidth="1.5" fill="none" />
    <path d="M40 22 Q44 34 40 48" stroke="#e0d8c8" strokeWidth="1.5" fill="none" />
    <ellipse cx="26" cy="34" rx="5" ry="12" fill="#ede8de" />
    <ellipse cx="38" cy="34" rx="5" ry="12" fill="#ede8de" />
  </>, className);
}

function FishIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M10 32 Q20 18 38 28 Q48 22 54 32 Q48 42 38 36 Q20 46 10 32 Z" fill="#5dade2" />
    <path d="M10 32 Q20 18 38 28 Q48 22 54 32" stroke="#3498db" strokeWidth="1" fill="none" opacity="0.5" />
    <circle cx="44" cy="30" r="2" fill="#2c3e50" />
    <circle cx="45" cy="29" r="0.8" fill="white" />
    <path d="M14 28 L8 22 M16 34 L8 38" stroke="#85c1e9" strokeWidth="1.5" />
  </>, className);
}

function ChickenIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <ellipse cx="32" cy="38" rx="14" ry="18" fill="#e8c870" />
    <ellipse cx="28" cy="34" rx="5" ry="6" fill="#f5dc90" opacity="0.6" />
    <path d="M32 20 L30 14 L34 14 Z" fill="#d4a040" />
    <path d="M26 22 L22 16 L28 18 Z" fill="#d4a040" />
    <path d="M38 22 L42 16 L36 18 Z" fill="#d4a040" />
    <line x1="32" y1="56" x2="30" y2="60" stroke="#c08030" strokeWidth="2" />
    <line x1="34" y1="56" x2="36" y2="60" stroke="#c08030" strokeWidth="2" />
  </>, className);
}

function BeefIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M14 24 Q10 30 14 40 Q18 50 30 52 Q42 54 48 46 Q54 38 50 28 Q46 18 34 18 Q22 18 14 24 Z" fill="#a93226" />
    <path d="M18 28 Q16 34 20 42 Q24 48 32 48" stroke="#c0392b" strokeWidth="2" fill="none" opacity="0.5" />
    <path d="M24 24 Q22 30 26 38" stroke="#922b21" strokeWidth="1.5" fill="none" opacity="0.4" />
    <path d="M38 22 Q42 28 40 38" stroke="#922b21" strokeWidth="1.5" fill="none" opacity="0.4" />
    <circle cx="20" cy="30" r="1" fill="#fff" opacity="0.3" />
    <circle cx="36" cy="34" r="1.5" fill="#fff" opacity="0.3" />
    <circle cx="44" cy="40" r="1" fill="#fff" opacity="0.3" />
  </>, className);
}

function EggIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <ellipse cx="32" cy="36" rx="14" ry="18" fill="#f5f0e0" />
    <ellipse cx="28" cy="30" rx="5" ry="6" fill="#fff" opacity="0.6" />
  </>, className);
}

function MilkIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M24 16 L24 12 L40 12 L40 16 L42 20 L42 54 Q42 58 38 58 L26 58 Q22 58 22 54 L22 20 Z" fill="#f0f4f8" />
    <rect x="24" y="10" width="16" height="4" rx="1" fill="#3498db" />
    <rect x="24" y="28" width="18" height="14" fill="#e8f0f8" />
    <text x="33" y="38" textAnchor="middle" fontSize="8" fill="#2980b9" fontWeight="bold">MILK</text>
  </>, className);
}

function CheeseIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M10 24 L54 24 L50 54 L14 54 Z" fill="#f5c542" />
    <path d="M10 24 L54 24 L50 54 L14 54 Z" stroke="#e0a820" strokeWidth="1" fill="none" />
    <circle cx="22" cy="34" r="2.5" fill="#e8b830" />
    <circle cx="36" cy="40" r="3" fill="#e8b830" />
    <circle cx="28" cy="46" r="2" fill="#e8b830" />
    <circle cx="44" cy="48" r="1.5" fill="#e8b830" />
  </>, className);
}

function AppleIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M32 14 L30 8 L34 8 Z" fill="#6b4423" />
    <path d="M34 12 Q40 8 44 12" stroke="#4a8c2a" strokeWidth="2" fill="none" />
    <path d="M20 28 Q18 20 26 18 Q30 18 32 22 Q34 18 38 18 Q46 20 44 28 Q46 40 38 48 Q32 52 32 48 Q32 52 26 48 Q18 40 20 28 Z" fill="#e74c3c" />
    <ellipse cx="26" cy="26" rx="3" ry="4" fill="#ff6b5a" opacity="0.5" />
  </>, className);
}

function BananaIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M12 20 Q16 14 28 16 Q40 18 50 28 Q54 34 52 40 Q48 36 42 34 Q30 30 22 34 Q14 36 12 20 Z" fill="#f5d420" />
    <path d="M12 20 Q16 14 28 16 Q40 18 50 28" stroke="#e8c810" strokeWidth="1" fill="none" opacity="0.5" />
    <circle cx="50" cy="28" r="2" fill="#6b4423" />
  </>, className);
}

function LemonIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <ellipse cx="32" cy="34" rx="16" ry="14" fill="#f5d420" transform="rotate(-20 32 34)" />
    <ellipse cx="28" cy="30" rx="5" ry="4" fill="#fff5a0" opacity="0.5" transform="rotate(-20 28 30)" />
    <circle cx="18" cy="26" r="1.5" fill="#6b4423" />
    <circle cx="46" cy="42" r="1.5" fill="#6b4423" />
  </>, className);
}

function PepperIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M28 14 L26 8 L30 10 Z" fill="#4a8c2a" />
    <path d="M30 12 Q36 10 40 16 Q44 24 42 36 Q40 48 34 52 Q28 50 28 42 Q28 30 30 12 Z" fill="#e74c3c" />
    <path d="M32 16 Q38 18 40 26" stroke="#c0392b" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M30 12 Q34 8 38 12" stroke="#27ae60" strokeWidth="2" fill="none" />
  </>, className);
}

function BroccoliIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M20 20 Q16 14 22 12 Q26 8 30 12 Q34 6 38 12 Q44 10 44 18 Q48 20 44 26 Q46 32 40 30 Q36 36 30 32 Q24 36 22 30 Q16 32 18 24 Q16 22 20 20 Z" fill="#2ecc71" />
    <circle cx="24" cy="18" r="4" fill="#27ae60" />
    <circle cx="34" cy="16" r="5" fill="#27ae60" />
    <circle cx="40" cy="22" r="4" fill="#27ae60" />
    <circle cx="28" cy="24" r="4" fill="#2ecc71" />
    <rect x="28" y="30" width="8" height="20" rx="2" fill="#a8d88a" />
    <rect x="28" y="30" width="8" height="20" rx="2" fill="#8ec86a" opacity="0.5" />
  </>, className);
}

function MushroomIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M14 28 Q14 14 32 14 Q50 14 50 28 Q50 32 46 32 L18 32 Q14 32 14 28 Z" fill="#a0522d" />
    <circle cx="22" cy="22" r="3" fill="#d4a070" />
    <circle cx="34" cy="18" r="4" fill="#d4a070" />
    <circle cx="42" cy="24" r="2.5" fill="#d4a070" />
    <rect x="26" y="32" width="12" height="20" rx="3" fill="#f5f0e0" />
    <ellipse cx="30" cy="36" rx="4" ry="2" fill="#e8e0d0" opacity="0.5" />
  </>, className);
}

function CornIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M24 10 L28 6 L32 10 L36 6 L40 10 L36 14 L28 14 Z" fill="#4a8c2a" />
    <ellipse cx="32" cy="36" rx="10" ry="22" fill="#f5d420" />
    <g fill="#e8c810">
      <circle cx="28" cy="22" r="1.5" /><circle cx="32" cy="22" r="1.5" /><circle cx="36" cy="22" r="1.5" />
      <circle cx="28" cy="28" r="1.5" /><circle cx="32" cy="28" r="1.5" /><circle cx="36" cy="28" r="1.5" />
      <circle cx="28" cy="34" r="1.5" /><circle cx="32" cy="34" r="1.5" /><circle cx="36" cy="34" r="1.5" />
      <circle cx="28" cy="40" r="1.5" /><circle cx="32" cy="40" r="1.5" /><circle cx="36" cy="40" r="1.5" />
      <circle cx="28" cy="46" r="1.5" /><circle cx="32" cy="46" r="1.5" /><circle cx="36" cy="46" r="1.5" />
    </g>
  </>, className);
}

function RiceIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M16 30 Q16 18 32 18 Q48 18 48 30 L48 50 Q48 54 44 54 L20 54 Q16 54 16 50 Z" fill="#f5f0e0" />
    <ellipse cx="32" cy="30" rx="14" ry="4" fill="#e8e0d0" />
    <g fill="#fff">
      <ellipse cx="24" cy="34" rx="1.5" ry="3" /><ellipse cx="30" cy="36" rx="1.5" ry="3" />
      <ellipse cx="36" cy="34" rx="1.5" ry="3" /><ellipse cx="40" cy="38" rx="1.5" ry="3" />
      <ellipse cx="28" cy="40" rx="1.5" ry="3" /><ellipse cx="34" cy="42" rx="1.5" ry="3" />
      <ellipse cx="38" cy="44" rx="1.5" ry="3" /><ellipse cx="26" cy="44" rx="1.5" ry="3" />
      <ellipse cx="32" cy="46" rx="1.5" ry="3" />
    </g>
  </>, className);
}

function BreadIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M12 28 Q12 18 32 18 Q52 18 52 28 L52 44 Q52 48 48 48 L16 48 Q12 48 12 44 Z" fill="#d4a050" />
    <path d="M12 28 Q12 18 32 18 Q52 18 52 28" stroke="#c08030" strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M20 24 L24 28 M32 22 L36 26 M44 24 L48 28" stroke="#c08030" strokeWidth="1.5" opacity="0.4" />
    <ellipse cx="32" cy="24" rx="3" ry="2" fill="#e8c870" opacity="0.5" />
  </>, className);
}

function WineIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M24 10 L40 10 L40 24 Q40 32 32 34 Q24 32 24 24 Z" fill="#8b0000" />
    <path d="M24 10 L40 10 L40 18 Q40 24 32 26 Q24 24 24 18 Z" fill="#a01010" opacity="0.5" />
    <rect x="31" y="34" width="2" height="18" fill="#e8e0d0" />
    <ellipse cx="32" cy="54" rx="8" ry="2" fill="#e8e0d0" />
  </>, className);
}

function CoffeeIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M16 20 L16 44 Q16 50 22 50 L38 50 Q44 50 44 44 L44 20 Z" fill="#f5f0e0" />
    <path d="M44 26 Q50 26 50 32 Q50 38 44 38" stroke="#f5f0e0" strokeWidth="3" fill="none" />
    <ellipse cx="30" cy="20" rx="14" ry="3" fill="#4a2c20" />
    <path d="M22 14 Q22 10 24 10 M30 14 Q30 8 32 8 M38 14 Q38 10 40 10" stroke="#d4c8b0" strokeWidth="1.5" fill="none" />
  </>, className);
}

function WaterIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M32 8 Q20 28 20 40 Q20 52 32 52 Q44 52 44 40 Q44 28 32 8 Z" fill="#5dade2" />
    <path d="M32 8 Q20 28 20 40 Q20 52 32 52" stroke="#3498db" strokeWidth="1" fill="none" opacity="0.4" />
    <ellipse cx="28" cy="36" rx="4" ry="6" fill="#85c1e9" opacity="0.5" />
  </>, className);
}

function OilIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M22 14 L22 10 L42 10 L42 14 L44 18 L44 54 Q44 56 42 56 L22 56 Q20 56 20 54 L20 18 Z" fill="#f5d420" opacity="0.8" />
    <rect x="22" y="12" width="20" height="3" fill="#d4a020" />
    <rect x="24" y="30" width="16" height="12" fill="#e8c810" opacity="0.5" />
    <text x="32" y="38" textAnchor="middle" fontSize="6" fill="#a08010" fontWeight="bold">OIL</text>
  </>, className);
}

function SaltIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M20 18 L20 14 L44 14 L44 18 L46 22 L46 52 Q46 54 44 54 L20 54 Q18 54 18 52 L18 22 Z" fill="#f5f0e0" />
    <rect x="20" y="14" width="24" height="4" rx="1" fill="#d0c8b8" />
    <circle cx="26" cy="14" r="0.8" fill="#a0a0a0" />
    <circle cx="32" cy="14" r="0.8" fill="#a0a0a0" />
    <circle cx="38" cy="14" r="0.8" fill="#a0a0a0" />
    <g fill="#e8e0d0">
      <circle cx="26" cy="34" r="1" /><circle cx="32" cy="36" r="1" /><circle cx="38" cy="34" r="1" />
      <circle cx="28" cy="42" r="1" /><circle cx="36" cy="42" r="1" /><circle cx="32" cy="46" r="1" />
    </g>
  </>, className);
}

function SugarIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M20 18 L20 14 L44 14 L44 18 L46 22 L46 52 Q46 54 44 54 L20 54 Q18 54 18 52 L18 22 Z" fill="#fff" />
    <rect x="20" y="14" width="24" height="4" rx="1" fill="#e0d8c8" />
    <g fill="#f8f4e8">
      <rect x="24" y="28" width="6" height="6" rx="1" /><rect x="34" y="28" width="6" height="6" rx="1" />
      <rect x="24" y="38" width="6" height="6" rx="1" /><rect x="34" y="38" width="6" height="6" rx="1" />
    </g>
  </>, className);
}

function PotIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M10 24 L54 24 L52 52 Q52 54 50 54 L14 54 Q12 54 12 52 Z" fill="#7f8c8d" />
    <rect x="8" y="22" width="48" height="4" rx="1" fill="#95a5a6" />
    <ellipse cx="32" cy="24" rx="22" ry="3" fill="#636e72" />
    <path d="M10 24 L8 18 M54 24 L56 18" stroke="#7f8c8d" strokeWidth="3" strokeLinecap="round" />
    <path d="M20 24 Q22 16 24 24 M32 24 Q34 14 36 24 M44 24 Q46 18 48 24" stroke="#e8c870" strokeWidth="1.5" fill="none" opacity="0.6" />
  </>, className);
}

function LeafIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M32 10 Q18 14 16 30 Q16 46 32 52 Q48 46 48 30 Q46 14 32 10 Z" fill="#27ae60" />
    <path d="M32 10 L32 52" stroke="#229954" strokeWidth="1.5" />
    <path d="M32 20 L24 18 M32 28 L22 26 M32 36 L24 34 M32 44 L24 42" stroke="#229954" strokeWidth="1" opacity="0.5" />
    <path d="M32 20 L40 18 M32 28 L42 26 M32 36 L40 34 M32 44 L40 42" stroke="#229954" strokeWidth="1" opacity="0.5" />
  </>, className);
}

function ChiliIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M28 12 L26 6 L30 8 Z" fill="#4a8c2a" />
    <path d="M30 10 Q34 8 38 14 Q42 22 44 34 Q44 46 38 50 Q32 48 32 40 Q32 26 30 10 Z" fill="#e74c3c" />
    <path d="M34 14 Q38 18 40 28" stroke="#c0392b" strokeWidth="1.5" fill="none" opacity="0.5" />
  </>, className);
}

function CakeIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M12 30 L52 30 L52 50 Q52 52 50 52 L14 52 Q12 52 12 50 Z" fill="#f5dcc8" />
    <path d="M12 30 L52 30 L52 36 L12 36 Z" fill="#e8a060" />
    <circle cx="20" cy="33" r="2" fill="#e74c3c" />
    <circle cx="32" cy="33" r="2" fill="#e74c3c" />
    <circle cx="44" cy="33" r="2" fill="#e74c3c" />
    <path d="M20 24 L20 30 M28 22 L28 30 M36 24 L36 30 M44 22 L44 30" stroke="#f5d420" strokeWidth="2" />
    <circle cx="20" cy="22" r="1.5" fill="#ff6b5a" />
    <circle cx="28" cy="20" r="1.5" fill="#ff6b5a" />
    <circle cx="36" cy="22" r="1.5" fill="#ff6b5a" />
    <circle cx="44" cy="20" r="1.5" fill="#ff6b5a" />
  </>, className);
}

function CookieIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <circle cx="32" cy="34" r="18" fill="#d4a050" />
    <circle cx="26" cy="28" r="2.5" fill="#6b4423" />
    <circle cx="36" cy="30" r="2" fill="#6b4423" />
    <circle cx="30" cy="38" r="2.5" fill="#6b4423" />
    <circle cx="40" cy="40" r="2" fill="#6b4423" />
    <circle cx="24" cy="38" r="1.5" fill="#6b4423" />
    <circle cx="38" cy="24" r="1.5" fill="#6b4423" />
  </>, className);
}

function SoupIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M10 26 L54 26 L52 50 Q52 52 50 52 L14 52 Q12 52 12 50 Z" fill="#e8c870" />
    <ellipse cx="32" cy="26" rx="22" ry="3" fill="#d4a040" />
    <ellipse cx="32" cy="26" rx="18" ry="2" fill="#f5d420" opacity="0.6" />
    <circle cx="26" cy="24" r="1.5" fill="#e74c3c" opacity="0.7" />
    <circle cx="36" cy="24" r="1.5" fill="#27ae60" opacity="0.7" />
    <path d="M22 22 Q22 18 24 18 M32 20 Q32 16 34 16 M42 22 Q42 18 44 18" stroke="#e8c870" strokeWidth="1" fill="none" opacity="0.5" />
  </>, className);
}

function UtensilsIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M20 10 L20 30 M16 10 L16 20 Q16 24 20 24 M24 10 L24 20 Q24 24 20 24" stroke="#bdc3c7" strokeWidth="2" fill="none" />
    <path d="M20 30 L20 54" stroke="#bdc3c7" strokeWidth="2" />
    <path d="M40 10 Q36 10 36 18 Q36 24 40 26 L40 54" stroke="#bdc3c7" strokeWidth="2" fill="none" />
    <path d="M40 10 Q44 10 44 18 Q44 24 40 26" stroke="#bdc3c7" strokeWidth="2" fill="none" />
  </>, className);
}

function ChefHatIcon({ size = 24, className }: IconProps) {
  return svg(size, <>
    <path d="M20 30 Q14 30 14 36 Q14 42 20 42 L44 42 Q50 42 50 36 Q50 30 44 30 Q44 20 36 20 Q34 14 28 16 Q22 14 20 30 Z" fill="#f5f0e0" />
    <rect x="18" y="42" width="28" height="8" rx="2" fill="#e8e0d0" />
    <line x1="22" y1="44" x2="22" y2="48" stroke="#d0c8b8" strokeWidth="1" />
    <line x1="28" y1="44" x2="28" y2="48" stroke="#d0c8b8" strokeWidth="1" />
    <line x1="34" y1="44" x2="34" y2="48" stroke="#d0c8b8" strokeWidth="1" />
    <line x1="40" y1="44" x2="40" y2="48" stroke="#d0c8b8" strokeWidth="1" />
  </>, className);
}

// Map of food icon names to colored illustration components
const FOOD_ICONS: Record<string, (props: IconProps) => JSX.Element> = {
  carrot: CarrotIcon, tomato: TomatoIcon, potato: PotatoIcon,
  onion: OnionIcon, garlic: GarlicIcon, fish: FishIcon,
  chicken: ChickenIcon, beef: BeefIcon, egg: EggIcon,
  milk: MilkIcon, cheese: CheeseIcon, apple: AppleIcon,
  banana: BananaIcon, lemon: LemonIcon, pepper: PepperIcon,
  broccoli: BroccoliIcon, mushroom: MushroomIcon, corn: CornIcon,
  rice: RiceIcon, bread: BreadIcon, wine: WineIcon,
  coffee: CoffeeIcon, water: WaterIcon, oil: OilIcon,
  salt: SaltIcon, sugar: SugarIcon, pot: PotIcon,
  leaf: LeafIcon, chili: ChiliIcon, cake: CakeIcon,
  cookie: CookieIcon, soup: SoupIcon, utensils: UtensilsIcon,
  chef_hat: ChefHatIcon,
};

export function hasFoodIcon(name: string): boolean {
  return name in FOOD_ICONS;
}

export function renderFoodIcon(name: string, props: IconProps): JSX.Element | null {
  const Comp = FOOD_ICONS[name];
  return Comp ? <Comp {...props} /> : null;
}
