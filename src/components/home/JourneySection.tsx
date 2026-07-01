'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { UserPlus, BookOpen, GraduationCap, Award } from 'lucide-react';

export default function JourneySection() {
  const steps = [
    {
      num: '١',
      icon: <UserPlus size={22} />,
      title: 'أنشئ حسابك',
      description: 'سجل حسابك المجاني في الأكاديمية ببياناتك الأساسية في دقيقة واحدة.',
    },
    {
      num: '٢',
      icon: <BookOpen size={22} />,
      title: 'اختر الدورة',
      description: 'تصفح قائمة الدورات واختر المادة العلمية المناسبة لمستواك وأهدافك.',
    },
    {
      num: '٣',
      icon: <GraduationCap size={22} />,
      title: 'ابدأ التعلم',
      description: 'شاهد الدروس، تفاعل مع الشيوخ في اللقاءات المباشرة، وحل التكليفات.',
    },
    {
      num: '٤',
      icon: <Award size={22} />,
      title: 'أكمل رحلتك العلمية',
      description: 'اجتز الاختبار النهائي للدورة بنجاح واحصل على شهادة إتمام موثقة.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-green-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="خطوات رحلتك التعليمية"
          subtitle="خطوات بسيطة وميسرة تبدأ بها مسيرتك في تحصيل العلم الشرعي معنا"
          centered
          className="mb-16"
        />

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:grid grid-cols-4 gap-8 relative">
          {/* Connector line behind steps */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-green-100 -translate-y-1/2 z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col items-center text-center z-10"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-full bg-white border-2 border-green-500 text-green-700 flex items-center justify-center relative shadow-md group hover:bg-green-600 hover:text-white transition-colors duration-300">
                {step.icon}
                {/* Step number badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold-500 text-green-950 text-xs font-bold flex items-center justify-center border-2 border-white">
                  {step.num}
                </div>
              </div>

              <h3 className="text-green-900 font-bold text-base mt-6 mb-2">
                {step.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed max-w-[200px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden flex flex-col gap-8 relative pr-6 border-r-2 border-green-100 mr-4 text-right">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Outer circle absolute wrapper on the right vertical line */}
              <div className="absolute -right-[35px] top-0 w-8 h-8 rounded-full bg-white border-2 border-green-500 text-green-700 flex items-center justify-center z-10 text-xs font-bold shadow-sm">
                {step.num}
              </div>

              <div>
                <h3 className="text-green-900 font-bold text-base mb-1 flex items-center gap-2">
                  <span className="text-green-600">{step.icon}</span>
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
