import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import { User } from 'lucide-react';

// Dynamic detail pages will be implemented when services are wired up
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `تفاصيل الشيخ`,
    description: `صفحة تفاصيل الشيخ`,
  };
}

export default async function TeacherDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <PageHeader
        title="تفاصيل الشيخ"
        breadcrumb="الرئيسية / الشيوخ / التفاصيل"
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={<User size={48} />}
          title="سيتم تفعيل هذه الصفحة قريباً"
          description="صفحة تفاصيل الشيخ ستكون جاهزة عند ربط الخدمات"
        />
      </section>
    </>
  );
}
