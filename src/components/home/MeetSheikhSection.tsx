'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Award, MapPin, Mail } from 'lucide-react';

export default function MeetSheikhSection() {
  const timeline = [
    {
      icon: <GraduationCap size={20} className="text-gold-500" />,
      title: 'الدراسة والتعليم الأكاديمي',
      description: 'تخرج في كلية القرآن الكريم بجامعة الأزهر الشريف، وحصل على الدراسات العليا في التفسير وعلوم القرآن.',
    },
    {
      icon: <Award size={20} className="text-gold-500" />,
      title: 'الإجازات العلمية والأسانيد',
      description: 'حاصل على الإجازة في القراءات العشر المتواترة الصغرى والكبرى بسند متصل إلى النبي ﷺ عن كبار شيوخ الإقراء.',
    },
    {
      icon: <MapPin size={20} className="text-gold-500" />,
      title: 'المهام والمناصب التعليمية',
      description: 'عضو لجنة مراجعة المصحف الشريف بمجمع البحوث الإسلامية بالأزهر الشريف، وشيخ مقرأتي الجامع الأزهر والسيدة زينب.',
    },
    {
      icon: <BookOpen size={20} className="text-gold-500" />,
      title: 'المؤلفات والنشاط العلمي',
      description: 'صاحب مؤلفات عديدة في علم التجويد والقراءات، ومحكّم في العديد من المسابقات الدولية لحفظ القرآن الكريم.',
    },
  ];

  return (
    <section id="meet-sheikh" className="py-24 bg-white border-b border-gold-500/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold-500 text-xs font-bold tracking-widest uppercase block mb-3">
            المشرف العام
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-900 leading-tight">
            تعرف على فضيلة الشيخ أحمد منصور
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── Portrait & Social Links Column (Col span 5 on lg) ── */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[340px] bg-[#FAF8F5] p-4 border border-gold-500/20 rounded-lg shadow-sm">
              <div className="aspect-[4/5] relative rounded-md overflow-hidden bg-white mb-6">
                <Image
                  src="/images/sheikh-ahmed-mansour.png"
                  alt="فضيلة الشيخ أحمد منصور"
                  fill
                  sizes="(max-w-768px) 100vw, 300px"
                  className="object-cover object-top"
                />
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-bold text-green-900">فضيلة الشيخ أحمد منصور</h3>
                <p className="text-gold-600 text-xs font-medium mb-4">حافظ القرآن بالقراءات العشر ومراجع المصحف الشريف</p>
                
                {/* Social Links */}
                <div className="flex gap-4 justify-center items-center">
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white border border-gold-500/20 flex items-center justify-center text-green-900 hover:bg-gold-500/10 hover:text-gold-600 transition-colors"
                  >
                    <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.68 22 12 22 12s0 3.32-.42 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.494.42-4.812.42-4.812.42s-3.32 0-4.814-.42a2.504 2.504 0 0 1-1.768-1.768C8 15.32 8 12 8 12s0-3.32.42-4.814a2.504 2.504 0 0 1 1.768-1.768c1.494-.42 4.812-.42 4.812-.42s3.32 0 4.814.42zm-8.812 9.248l5.2-2.662-5.2-2.662v5.324z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white border border-gold-500/20 flex items-center justify-center text-green-900 hover:bg-gold-500/10 hover:text-gold-600 transition-colors"
                  >
                    <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="mailto:info@typa-academy.com"
                    className="w-10 h-10 rounded-full bg-white border border-gold-500/20 flex items-center justify-center text-green-900 hover:bg-gold-500/10 hover:text-gold-600 transition-colors"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Timeline & Biography Details (Col span 7 on lg) ── */}
          <div className="lg:col-span-7 text-right">
            <h3 className="text-xl lg:text-2xl font-bold text-green-900 mb-6">
              مسيرة عطرة في خدمة كتاب الله تعالى
            </h3>
            
            <p className="text-slate-700 text-base leading-relaxed mb-8">
              كرّس فضيلة الشيخ أحمد منصور حياته لخدمة كتاب الله العزيز، تدريساً ومراجعةً وتحقيقاً. يعتبر فضيلته من المرجعيات المعتمدة في الأزهر الشريف بمصر والعالم الإسلامي لضبط تلاوة المصحف ومراجعة رسمه وضبطه، ونقل أسانيد القراءات العشر لجيل جديد من طلاب العلم الحفظة المتقنين.
            </p>

            {/* Timeline */}
            <div className="relative border-r-2 border-gold-500/20 pr-6 mr-3 space-y-8 mb-10">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Bullet point indicator */}
                  <div className="absolute -right-[33px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-gold-500 flex items-center justify-center z-10" />
                  
                  <div>
                    <h4 className="text-green-900 font-bold text-base mb-1.5 flex items-center gap-2">
                      <span className="shrink-0">{item.icon}</span>
                      {item.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Full Biography Button */}
            <div className="self-start">
              <Link
                href="/teachers/1"
                className="inline-block px-8 py-3.5 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-colors shadow-sm text-sm"
              >
                عرض السيرة الكاملة
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
