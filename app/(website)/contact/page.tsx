import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import { Mail, Phone, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'تواصل معنا',
  description: 'تواصل مع أكاديمية طيبة للاستفسار أو الاقتراح',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="تواصل معنا"
        subtitle="نسعد بتواصلكم واستفساراتكم"
        breadcrumb="الرئيسية / تواصل معنا"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-green-900 text-2xl font-bold mb-6">معلومات التواصل</h2>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">البريد الإلكتروني</p>
                  <p className="text-slate-800 font-medium">info@typa-academy.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">الهاتف</p>
                  <p className="text-slate-800 font-medium" dir="ltr">+966 XX XXX XXXX</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">ساعات العمل</p>
                  <p className="text-slate-800 font-medium">السبت – الخميس، ٩ص – ٩م</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form placeholder */}
          <div className="bg-white rounded-2xl border border-green-100 p-8 shadow-sm">
            <h2 className="text-green-900 text-xl font-bold mb-6">أرسل رسالة</h2>
            <p className="text-slate-400 text-sm">سيتم تفعيل نموذج التواصل قريباً.</p>
          </div>
        </div>
      </section>
    </>
  );
}
