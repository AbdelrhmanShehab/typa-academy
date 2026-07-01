import type { Metadata } from 'next';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import { Video, Plus } from 'lucide-react';

export const metadata: Metadata = { title: 'إدارة الدروس' };

export default function DashboardLessonsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-green-900">الدروس</h2>
        <Button size="sm">
          <Plus size={16} />
          إضافة درس
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-green-100 overflow-hidden">
        <EmptyState
          icon={<Video size={40} />}
          title="لا توجد دروس بعد"
          description="أضف دروساً لدوراتك المسجلة"
          action={
            <Button size="sm">
              <Plus size={16} />
              إضافة درس
            </Button>
          }
        />
      </div>
    </div>
  );
}
