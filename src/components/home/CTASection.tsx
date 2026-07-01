'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section
      className="relative py-24 text-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0d2119 0%, #1b4332 60%, #1c4231 100%)' }}
    >
      {/* Pattern */}
      <div className="absolute inset-0 arch-pattern pointer-events-none" />

      {/* Radial glows */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          style={{
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(201,162,39,0.07) 0%, transparent 65%)',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Gold top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #c9a227 30%, #c9a227 70%, transparent)' }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center gap-7"
        >
          {/* Decorative arch icon */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(45,106,79,0.3)',
              border: '1px solid rgba(201,162,39,0.25)',
              boxShadow: '0 0 32px rgba(201,162,39,0.15)',
            }}
          >
            <svg width="32" height="34" viewBox="0 0 120 130" fill="none">
              <path d="M60 4 C60 4 16 28 16 66 L16 80 Q16 88 24 88 L96 88 Q104 88 104 80 L104 66 C104 28 60 4 60 4Z" fill="#1b4332"/>
              <path d="M60 16 C60 16 28 36 28 68 L28 78 Q28 84 34 84 L86 84 Q92 84 92 78 L92 68 C92 36 60 16 60 16Z" fill="#2d6a4f"/>
              <path d="M60 26 C60 26 38 44 38 68 L38 77 Q38 82 43 82 L77 82 Q82 82 82 77 L82 68 C82 44 60 26 60 26Z" fill="#4e9278"/>
              <circle cx="60" cy="6" r="3.5" fill="#c9a227"/>
            </svg>
          </div>

          <h2
            className="font-extrabold text-white leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            ابدأ رحلتك مع القرآن اليوم
          </h2>

          <p className="text-green-300/75 text-base leading-relaxed max-w-xl">
            انضم إلى آلاف الطلاب وتعلّم القرآن الكريم وعلومه على يد مشايخ أهل الإجازة والسند،
            بأسلوب ميسّر في بيئة تعليمية رقمية راقية.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="px-9 py-4 font-bold text-sm rounded-xl transition-all"
              style={{
                background: 'linear-gradient(135deg, #c9a227, #e8c24f)',
                color: '#0d2119',
                boxShadow: '0 4px 24px rgba(201,162,39,0.3)',
              }}
            >
              إنشاء حساب مجاني
            </Link>
            <Link
              href="/courses"
              className="px-9 py-4 font-semibold text-sm rounded-xl transition-all"
              style={{
                background: 'rgba(45,106,79,0.25)',
                border: '1.5px solid rgba(78,146,120,0.35)',
                color: '#a8d5bf',
              }}
            >
              استعرض الدورات
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
