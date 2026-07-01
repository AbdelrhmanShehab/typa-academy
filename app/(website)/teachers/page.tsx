import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import TeacherCard from '@/components/ui/TeacherCard';
import { Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'الشيوخ',
  description: 'تعرف على نخبة العلماء والمشايخ في أكاديمية طيبة',
};

export default function TeachersPage() {
  // Teachers will be fetched and rendered when services are wired up
  const teachers: import('@/types').Teacher[] = [];

  return (
    <>
      <PageHeader
        title="الشيوخ والعلماء"
        subtitle="نخبة من علماء الأمة يقدمون العلم الشرعي الأصيل"
        breadcrumb="الرئيسية / الشيوخ"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {teachers.length === 0 ? (
          <EmptyState
            icon={<Users size={48} />}
            title="لا يوجد شيوخ بعد"
            description="سيتم إضافة الشيوخ قريباً"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
