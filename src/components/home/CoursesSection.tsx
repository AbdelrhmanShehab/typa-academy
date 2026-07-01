'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { coursesData } from '@/data/courses';
import { teachersData } from '@/data/teachers';
import { Clock, Globe2, BookOpen, ChevronLeft } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { formatPrice } from '@/utils';

export default function CoursesSection() {
  const getTeacherName = (id: string) => {
    const teacher = teachersData.find((t) => t.id === id);
    return teacher ? teacher.arabicName : 'عضو هيئة التدريس';
  };

  return (
    <section className="py-20 bg-green-50/10 border-b border-green-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionTitle
            title="الدورات العلمية المتميزة"
            subtitle="برامج تعليمية ممنهجة تبدأ معك من التأسيس إلى مستويات متقدمة"
          />
          <Link
            href="/courses"
            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-bold text-green-700 hover:text-green-800 self-start group"
          >
            استعراض جميع الدورات
            <ChevronLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link
                href={`/courses/${course.slug}`}
                className="group flex flex-col h-full bg-white rounded-3xl border border-green-100 overflow-hidden hover:shadow-xl hover:border-green-200 transition-all duration-300"
              >
                <div className="flex-1">
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-tr from-green-900 to-green-700 flex items-center justify-center text-white overflow-hidden">
                    <div className="absolute inset-0 bg-green-950/20" />
                    <div className="absolute -top-12 -left-12 w-28 h-28 rounded-full border border-white/10" />
                    <div className="z-10 text-center px-4">
                      <BookOpen size={32} className="mx-auto mb-2 text-gold-400 opacity-80" />
                      <span className="text-xs font-bold text-green-200 tracking-wider">
                        {course.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant={course.isFree ? 'success' : 'gold'} className="px-3 py-1 text-xs font-bold shadow-md">
                        {course.isFree ? 'مجاني' : formatPrice(course.price)}
                      </Badge>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 text-right">
                    <span className="text-xs font-bold text-slate-400 block mb-2">
                      المستوى: {course.level === 'beginner' ? 'مبتدئ' : course.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                    </span>
                    <h3 className="text-base font-bold text-green-900 mb-2 group-hover:text-green-700 transition-colors line-clamp-2 leading-relaxed">
                      {course.arabicTitle}
                    </h3>
                    <p className="text-xs text-green-700 font-semibold mb-4">
                      بإشراف: {getTeacherName(course.teacherId)}
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {course.duration}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                    <span className="flex items-center gap-1">
                      <Globe2 size={13} />
                      {course.language}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-4 py-2 text-xs font-bold text-white bg-green-600 rounded-xl group-hover:bg-green-700 shadow-sm transition-colors">
                    عرض الدورة
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
