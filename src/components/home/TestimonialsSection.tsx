'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { testimonialsData } from '@/data/testimonials';
import { Quote } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-manuscript-bg border-b border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="شهادات وتجارب الطلاب"
          subtitle="كلمات طيبة من طلابنا الذين منّ الله عليهم بدراسة العلم الشرعي وتلاوة القرآن في الأكاديمية"
          centered
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white p-8 rounded-lg border border-gold-500/15 shadow-sm hover:shadow-md transition-all text-right flex flex-col justify-between relative"
            >
              {/* Traditional Large Quote Mark */}
              <div className="absolute top-4 left-4 text-gold-500/15">
                <Quote size={48} className="transform -scale-x-100" />
              </div>

              <div className="relative z-10">
                {/* Comment Text */}
                <p className="text-slate-700 text-base leading-relaxed italic mb-8 pr-1 pt-4">
                  « {test.comment} »
                </p>
              </div>

              {/* Student Bio */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-manuscript-bg text-green-950 font-bold flex items-center justify-center text-sm border border-gold-500/20">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-green-900 font-bold text-sm">
                    {test.name}
                  </h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {test.country}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
