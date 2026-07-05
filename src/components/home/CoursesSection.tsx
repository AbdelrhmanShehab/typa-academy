'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { coursesData } from '@/data/courses';
import { teachersData } from '@/data/teachers';
import { Clock, BookOpen, ChevronLeft, Award } from 'lucide-react';
import Link from 'next/link';

export default function CoursesSection() {
  const getTeacherName = (id: string) => {
    const teacher = teachersData.find((t) => t.id === id);
    return teacher ? teacher.arabicName : 'عضو هيئة التدريس';
  };

  return (
    <section className="py-20 bg-white border-b border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionTitle
            title="البرامج العلمية"
            subtitle="برامج تعليمية تخصصية متدرجة تبدأ معك من التأسيس إلى الإتقان"
          />
          <Link
            href="/courses"
            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-bold text-green-900 hover:text-gold-600 self-start group transition-colors"
          >
            استعراض جميع البرامج
            <ChevronLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course, index) => {
            const levelText = course.level === 'beginner' ? 'مبتدئ' : course.level === 'intermediate' ? 'متوسط' : 'متقدم';
            const certificateText = course.certificate ? 'شهادة معتمدة' : 'طلب حضور';

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Link
                  href={`/courses/${course.slug}`}
                  className="group flex flex-col h-full bg-[#FAF8F5] rounded-2xl border border-gold-500/15 p-6 hover:shadow-lg hover:border-gold-500/40 transition-all duration-350 text-right"
                >
                  {/* Category & Title */}
                  <div className="mb-4">
                    <span className="text-xs font-bold text-gold-600 tracking-widest block uppercase mb-2">
                      {course.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-green-950 leading-relaxed group-hover:text-green-700 transition-colors line-clamp-2">
                      {course.arabicTitle}
                    </h3>
                  </div>

                  {/* Delicate divider */}
                  <div className="w-16 h-[1px] bg-gradient-to-r from-gold-500/30 to-transparent mb-4" />

                  {/* Instructor */}
                  <div className="text-xs text-slate-500 mb-4">
                    <span className="opacity-75">المعلم: </span>
                    <span className="font-bold text-green-900">{getTeacherName(course.teacherId)}</span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {course.description}
                  </p>

                  {/* Metadata Details Row */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-4 border-t border-slate-100 text-xs text-slate-500 mb-6">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-gold-500" />
                      {course.duration}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={13} className="text-gold-500" />
                      {levelText}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                    <span className="flex items-center gap-1.5">
                      <Award size={13} className="text-gold-500" />
                      {certificateText}
                    </span>
                  </div>

                  {/* Action Link */}
                  <div className="flex items-center gap-1 text-sm font-bold text-green-700 group-hover:text-green-900 transition-colors mt-auto">
                    <span>عرض البرنامج العلمي</span>
                    <ChevronLeft size={16} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
