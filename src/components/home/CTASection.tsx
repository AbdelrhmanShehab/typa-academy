'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="relative py-24 bg-green-900 border-b border-gold-500/10 text-center overflow-hidden">
      
      {/* Decorative Traditional Border Accents */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Decorative Azhar arch icon (traditional layout) */}
          <div className="w-16 h-16 rounded-full bg-white/5 border border-gold-500/35 flex items-center justify-center">
            <svg width="32" height="34" viewBox="0 0 120 130" fill="none">
              <path d="M60 4 C60 4 16 28 16 66 L16 80 Q16 88 24 88 L96 88 Q104 88 104 80 L104 66 C104 28 60 4 60 4Z" fill="#1b4332"/>
              <path d="M60 16 C60 16 28 36 28 68 L28 78 Q28 84 34 84 L86 84 Q92 84 92 78 L92 68 C92 36 60 16 60 16Z" fill="#2d6a4f"/>
              <circle cx="60" cy="6" r="3.5" fill="#B8933E"/>
            </svg>
          </div>

          {/* Hadith Block */}
          <div className="max-w-2xl px-6 py-8 border-t border-b border-gold-500/25 relative my-2">
            <span className="text-gold-500 text-xs font-bold block mb-4">قال رسول الله ﷺ:</span>
            <p className="font-serif text-xl sm:text-2xl text-white leading-relaxed font-bold">
              «مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ»
            </p>
            <span className="text-white/40 text-xs block mt-4">— رواه مسلم</span>
          </div>

          <h2 className="font-extrabold text-white text-2xl sm:text-3xl leading-tight">
            ابدأ رحلتك التعليمية المباركة اليوم
          </h2>

          <p className="text-white/70 text-base leading-relaxed max-w-xl">
            ندعوكم للانضمام إلى أكاديمية طيبة والبدء في طلب العلم الشريف وتلقي القرآن الكريم وعلومه على منهج أصيل وبإشراف مباشر من كبار العلماء والمشايخ.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link
              href="/register"
              className="px-8 py-3.5 bg-gold-500 hover:bg-gold-600 text-green-950 font-bold rounded-md shadow-sm transition-colors text-sm"
            >
              إنشاء حساب مجاني
            </Link>
            <Link
              href="/courses"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold rounded-md transition-colors text-sm"
            >
              استعرض البرامج العلمية
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
