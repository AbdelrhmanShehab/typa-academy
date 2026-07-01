/**
 * AcademyLogo — SVG recreation of the Tyba Academy dome & Quran logo.
 * Inspired by: Islamic dome/arch layered in greens with an open Quran at center.
 * Usage: <AcademyLogo size={40} /> or <AcademyLogo size={56} withText />
 */

interface AcademyLogoProps {
  size?: number;
  withText?: boolean;
  textSize?: string;       // tailwind text-size class, e.g. "text-xl"
  subTextSize?: string;    // for the subtitle line
  onDark?: boolean;        // swap text colors for dark backgrounds
  className?: string;
}

export default function AcademyLogo({
  size = 44,
  withText = true,
  textSize = 'text-xl',
  subTextSize = 'text-[11px]',
  onDark = false,
  className = '',
}: AcademyLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* ─── SVG Logo Mark ─── */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="شعار أكاديمية طيبة"
      >
        {/* === OUTER ARCH (dark green) === */}
        <path
          d="M60 4
             C60 4 16 28 16 66
             L16 80
             Q16 88 24 88
             L96 88
             Q104 88 104 80
             L104 66
             C104 28 60 4 60 4Z"
          fill="#1b4332"
        />

        {/* === MIDDLE ARCH (medium green) === */}
        <path
          d="M60 16
             C60 16 28 36 28 68
             L28 78
             Q28 84 34 84
             L86 84
             Q92 84 92 78
             L92 68
             C92 36 60 16 60 16Z"
          fill="#2d6a4f"
        />

        {/* === INNER ARCH (light green) === */}
        <path
          d="M60 26
             C60 26 38 44 38 68
             L38 77
             Q38 82 43 82
             L77 82
             Q82 82 82 77
             L82 68
             C82 44 60 26 60 26Z"
          fill="#4e9278"
        />

        {/* === WHITE HIGHLIGHT LINE outer arch === */}
        <path
          d="M60 10 C60 10 22 32 22 66 L22 80"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.5"
          fill="none"
        />
        <path
          d="M60 10 C60 10 98 32 98 66 L98 80"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.5"
          fill="none"
        />

        {/* === GROUND / BANNER (dark green sweep) === */}
        <path
          d="M12 86 Q60 100 108 86 L114 92 Q60 110 6 92 Z"
          fill="#1b4332"
        />
        {/* Light stripe on banner */}
        <path
          d="M18 88 Q60 100 102 88"
          stroke="#4e9278"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />

        {/* === OPEN QURAN (center) === */}
        {/* Book base */}
        <ellipse cx="60" cy="74" rx="16" ry="5" fill="#1b4332" opacity="0.6" />
        {/* Left page */}
        <path
          d="M60 56 C50 58 44 64 44 72 L44 74 Q52 70 60 72 Z"
          fill="#c9a227"
          opacity="0.95"
        />
        {/* Right page */}
        <path
          d="M60 56 C70 58 76 64 76 72 L76 74 Q68 70 60 72 Z"
          fill="#e8c24f"
          opacity="0.95"
        />
        {/* Center spine */}
        <line x1="60" y1="56" x2="60" y2="72" stroke="#a87c16" strokeWidth="1.5" />
        {/* Page lines left */}
        <line x1="50" y1="64" x2="58" y2="65" stroke="#a87c16" strokeWidth="0.8" opacity="0.5" />
        <line x1="49" y1="67" x2="58" y2="68" stroke="#a87c16" strokeWidth="0.8" opacity="0.5" />
        <line x1="48" y1="70" x2="58" y2="71" stroke="#a87c16" strokeWidth="0.8" opacity="0.5" />
        {/* Page lines right */}
        <line x1="70" y1="64" x2="62" y2="65" stroke="#a87c16" strokeWidth="0.8" opacity="0.5" />
        <line x1="71" y1="67" x2="62" y2="68" stroke="#a87c16" strokeWidth="0.8" opacity="0.5" />
        <line x1="72" y1="70" x2="62" y2="71" stroke="#a87c16" strokeWidth="0.8" opacity="0.5" />
        {/* Book stand / holder arms */}
        <path d="M44 74 L36 82" stroke="#1b4332" strokeWidth="3" strokeLinecap="round" />
        <path d="M76 74 L84 82" stroke="#1b4332" strokeWidth="3" strokeLinecap="round" />
        <path d="M36 82 Q60 78 84 82" stroke="#1b4332" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* === GOLD STAR / CRESCENT ACCENT at top peak === */}
        <circle cx="60" cy="6" r="3.5" fill="#c9a227" />
        <circle cx="60" cy="6" r="2" fill="#f0d67e" />
      </svg>

      {/* ─── Text Block ─── */}
      {withText && (
        <div className="flex flex-col leading-tight text-right">
          <span
            className={`${textSize} font-extrabold leading-none ${
              onDark ? 'text-white' : 'text-green-900'
            }`}
          >
            أكاديمية طيبة
          </span>
          <span
            className={`${subTextSize} font-medium mt-0.5 ${
              onDark ? 'text-green-300' : 'text-gold-600'
            }`}
          >
            للدراسات القرآنية
          </span>
        </div>
      )}
    </div>
  );
}
