'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { ShieldCheck, CalendarRange, Layers, Eye, Award } from 'lucide-react';

export default function WhySection() {
  const advantages = [
    {
      icon: <ShieldCheck size={24} />,
      title: 'مشايخ معتمدون',
      description: 'جميع المحاضرين والمشايخ في الأكاديمية معتمدون ومن أهل العلم الثقات ذوي الخبرة والأسانيد المتصلة.',
    },
    {
      icon: <CalendarRange size={24} />,
      title: 'تعليم مرن',
      description: 'ادرس في أي وقت ومن أي مكان يناسبك من خلال مادتنا المسجلة عالية الجودة والتطبيقات الذكية.',
    },
    {
      icon: <Layers size={24} />,
      title: 'منهج متكامل',
      description: 'مناهج دراسية متدرجة ومترابطة تبدأ معك من الأساسيات وتنتقل بك خطوة بخطوة نحو التخصص.',
    },
    {
      icon: <Eye size={24} />,
      title: 'متابعة مستمرة',
      description: 'مساعدون علميون وحلقات حوارية دورية لضمان متابعة مستواك الدراسي وإجابة جميع تساؤلاتك.',
    },
    {
      icon: <Award size={24} />,
      title: 'شهادات إتمام',
      description: 'احصل على شهادة إتمام رسمية وموثقة من إدارة الأكاديمية بعد اجتيازك متطلبات واختبارات الدورة.',
    },
  ];

  return (
    <section className="py-20 bg-green-50/10 border-b border-green-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="لماذا أكاديمية طيبة؟"
          subtitle="نسعى لتقديم تجربة علمية متكاملة تجمع بين رصانة العلم وتطور التقنية لخدمة طلاب العلم"
          centered
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv, index) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-green-50 hover:border-green-200 hover:shadow-md transition-all text-right flex gap-4 items-start"
            >
              <div className="p-3 rounded-xl bg-green-50 text-green-700 shrink-0">
                {adv.icon}
              </div>
              <div>
                <h3 className="text-green-900 font-bold text-base mb-2">
                  {adv.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {adv.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
