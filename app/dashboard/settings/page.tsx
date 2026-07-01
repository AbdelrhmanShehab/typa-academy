import type { Metadata } from 'next';
import { Settings } from 'lucide-react';

export const metadata: Metadata = { title: 'الإعدادات' };

export default function DashboardSettingsPage() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Settings size={20} className="text-green-600" />
        <h2 className="text-xl font-bold text-green-900">الإعدادات</h2>
      </div>

      <div className="bg-white rounded-2xl border border-green-100 p-8">
        <p className="text-slate-400 text-sm">
          سيتم إضافة إعدادات الموقع هنا قريباً، مثل اسم الأكاديمية، معلومات التواصل، والإعدادات العامة.
        </p>
      </div>
    </div>
  );
}
