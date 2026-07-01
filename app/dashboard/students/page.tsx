import type { Metadata } from 'next';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import { GraduationCap, Plus } from 'lucide-react';

export const metadata: Metadata = { title: 'إدارة الطلاب' };

export default function DashboardStudentsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-green-900">الطلاب</h2>
      </div>

      <div className="bg-white rounded-2xl border border-green-100 overflow-hidden">
        <EmptyState
          icon={<GraduationCap size={40} />}
          title="لا يوجد طلاب بعد"
          description="سيظهر الطلاب هنا بعد تسجيلهم في المنصة"
        />
      </div>
    </div>
  );
}
