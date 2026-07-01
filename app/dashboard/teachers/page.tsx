import type { Metadata } from 'next';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import { Users, Plus } from 'lucide-react';

export const metadata: Metadata = { title: 'إدارة الشيوخ' };

export default function DashboardTeachersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-green-900">الشيوخ</h2>
        <Button size="sm">
          <Plus size={16} />
          إضافة شيخ
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-green-100 overflow-hidden">
        <EmptyState
          icon={<Users size={40} />}
          title="لا يوجد شيوخ بعد"
          description="ابدأ بإضافة أول شيخ للمنصة"
          action={
            <Button size="sm">
              <Plus size={16} />
              إضافة شيخ
            </Button>
          }
        />
      </div>
    </div>
  );
}
