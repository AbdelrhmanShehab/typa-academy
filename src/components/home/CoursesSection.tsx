'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { coursesData } from '@/data/courses';
import { teachersData } from '@/data/teachers';
import { Clock, Globe2, BookOpen, ChevronLeft, Award } from 'lucide-react';
import Link from 'next/link';

export default function CoursesSection() {
  const getTeacherName = (id: string) => {
    const teacher = teachersData.find((t) => t.id === id);
    return teacher ? teacher.arabicName : 'عضو هيئة التدريس';
  };

  return (
    <section className="py-20 bg-manuscript-bg border-b border-gold-500/10">
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
                className="group flex flex-col h-full bg-white rounded-lg border border-gold-500/15 overflow-hidden hover:shadow-md hover:border-gold-500/30 transition-all duration-300"
              >
                <div className="flex-1">
                  
                  {/* Category Header */}
                  <div className="bg-green-900 p-6 text-right relative overflow-hidden">
                    {/* Subtle design block */}
                    <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-6 -translate-y-6" />
                    
                    <span className="text-xs font-bold text-gold-500 tracking-wider block mb-2">
                      {course.category}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-gold-400 transition-colors line-clamp-2 leading-relaxed">
                      {course.arabicTitle}
                    </h3>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 text-right space-y-4">
                    {/* Teacher info */}
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">المعلم:</span>
                      <p className="text-sm font-bold text-green-950">
                        {getTeacherName(course.teacherId)}
                      </p>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {course.description}
                    </p>

                    {/* Metadata details grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100/60 text-xs text-slate-500">
                      <div>
                        <span className="block text-slate-400 mb-0.5">مدة البرنامج:</span>
                        <span className="font-semibold text-green-900 flex items-center gap-1.5 justify-end">
                          <Clock size={13} className="text-gold-500" />
                          {course.duration}
                        </span>
                      </div>
                      <div>
                        <span className="block text-slate-400 mb-0.5">المستوى:</span>
                        <span className="font-semibold text-green-900">
                          {course.level === 'beginner' ? 'مبتدئ' : course.level === 'intermediate' ? 'متوسط' : 'متقدم'}
                        </span>
                      </div>
                      <div>
                        <span className="block text-slate-400 mb-0.5">اللغة:</span>
                        <span className="font-semibold text-green-900 flex items-center gap-1.5 justify-end">
                          <Globe2 size={13} className="text-gold-500" />
                          {course.language}
                        </span>
                      </div>
                      <div>
                        <span className="block text-slate-400 mb-0.5">الشهادة:</span>
                        <span className="font-semibold text-green-900 flex items-center gap-1.5 justify-end">
                          <Award size={13} className="text-gold-500" />
                          {course.certificate ? 'شهادة معتمدة' : 'طلب حضور'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="px-6 pb-6 pt-2 text-right">
                  <span className="inline-flex items-center justify-center w-full py-3 text-sm font-bold text-white bg-green-500 rounded-md group-hover:bg-green-600 transition-colors shadow-sm">
                    عرض البرنامج العلمي
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
