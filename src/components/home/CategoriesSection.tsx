'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { categoriesData } from '@/data/categories';
import {
  BookOpen,
  Mic,
  MessageCircle,
  Shield,
  Compass,
  Search,
  Languages,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen,
  Mic,
  MessageCircle,
  Shield,
  Compass,
  Search,
  Languages,
};

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-white border-b border-green-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="التخصصات والعلوم الشرعية"
          subtitle="تنوع علمي يغطي كافة جوانب المعرفة الإسلامية الأساسية والمتقدمة"
          centered
          className="mb-12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesData.map((category, index) => {
            const IconComponent = iconMap[category.iconName] || BookOpen;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative bg-[#FBFBFA] p-6 rounded-2xl border border-green-50/60 hover:border-green-200 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-right flex flex-col justify-between overflow-hidden"
              >
                {/* Decorative border accent */}
                <div className="absolute top-0 right-0 left-0 h-1 bg-transparent group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-gold-400 transition-colors" />

                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mb-5 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                    <IconComponent size={22} />
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-bold text-green-900 mb-2 group-hover:text-green-700 transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Bottom line arrow */}
                <div className="mt-4 text-xs font-bold text-green-700 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1 self-start">
                  <span>تصفح المواد</span>
                  <span>←</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
