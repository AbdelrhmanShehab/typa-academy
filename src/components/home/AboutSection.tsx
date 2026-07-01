'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import AcademyLogo from '@/components/ui/AcademyLogo';
import { Award, Heart, CheckCircle2, BookMarked } from 'lucide-react';
import Link from 'next/link';

const values = [
  { icon: <Award size={18} />, title: 'أصالة المنهج', desc: 'محتوى شرعي دقيق ومتحقق منه يُشرف عليه علماء معتمدون.' },
  { icon: <Heart size={18} />, title: 'تيسير وتدرّج', desc: 'مستويات تعليمية تمكّنك من التدرّج في طلب العلم بيُسر.' },
  { icon: <CheckCircle2 size={18} />, title: 'أسانيد متصلة', desc: 'يحمل مشايخنا إجازات مسندة بسلسلة متصلة إلى النبي ﷺ.' },
  { icon: <BookMarked size={18} />, title: 'شهادات معتمدة', desc: 'احصل على شهادة إتمام موثقة بعد اجتياز متطلبات الدورة.' },
];

export default function AboutSection() {
  return (
    <section className="py-24 bg-white border-b border-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75 }}
            className="lg:col-span-5 relative"
          >
            {/* Main Card */}
            <div
              className="relative rounded-3xl overflow-hidden flex flex-col items-center justify-center p-10 text-center"
              style={{
                background: 'linear-gradient(160deg, #0d2119 0%, #1b4332 60%, #24553f 100%)',
                minHeight: 380,
                boxShadow: '0 24px 64px rgba(13,33,25,0.25)',
              }}
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 arch-pattern opacity-80 pointer-events-none" />

              {/* Glow */}
              <div
                className="absolute"
                style={{
                  width: 220, height: 220, top: -40, left: '50%', transform: 'translateX(-50%)',
                  background: 'radial-gradient(circle, rgba(201,162,39,0.12), transparent 70%)',
                  borderRadius: '50%',
                }}
              />

              <div className="relative z-10 flex flex-col items-center gap-6">
                <AcademyLogo size={80} withText={false} />

                <div>
                  <h3 className="text-2xl font-extrabold text-white mb-2">أكاديمية طيبة</h3>
                  <p className="text-green-300 text-sm font-medium">للدراسات القرآنية</p>
                </div>

                <div
                  className="px-5 py-3 rounded-2xl text-center"
                  style={{
                    background: 'rgba(45,106,79,0.3)',
                    border: '1px solid rgba(201,162,39,0.2)',
                  }}
                >
                  <p className="text-gold-300 text-sm font-bold">«اقرأ باسم ربك الذي خلق»</p>
                  <p className="text-green-400/70 text-xs mt-1">سورة العلق — أول آية نزلت</p>
                </div>
              </div>

              {/* Gold bottom accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: 'linear-gradient(90deg, transparent, #c9a227, transparent)' }}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-5 -left-4 rounded-2xl px-5 py-3 shadow-xl"
              style={{
                background: 'white',
                border: '1px solid #d8e8e1',
              }}
            >
              <p className="text-green-900 font-bold text-sm">+١٠ سنوات من العطاء العلمي</p>
              <p className="text-slate-400 text-xs mt-0.5">خدمة طلاب العلم عبر العالم</p>
            </motion.div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col text-right"
          >
            <SectionTitle
              title="عن أكاديمية طيبة"
              subtitle="رسالتنا تعليم القرآن وعلومه بمنهج أهل السنة وبأسانيد متصلة بالنبي ﷺ"
            />

            <div className="mt-6 text-slate-600 text-base leading-relaxed space-y-4">
              <p>
                تأسست أكاديمية طيبة للدراسات القرآنية لتكون جسراً حقيقياً بين طالبي العلم وبين نخبة علماء
                القرآن وعلومه من حفّاظ ومقرئين وشرعيين، في بيئة تعليمية رقمية راقية.
              </p>
              <p>
                نُقدّم برامج متكاملة في حفظ القرآن الكريم، أحكام التجويد، القراءات العشر، التفسير،
                والعلوم الشرعية المرتبطة — مع متابعة شخصية من كل شيخ لطلابه.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="flex gap-3 items-start p-4 rounded-2xl hover:shadow-sm transition-all"
                  style={{ background: '#f3f9f5', border: '1px solid #d6e9df' }}
                >
                  <div
                    className="p-2 rounded-xl shrink-0 mt-0.5"
                    style={{ background: 'rgba(45,106,79,0.1)', color: '#2d6a4f' }}
                  >
                    {v.icon}
                  </div>
                  <div>
                    <h4 className="text-green-900 font-bold text-sm mb-1">{v.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="mt-8 self-start inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all"
              style={{
                background: '#2d6a4f',
                color: 'white',
                boxShadow: '0 4px 16px rgba(45,106,79,0.3)',
              }}
            >
              اقرأ أكثر عن الأكاديمية
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
