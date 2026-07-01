'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import { faqData } from '@/data/faq';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white border-b border-green-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="الأسئلة الشائعة"
          subtitle="إجابات وافية لأهم التساؤلات والاستفسارات الشائعة حول الأكاديمية ونظام الدراسة"
          centered
          className="mb-12"
        />

        <div className="flex flex-col gap-4">
          {faqData.map((item, idx) => {
            const isOpen = activeIndex === idx;

            return (
              <div
                key={idx}
                className={cn(
                  'border rounded-2xl transition-all duration-200 overflow-hidden text-right',
                  isOpen
                    ? 'border-green-300 bg-green-50/10 shadow-sm'
                    : 'border-slate-100 bg-[#FBFBFA] hover:border-slate-200',
                )}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between gap-4 font-bold text-green-900 text-sm sm:text-base cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-right leading-relaxed">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      'text-slate-400 shrink-0 transition-transform duration-200',
                      isOpen && 'transform rotate-180 text-green-600',
                    )}
                  />
                </button>

                {/* Accordion Content Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100/50">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
