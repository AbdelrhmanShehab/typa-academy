'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { testimonialsData } from '@/data/testimonials';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-green-50/10 border-b border-green-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="ماذا يقول طلابنا؟"
          subtitle="تجارب وآراء بعض الدارسين والدارسات الذين شاركونا رحلة العلم الشرعي"
          centered
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white p-6 rounded-2xl border border-green-50 shadow-sm hover:shadow-md transition-all text-right flex flex-col justify-between relative"
            >
              {/* Quote Mark background */}
              <div className="absolute top-4 left-4 text-green-500/5">
                <Quote size={40} className="transform -scale-x-100" />
              </div>

              <div>
                {/* Rating */}
                <div className="flex gap-1 mb-4 text-gold-500 justify-start">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                  " {test.comment} "
                </p>
              </div>

              {/* Student info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                {/* Text-based avatar because we do not have real images */}
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-700 font-bold flex items-center justify-center text-sm border border-green-100">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-green-950 font-bold text-sm">
                    {test.name}
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5">
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
