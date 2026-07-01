import type { Metadata } from 'next';
import {
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'لوحة التحكم',
};

const stats = [
  {
    label: 'إجمالي الشيوخ',
    value: '٠',
    icon: <Users size={20} />,
    color: 'text-green-600 bg-green-100',
  },
  {
    label: 'إجمالي الطلاب',
    value: '٠',
    icon: <GraduationCap size={20} />,
    color: 'text-blue-600 bg-blue-100',
  },
  {
    label: 'إجمالي الدورات',
    value: '٠',
    icon: <BookOpen size={20} />,
    color: 'text-gold-600 bg-gold-100',
  },
  {
    label: 'إجمالي التسجيلات',
    value: '٠',
    icon: <ClipboardList size={20} />,
    color: 'text-purple-600 bg-purple-100',
  },
];

export default function DashboardHomePage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-green-900">مرحباً بك في لوحة التحكم</h2>
        <p className="text-slate-500 text-sm mt-1">إليك ملخص بيانات المنصة</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-green-100 p-5 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-green-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity placeholder */}
      <div className="bg-white rounded-2xl border border-green-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-green-600" />
          <h3 className="font-semibold text-green-900">النشاط الأخير</h3>
        </div>
        <p className="text-slate-400 text-sm">
          سيتم عرض آخر التسجيلات والنشاطات هنا عند ربط قاعدة البيانات.
        </p>
      </div>
    </div>
  );
}
