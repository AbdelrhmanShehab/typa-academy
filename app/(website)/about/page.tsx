import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'عن الأكاديمية',
  description: 'تعرف على أكاديمية طيبة ورسالتها وقيمها',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="عن أكاديمية طيبة"
        subtitle="رسالتنا، قيمنا، وما نؤمن به"
        breadcrumb="الرئيسية / عن الأكاديمية"
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-green max-w-none">
          <h2 className="text-green-900 text-2xl font-bold mb-4">من نحن</h2>
          <p className="text-slate-600 leading-loose text-lg mb-8">
            أكاديمية طيبة منصة إسلامية تعليمية تأسست بهدف نشر العلوم الشرعية
            الأصيلة وجعلها في متناول طلاب العلم في كل مكان، من خلال ربطهم بأهل
            العلم والعلماء الثقات.
          </p>

          <h2 className="text-green-900 text-2xl font-bold mb-4">رسالتنا</h2>
          <p className="text-slate-600 leading-loose text-lg mb-8">
            نسعى إلى تقديم تعليم شرعي رصين معتمد على الكتاب والسنة وفق فهم
            السلف الصالح، بأساليب تعليمية حديثة تناسب متطلبات العصر وتحافظ على
            الأصالة العلمية.
          </p>

          <h2 className="text-green-900 text-2xl font-bold mb-4">قيمنا</h2>
          <ul className="text-slate-600 space-y-2 leading-loose text-lg">
            <li>الأمانة العلمية والتحقق من المصادر</li>
            <li>ربط الطالب بأهل العلم المعتبرين</li>
            <li>تيسير العلم الشرعي للجميع</li>
            <li>التميز في جودة المحتوى التعليمي</li>
          </ul>
        </div>
      </section>
    </>
  );
}
