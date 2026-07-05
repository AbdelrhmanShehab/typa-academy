'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="py-24 bg-manuscript-bg border-b border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* ── Left Column: Mission & Vision (Col span 5 on lg) ── */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-24 order-2 lg:order-1">
            
            {/* Mission Box */}
            <div className="p-8 bg-white border border-gold-500/10 rounded-lg shadow-sm text-right">
              <span className="text-gold-500 text-xs font-bold tracking-widest uppercase block mb-2">
                رسالتنا
              </span>
              <h3 className="text-xl font-bold text-green-900 mb-4">
                تيسير العلوم الشرعية
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                تقديم برامج تعليمية متميزة في حفظ القرآن وتلقي العلوم الشرعية وفق منهج أهل السنة والجماعة، بالاستعانة بالتقنية الحديثة لتصل لراغبي العلم في جميع أنحاء العالم.
              </p>
            </div>

            {/* Vision Box */}
            <div className="p-8 bg-white border border-gold-500/10 rounded-lg shadow-sm text-right">
              <span className="text-gold-500 text-xs font-bold tracking-widest uppercase block mb-2">
                رؤيتنا
              </span>
              <h3 className="text-xl font-bold text-green-900 mb-4">
                الريادة والأصالة العلمية
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                أن نكون المرجع الأول لتعليم القرآن الكريم وعلومه عبر الفضاء الرقمي، محافظين على أصالة التلقي بالسند المتصل ومعايير الجودة الأكاديمية والتربوية.
              </p>
            </div>
            
          </div>

          {/* ── Right Column: Story & Methodology (Col span 7 on lg) ── */}
          <div className="lg:col-span-7 text-right order-1 lg:order-2">
            <span className="text-gold-500 text-xs font-bold tracking-widest uppercase block mb-3">
              نشأة وأهداف الأكاديمية
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-900 leading-tight mb-8">
              عن أكاديمية طيبة للدراسات القرآنية
            </h2>
            <div className="w-16 h-0.5 bg-gold-500 mb-8" />

            <div className="space-y-6 text-slate-700 text-base lg:text-lg leading-relaxed">
              <p>
                انطلقت أكاديمية طيبة للدراسات القرآنية لتكون منارة علمية تهدف إلى سد الفجوة بين طالبي العلم وبين كبار العلماء والمقرئين الموثوقين. جاءت الفكرة لتوفير محضن تربوي وعلمي متكامل يجمع بين رصانة المنهج وسهولة التلقي.
              </p>
              <p>
                تحت الإشراف الكامل والمباشر لفضيلة الشيخ أحمد منصور، تم بناء مناهج دراسية شاملة ومتدرجة تتناول تلاوة القرآن الكريم وحفظه، مع دراسة أحكام التجويد، والقراءات، والعلوم الشرعية المصاحبة كالتفسير، والحديث، والعقيدة، والفقه الشريف.
              </p>
              <h3 className="text-xl font-bold text-green-900 pt-4 pb-2">
                منهجيتنا التعليمية والتربوية
              </h3>
              <p>
                نؤمن بأن العلم لا يؤخذ إلا بالتلقي المباشر والمشافهة عن أهل العلم الحافظين المتقنين. لذلك، فإن برامجنا تعتمد كلياً على المشافهة مع المشايخ ذوي الأسانيد المتصلة، مع مراعاة التدرج في التحصيل العلمي من المستويات التأسيسية وصولاً إلى الإجازة والقراءات العشر.
              </p>
              <p>
                تلتزم الأكاديمية بتوفير بيئة تفاعلية تسمح للطالب بالنقاش المباشر، وأداء التكاليف وحل الاختبارات الدورية للحصول على شهادات معتمدة توثق مسيرته العلمية.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
