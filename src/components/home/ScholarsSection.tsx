'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { teachersData } from '@/data/teachers';
import { Globe, BookOpen, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ScholarsSection() {
  const featuredScholars = teachersData.slice(0, 3);

  return (
    <section className="py-20 bg-white border-b border-green-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionTitle
            title="المشايخ وأعضاء الهيئة التعليمية"
            subtitle="نخبة من كبار العلماء والمشايخ الموثوقين الحاملين لأسانيد العلم الشرعي"
          />
          <Link
            href="/teachers"
            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-bold text-green-700 hover:text-green-800 self-start group"
          >
            استعراض جميع المشايخ
            <ChevronLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredScholars.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link
                href={`/teachers/${teacher.id}`}
                className="group flex flex-col h-full bg-[#FBFBFA] rounded-3xl border border-green-50 overflow-hidden hover:shadow-xl hover:border-green-200 transition-all duration-300"
              >
                {/* Card Top / Image Area */}
                <div className="flex-1">
                  <div className="relative h-60 w-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-green-800">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-600/5 via-transparent to-transparent pointer-events-none" />
                    <div className="w-24 h-24 rounded-full bg-white border-2 border-gold-400/40 flex items-center justify-center shadow-md">
                      <span className="text-3xl font-extrabold text-green-800">
                        {teacher.arabicName.split(' ')[2]?.charAt(0) || 'ش'}
                      </span>
                    </div>
                    {/* Gold accent bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500" />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 text-right">
                    <h3 className="text-lg font-bold text-green-900 mb-1 group-hover:text-green-700 transition-colors">
                      {teacher.arabicName}
                    </h3>
                    <p className="text-xs font-semibold text-gold-600 mb-4 tracking-wide">
                      {teacher.specialization}
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                      {teacher.biography}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Globe size={13} className="text-slate-400" />
                      {teacher.nationality}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                    <span className="flex items-center gap-1">
                      <BookOpen size={13} className="text-slate-400" />
                      {teacher.books.length} مؤلفات
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-4 py-2 text-xs font-bold text-green-700 bg-green-50 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors">
                    عرض الملف الشخصي
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
