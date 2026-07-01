import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import CourseCard from '@/components/ui/CourseCard';
import SearchBar from '@/components/ui/SearchBar';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'الدورات',
  description: 'استعرض جميع الدورات الشرعية المتاحة في أكاديمية طيبة',
};

export default function CoursesPage() {
  const courses: import('@/types').Course[] = [];

  return (
    <>
      <PageHeader
        title="الدورات الشرعية"
        subtitle="اختر من بين مجموعة متنوعة من الدورات العلمية المعتمدة"
        breadcrumb="الرئيسية / الدورات"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filters placeholder */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="w-full sm:w-72">
            {/* SearchBar is client-only, handled by a feature component when wired */}
          </div>
        </div>

        {courses.length === 0 ? (
          <EmptyState
            icon={<BookOpen size={48} />}
            title="لا توجد دورات بعد"
            description="سيتم إضافة الدورات قريباً"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
