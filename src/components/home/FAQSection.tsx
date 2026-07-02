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
    <section className="py-24 bg-manuscript-bg border-b border-gold-500/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="الأسئلة الشائعة"
          subtitle="إجابات وافية لأهم الأسئلة المتعلقة بنظام الدراسة والبرامج العلمية بالأكاديمية"
          centered
          className="mb-16"
        />

        <div className="flex flex-col gap-4">
          {faqData.map((item, idx) => {
            const isOpen = activeIndex === idx;

            return (
              <div
                key={idx}
                className={cn(
                  'border transition-all duration-200 overflow-hidden text-right rounded-md',
                  isOpen
                    ? 'border-gold-500 bg-white shadow-sm'
                    : 'border-gold-500/15 bg-white hover:border-gold-500/30',
                )}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-4.5 flex items-center justify-between gap-4 font-bold text-green-900 text-base cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-right leading-relaxed">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      'text-slate-400 shrink-0 transition-transform duration-200',
                      isOpen && 'transform rotate-180 text-gold-500',
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
                      <div className="px-6 pb-6 pt-1 text-slate-700 text-sm sm:text-base leading-relaxed border-t border-gold-500/10">
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
