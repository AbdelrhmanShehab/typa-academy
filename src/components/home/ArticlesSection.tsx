'use client';

import { motion } from 'framer-motion';
import { Calendar, BookOpen, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ArticlesSection() {
  const articles = [
    {
      id: 'article-1',
      title: 'أهمية تلقي القرآن الكريم بالمشافهة والسند المتصل',
      category: 'علوم القرآن',
      date: '٢٤ ذو القعدة ١٤٤٧ هـ',
      description: 'بيان المنهجية الأصيلة في نقل كتاب الله تعالى جيلًا بعد جيل عبر سلاسل الإسناد المتصلة بمشايخ الإقراء إلى حضرة النبي ﷺ، وأثر ذلك في ضبط التلاوة وحفظ الأداء.',
    },
    {
      id: 'article-2',
      title: 'رسم المصحف وضبطه: نشأته وتاريخه وأحكامه الشرعية',
      category: 'رسم المصحف',
      date: '١٠ شوال ١٤٤٧ هـ',
      description: 'دراسة تأصيلية حول تاريخ كتابة المصحف الشريف والقواعد المتبعة في رسمه وضبط حروفه، وحكم الالتزام بالرسم العثماني في كتابة المصاحف الحديثة.',
    },
    {
      id: 'article-3',
      title: 'منهجية التدرج العلمي في حفظ القرآن وتثبيته',
      category: 'التوجيه التربوي',
      date: '١٥ رمضان ١٤٤٧ هـ',
      description: 'نصائح وتوجيهات عملية لطالب العلم حول كيفية تنظيم الحفظ اليومي، وقواعد التثبيت والمراجعة المستمرة لضمان عدم تفلت الآيات والارتقاء في التلاوة.',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="text-right">
            <span className="text-gold-500 text-xs font-bold tracking-widest uppercase block mb-3">
              من كتابات المشرف العام
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-900 leading-tight">
              مقالات وبحوث الشيخ أحمد منصور
            </h2>
          </div>
          <Link
            href="/articles"
            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-bold text-green-900 hover:text-gold-600 self-start group transition-colors"
          >
            استعراض جميع المقالات
            <ChevronLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Editorial Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group flex flex-col justify-between p-8 bg-manuscript-bg border border-gold-500/15 rounded-lg hover:border-gold-500/30 transition-all duration-300 text-right"
            >
              <div>
                {/* Meta block */}
                <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-gold-500/10 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-gold-500" />
                    {article.date}
                  </span>
                  <span className="px-2.5 py-0.5 bg-white border border-gold-500/15 rounded text-green-900 font-bold">
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-green-900 group-hover:text-gold-600 transition-colors line-clamp-2 leading-relaxed mb-4">
                  <Link href={`/articles/${article.id}`}>
                    {article.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                  {article.description}
                </p>
              </div>

              {/* Bottom Read Link */}
              <div className="mt-8 pt-4 border-t border-gold-500/10 flex justify-end">
                <Link
                  href={`/articles/${article.id}`}
                  className="text-xs font-bold text-green-900 group-hover:text-gold-600 flex items-center gap-1 transition-colors"
                >
                  اقرأ البحث كاملاً
                  <ChevronLeft size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
