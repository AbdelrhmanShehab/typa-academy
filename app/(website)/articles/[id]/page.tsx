import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import { FileText } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `تفاصيل المقال`,
    description: `صفحة المقال`,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <PageHeader
        title="المقال"
        breadcrumb="الرئيسية / المقالات / المقال"
      />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={<FileText size={48} />}
          title="سيتم تفعيل هذه الصفحة قريباً"
          description="صفحة تفاصيل المقال ستكون جاهزة عند ربط الخدمات"
        />
      </section>
    </>
  );
}
