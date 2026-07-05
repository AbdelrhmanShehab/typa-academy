'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import logo from "../../../public/logo.svg";

export default function HomeHero() {
  return (
    <section className="bg-manuscript-bg pt-20 pb-24 lg:pt-32 lg:pb-36 border-b border-gold-500/10 relative overflow-hidden flex flex-col items-center">

      {/* Background Decorative Subtle Islamic Arch Grid */}
      <div className="absolute inset-0 arch-pattern opacity-[0.15] pointer-events-none select-none" />

      {/* Constrained Text Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10 w-full">

        {/* Basmala - Classic Traditional Font */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <span className="font-serif text-2xl sm:text-3xl text-gold-600 block leading-relaxed tracking-wide opacity-90">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
        </motion.div>

        {/* Small Elegant Logo Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 flex items-center justify-center"
        >
          <div className="p-1 bg-white/40 border border-gold-500/15 rounded-lg shadow-sm backdrop-blur-xs">
            <Image
              src={logo}
              alt="شعار أكاديمية طيبة"
              width={64}
              height={32}
              priority
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Academy Name Tag - Clean & Understated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6"
        >
          <span className="text-gold-600 font-serif text-sm md:text-base tracking-widest block uppercase opacity-85">
            أكاديمية طيبة للدراسات القرآنية
          </span>
        </motion.div>

        {/* Headline - Editorial Serif Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-green-950 leading-relaxed mb-8 max-w-3xl tracking-wide"
        >
          رحلةٌ مباركة في تعلّم القرآن الكريم والعلوم الشرعية
        </motion.h1>

        {/* Description - Editorial Lead */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-slate-800 text-sm sm:text-base lg:text-lg leading-relaxed mb-12 max-w-2xl"
        >
          تأسست الأكاديمية لتقديم منهج تعليمي رصين يربط المسلمين بكتاب الله وسنة رسوله ﷺ، على منهج أهل السنة والجماعة وبأسانيد متصلة متواترة إلى النبي ﷺ.
        </motion.p>

        {/* CTA Buttons - Premium Minimalist Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 w-full sm:w-auto"
        >
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md shadow-sm transition-all hover:-translate-y-0.5 text-sm min-w-[160px]"
          >
            ابدأ رحلتك
          </Link>
          <Link
            href="/courses"
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-green-950 border border-gold-500/30 font-bold rounded-md hover:bg-gold-500/5 hover:-translate-y-0.5 transition-all text-sm min-w-[160px]"
          >
            استكشف البرامج
          </Link>
        </motion.div>

        {/* Trust block - Official Endorsement Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="w-full max-w-2xl mt-8 text-center flex flex-col items-center"
        >
          {/* Top Delicate Line */}
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold-500/35 to-transparent mb-8" />

          {/* Supervised label */}
          <span className="text-gold-600 font-serif text-xs md:text-sm uppercase tracking-widest mb-3 block select-none">
            تحت إشراف
          </span>

          {/* Scholar Name */}
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-green-950 mb-6 tracking-wide">
            فضيلة الشيخ أحمد منصور
          </h2>

          {/* Credentials */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-x-6 gap-y-2.5 text-slate-800 text-xs sm:text-sm font-medium max-w-xl leading-relaxed">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500/40" />
              عضو لجنة مراجعة المصحف بالأزهر الشريف
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500/40" />
              شيخ مقرأتي الجامع الأزهر والسيدة زينب
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500/40" />
              قارئ ومقرئ القراءات العشر
            </span>
          </div>

          {/* Bottom Delicate Line */}
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold-500/35 to-transparent mt-8" />
        </motion.div>
      </div>

      {/* Full-Bleed Academy Scholars Section (5 representing sheikhs in staggered layout) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="w-full mt-24 text-center flex flex-col items-center relative z-10"
      >
        {/* General Title */}
        <span className="text-gold-600 font-serif text-sm md:text-base tracking-widest mb-10 block select-none px-4">
          الهيئة التعليمية الممثلة لأكاديمية طيبة
        </span>

        {/* Staggered Gallery Row - Full Bleed scrollable */}
        <div className="flex items-start justify-start md:justify-center gap-4 sm:gap-5 md:gap-6 w-full overflow-x-auto pb-8 pt-4 px-6 md:px-8 scrollbar-none">
          {academyScholars.map((scholar, idx) => {
            // Staggered heights matching the reference image curve on desktop only
            const heightClasses = [
              'md:h-80 lg:h-96',          // Scholar 1 (sides)
              'md:h-96 lg:h-[440px]',     // Scholar 2
              'md:h-[440px] lg:h-[490px]', // Scholar 3 (center, tallest)
              'md:h-96 lg:h-[440px]',     // Scholar 4
              'md:h-80 lg:h-96',          // Scholar 5 (sides)
            ][idx];

            return (
              <Link
                key={scholar.id}
                href={scholar.profileUrl}
                className={`flex flex-col items-center gap-3 md:block md:w-56 lg:w-80 ${heightClasses} md:rounded-3xl md:overflow-hidden md:relative group flex-shrink-0 md:shadow-lg md:border md:border-gold-500/10 md:hover:border-gold-500/40 transition-all duration-500 md:hover:shadow-xl md:bg-gradient-to-br md:from-green-950/5 md:to-gold-500/5`}
              >
                {/* Image wrapper: circular on mobile, full-size on desktop */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-full md:h-full rounded-full md:rounded-none border-2 border-gold-500/20 md:border-none relative overflow-hidden shadow-sm md:shadow-none flex-shrink-0 bg-white">
                  <Image
                    src={scholar.imageUrl}
                    alt={scholar.name}
                    fill
                    sizes="(max-w-768px) 112px, (max-w-1024px) 224px, 320px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority={idx === 2}
                  />
                </div>

                {/* Mobile Info (only visible below md) */}
                <div className="md:hidden text-center max-w-[110px] px-1">
                  <span className="text-green-950 text-xs font-bold leading-tight block line-clamp-2">
                    {scholar.name}
                  </span>
                  <span className="text-gold-600 text-[10px] font-serif mt-1 block line-clamp-1 opacity-90">
                    {scholar.title}
                  </span>
                </div>

                {/* Desktop Gradient Overlay for Text Readability */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Desktop Scholar Info Overlay */}
                <div className="hidden md:flex absolute inset-x-0 bottom-0 p-4 sm:p-5 text-center flex flex-col justify-end min-h-[50%]">
                  <span className="text-white text-sm sm:text-base font-bold font-sans tracking-wide leading-tight drop-shadow-md">
                    {scholar.name}
                  </span>
                  <span className="text-gold-300 text-xs font-serif mt-1.5 opacity-95 block">
                    {scholar.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

const academyScholars = [
  {
    id: 'scholar-1',
    name: 'الشيخ الحسن شرف الدين',
    title: 'عضو هيئة التدريس',
    profileUrl: '/teachers/teacher-1',
    imageUrl: '/images/shekh4.jfif',
  },
  {
    id: 'scholar-2',
    name: 'الشيخ أحمد منصور',
    title: 'شيخ مقرأة الأكاديمية',
    profileUrl: '/teachers/teacher-2',
    imageUrl: '/images/shekh2.jfif',
  },
  {
    id: 'scholar-3',
    name: 'الشيخ عبد العزيز الشهاوي',
    title: 'مستشار اللجنة العلمية',
    profileUrl: '/teachers/teacher-3',
    imageUrl: '/images/shekh1.jfif',
  },
  {
    id: 'scholar-4',
    name: 'الشيخ محمد السعدني',
    title: 'مدرس الفقه وأصوله',
    profileUrl: '/teachers/teacher-4',
    imageUrl: '/images/shekh3.jfif',
  },
  {
    id: 'scholar-5',
    name: 'الشيخ الحسن شرف الدين',
    title: 'مدرس القراءات والقرآن',
    profileUrl: '/teachers/teacher-5',
    imageUrl: '/images/shekh4.jfif',
  },
];
