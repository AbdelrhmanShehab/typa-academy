'use client';

import { motion } from 'framer-motion';
import { Users, Award, BookOpen, UserCheck } from 'lucide-react';

export default function MethodologySection() {
  const pillars = [
    {
      icon: <Users size={24} className="text-gold-500" />,
      title: 'التلقي المباشر عن العلماء والمشايخ',
      description: 'نؤمن في الأكاديمية بأن العلم نور ينتقل بالمشافهة والتلقي المباشر. يدرس طلابنا مباشرة في حلقات علمية تفاعلية مع شيوخ ثقات متمكنين.',
    },
    {
      icon: <Award size={24} className="text-gold-500" />,
      title: 'السند المتصل والمناهج الأصيلة',
      description: 'جميع روايات حفظ القرآن وتلاوته تنقل بأسانيد متصلة إلى رسول الله ﷺ، مما يضمن أصالة الضبط والقراءة للدارس.',
    },
    {
      icon: <BookOpen size={24} className="text-gold-500" />,
      title: 'التدرج المنهجي والتحصيل العلمي',
      description: 'مناهجنا مصممة بدقة لتراعي مستويات الطلاب، مبتدئة بالأساسيات الضرورية، ثم التدرج التدريجي نحو المستويات العليا والتخصص.',
    },
    {
      icon: <UserCheck size={24} className="text-gold-500" />,
      title: 'الإشراف العلمي والتربوي المستمر',
      description: 'لا يقتصر دورنا على تقديم المحاضرات، بل يحظى كل طالب بمتابعة دورية وتصحيح للأخطاء تحت إشراف فضيلة الشيخ أحمد منصور ومساعديه.',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-gold-500 text-xs font-bold tracking-widest uppercase block mb-3">
            منهجنا وأسلوبنا الدراسي
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-900 leading-tight">
            المنهجية التعليمية في أكاديمية طيبة
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-4 leading-relaxed">
            نسير على درب السلف الصالح في حفظ كتاب الله ورواية أسانيده ودراسة فروع الشريعة الإسلامية المطهرة
          </p>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-manuscript-bg p-8 border border-gold-500/15 rounded-lg flex gap-5 items-start text-right"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-md bg-white border border-gold-500/20 flex items-center justify-center shrink-0 shadow-sm">
                {pillar.icon}
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
