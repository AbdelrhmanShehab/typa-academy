'use client';

import { motion } from 'framer-motion';

export default function MessageSection() {
  return (
    <section className="py-20 bg-white border-b border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-gold-500 text-xs font-bold tracking-widest uppercase block mb-3">
            كلمة المشرف العام
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-900 leading-tight">
            رسالة من فضيلة الشيخ أحمد منصور
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── Video Column (Col span 6 on lg) ── */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-manuscript-bg rounded-lg overflow-hidden border border-gold-500/15 shadow-md aspect-video relative">
              <video
                src="/videos/sheikh-message.mp4"
                poster="/images/sheikh-ahmed-mansour.png"
                controls
                className="w-full h-full object-cover"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-slate-700">
                  <p className="font-bold mb-2">رسالة مرئية من فضيلة الشيخ أحمد منصور</p>
                  <p className="text-xs">المشغل غير مدعوم في متصفحك أو الملف غير متوفر حالياً.</p>
                </div>
              </video>
            </div>
          </div>

          {/* ── Message / Text Column (Col span 6 on lg) ── */}
          <div className="lg:col-span-6 text-right flex flex-col justify-center">
            <h3 className="text-xl lg:text-2xl font-bold text-green-900 mb-6">
              أهلاً بكم في رحاب العلم الشريف
            </h3>
            
            <div className="space-y-4 text-slate-700 text-base leading-relaxed mb-8">
              <p>
                «إن تعلم القرآن الكريم وتعليمه هو من أعظم القربات إلى الله سبحانه وتعالى، وبوابة الفهم الصحيح لديننا الحنيف. نسعى في أكاديمية طيبة إلى تقريب العلوم الشرعية وتيسير دراستها وفق منهج علمي دقيق وموثق.»
              </p>
              <p>
                «نسأل الله عز وجل أن يتقبل منا ومنكم هذا العمل خالصاً لوجهه الكريم، وأن يرزقنا وإياكم الإخلاص في القول والعمل والقبول في طلب العلم ونشره.»
              </p>
            </div>

            {/* Signature */}
            <div className="mb-8">
              <p className="text-slate-500 text-xs mb-1">المشرف العام على الأكاديمية</p>
              <p className="font-serif text-2xl text-gold-500 leading-none">
                أحمد منصور
              </p>
            </div>

            {/* Button */}
            <div className="self-start">
              <a
                href="#meet-sheikh"
                className="inline-block px-7 py-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-colors shadow-sm text-sm"
              >
                تعرف على الشيخ
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
