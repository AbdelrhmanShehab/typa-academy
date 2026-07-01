'use client';

import Link from 'next/link';
import { motion, type Easing } from 'framer-motion';
/* Single fade-in — slow and calm, like a page turning */
const appear = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.2, ease: 'easeOut' as Easing, delay },
});

export default function HomeHero() {
  return (
    <section>
      {/* ══════════════════════════════════════════
          THE MANUSCRIPT PAGE
          Background: warm cream — same as the body
      ════════════════════════════════════════════ */}
      <div
        className="flex flex-col items-center justify-start text-center"
        style={{
          background: '#F8F7F2',
          paddingTop: '5rem',
          paddingBottom: '4rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
      >
        {/* ── Basmala ── */}
        <motion.div {...appear(0)}>
          <p
            style={{
              fontFamily: "'Cairo', serif",
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              color: '#C9A227',
              lineHeight: 1.4,
              letterSpacing: '0.04em',
              marginBottom: '2rem',
            }}
          >
            بِسمِ ٱللَّهِ ٱلرَّحمَٰنِ ٱلرَّحِيمِ
          </p>
        </motion.div>

        {/* ── Top ornamental rule ── */}
        <motion.div {...appear(0.3)} style={{ width: '100%', maxWidth: 420, marginBottom: '2.5rem' }}>
          <div style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent 0%, #C9A227 30%, #C9A227 70%, transparent 100%)',
            opacity: 0.45,
          }} />
        </motion.div>

        {/* ── Academy Name ── */}
        <motion.div {...appear(0.5)}>
          <p
            style={{
              fontFamily: "'Cairo', serif",
              fontSize: 'clamp(1.75rem, 5vw, 3rem)',
              fontWeight: 800,
              color: '#1B4332',
              lineHeight: 1.3,
              marginBottom: '0.25rem',
            }}
          >
            أكاديمية طيبة
          </p>
          <p
            style={{
              fontFamily: "'Cairo', serif",
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              fontWeight: 500,
              color: '#C9A227',
              letterSpacing: '0.12em',
              marginBottom: '2.5rem',
            }}
          >
            للدراسات القرآنية
          </p>
        </motion.div>

        {/* ── Tagline ── */}
        <motion.div {...appear(0.75)}>
          <p
            style={{
              fontFamily: "'Cairo', serif",
              fontSize: 'clamp(1.2rem, 3.5vw, 1.85rem)',
              fontWeight: 400,
              color: '#1B4332',
              lineHeight: 2,
              maxWidth: 520,
              marginBottom: '3rem',
            }}
          >
            رحلةٌ في طلب العلم
            <br />
            وربطِ المسلمين بالقرآن
            <br />
            والسنة النبوية
          </p>
        </motion.div>

        {/* ── Middle rule ── */}
        <motion.div {...appear(1.0)} style={{ width: '100%', maxWidth: 420, marginBottom: '2.5rem' }}>
          <div style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent 0%, #2D6A4F 30%, #2D6A4F 70%, transparent 100%)',
            opacity: 0.3,
          }} />
        </motion.div>

        {/* ── CTA ── */}
        <motion.div {...appear(1.2)}>
          <Link
            href="/register"
            style={{
              display: 'inline-block',
              fontFamily: "'Cairo', serif",
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              fontWeight: 600,
              color: '#1B4332',
              letterSpacing: '0.08em',
              textDecoration: 'none',
              padding: '0.5rem 2.5rem',
              border: '1px solid rgba(45,106,79,0.3)',
              borderRadius: 4,
              marginBottom: '2.5rem',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = '#1B4332';
              el.style.color = '#F8F7F2';
              el.style.borderColor = '#1B4332';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'transparent';
              el.style.color = '#1B4332';
              el.style.borderColor = 'rgba(45,106,79,0.3)';
            }}
          >
            ابدأ رحلتك
          </Link>
        </motion.div>

        {/* ── Bottom rule ── */}
        <motion.div {...appear(1.4)} style={{ width: '100%', maxWidth: 420 }}>
          <div style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent 0%, #2D6A4F 30%, #2D6A4F 70%, transparent 100%)',
            opacity: 0.3,
          }} />
        </motion.div>
      </div>

    </section>
  );
}
