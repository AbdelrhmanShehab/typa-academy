import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import { BookOpen } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `تفاصيل الدورة`,
    description: `صفحة تفاصيل الدورة`,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <PageHeader
        title="تفاصيل الدورة"
        breadcrumb="الرئيسية / الدورات / التفاصيل"
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={<BookOpen size={48} />}
          title="سيتم تفعيل هذه الصفحة قريباً"
          description="صفحة تفاصيل الدورة ستكون جاهزة عند ربط الخدمات"
        />
      </section>
    </>
  );
}
