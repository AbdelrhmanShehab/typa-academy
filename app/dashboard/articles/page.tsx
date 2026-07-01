import type { Metadata } from 'next';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import { FileText, Plus } from 'lucide-react';

export const metadata: Metadata = { title: 'إدارة المقالات' };

export default function DashboardArticlesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-green-900">المقالات</h2>
        <Button size="sm">
          <Plus size={16} />
          إضافة مقال
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-green-100 overflow-hidden">
        <EmptyState
          icon={<FileText size={40} />}
          title="لا توجد مقالات بعد"
          description="ابدأ بإضافة أول مقال"
          action={
            <Button size="sm">
              <Plus size={16} />
              إضافة مقال
            </Button>
          }
        />
      </div>
    </div>
  );
}
