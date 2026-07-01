import type { Metadata } from 'next';
import EmptyState from '@/components/ui/EmptyState';
import { ClipboardList } from 'lucide-react';

export const metadata: Metadata = { title: 'التسجيلات' };

export default function DashboardEnrollmentsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-green-900">التسجيلات</h2>
      </div>

      <div className="bg-white rounded-2xl border border-green-100 overflow-hidden">
        <EmptyState
          icon={<ClipboardList size={40} />}
          title="لا توجد تسجيلات بعد"
          description="ستظهر هنا تسجيلات الطلاب في الدورات"
        />
      </div>
    </div>
  );
}
