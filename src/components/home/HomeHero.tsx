'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import shekh from "../../../public/images/sheikh-ahmed-mansour.png"
export default function HomeHero() {
  return (
    <section className="bg-manuscript-bg pt-10 pb-16 lg:py-24 border-b border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── RIGHT SIDE: Text Content (Col span 7 on lg) ── */}
          <div className="lg:col-span-7 text-right flex flex-col justify-center order-2 lg:order-1">
            
            {/* Basmala */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-6"
            >
              <span className="font-serif text-2xl lg:text-3xl text-gold-500 block leading-relaxed">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>
            </motion.div>

            {/* Academy name tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-4"
            >
              <span className="text-gold-500 font-bold tracking-widest text-xs uppercase block border-r-2 border-gold-500 pr-3">
                أكاديمية طيبة للدراسات القرآنية
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-900 leading-tight mb-6"
            >
              رحلةٌ مباركة في تعلّم القرآن الكريم والعلوم الشرعية
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-slate-700 text-base lg:text-lg leading-relaxed mb-8 max-w-xl"
            >
              تأسست الأكاديمية تحت الإشراف المباشر لفضيلة الشيخ أحمد منصور لتقديم منهج تعليمي رصين يربط المسلمين بكتاب الله وسنة رسوله ﷺ، على منهج أهل السنة والجماعة وبأسانيد متصلة.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-start"
            >
              <Link
                href="/courses"
                className="px-8 py-3.5 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-colors shadow-sm"
              >
                تصفح البرامج العلمية
              </Link>
              <Link
                href="/about"
                className="px-8 py-3.5 bg-white text-green-900 border border-gold-500/30 font-bold rounded-md hover:bg-gold-500/5 transition-colors"
              >
                عن الأكاديمية
              </Link>
            </motion.div>
          </div>

          {/* ── LEFT SIDE: Scholar Portrait & Credentials (Col span 5 on lg) ── */}
          <div className="lg:col-span-5 flex flex-col items-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full max-w-[360px] flex flex-col items-center text-center"
            >
              {/* Image Frame - Borderless, clean and premium */}
              <div className="w-full aspect-[4/5] relative rounded-lg overflow-hidden bg-white mb-6 shadow-md">
                <Image
                  src={shekh}
                  alt="فضيلة الشيخ أحمد منصور"
                  fill
                  sizes="(max-w-768px) 100vw, 360px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Scholar Information Card */}
              <div className="w-full px-2 text-right">
                <h2 className="text-xl lg:text-2xl font-extrabold text-green-900 mb-1">
                  فضيلة الشيخ أحمد منصور
                </h2>
                <p className="text-gold-600 font-bold text-sm mb-4">
                  المشرف العام على الأكاديمية
                </p>
                
                {/* Credentials list */}
                <ul className="space-y-2.5 text-slate-700 text-sm border-t border-gold-500/20 pt-4">
                  <li className="flex items-start gap-2.5 justify-start">
                    <span className="text-gold-500 mt-1 select-none">•</span>
                    <span>عضو لجنة مراجعة المصحف بالأزهر الشريف</span>
                  </li>
                  <li className="flex items-start gap-2.5 justify-start">
                    <span className="text-gold-500 mt-1 select-none">•</span>
                    <span>شيخ مقرأتي الجامع الأزهر والسيدة زينب</span>
                  </li>
                  <li className="flex items-start gap-2.5 justify-start">
                    <span className="text-gold-500 mt-1 select-none">•</span>
                    <span>قارئ ومُقرئ القراءات العشر</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
