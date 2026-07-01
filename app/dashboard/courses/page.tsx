import type { Metadata } from 'next';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import { BookOpen, Plus } from 'lucide-react';

export const metadata: Metadata = { title: 'إدارة الدورات' };

export default function DashboardCoursesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-green-900">الدورات</h2>
        <Button size="sm">
          <Plus size={16} />
          إضافة دورة
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-green-100 overflow-hidden">
        <EmptyState
          icon={<BookOpen size={40} />}
          title="لا توجد دورات بعد"
          description="ابدأ بإضافة أول دورة للمنصة"
          action={
            <Button size="sm">
              <Plus size={16} />
              إضافة دورة
            </Button>
          }
        />
      </div>
    </div>
  );
}
