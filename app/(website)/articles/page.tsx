import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import ArticleCard from '@/components/ui/ArticleCard';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'المقالات',
  description: 'اقرأ أحدث المقالات الإسلامية والشرعية في أكاديمية طيبة',
};

export default function ArticlesPage() {
  const articles: import('@/types').Article[] = [];

  return (
    <>
      <PageHeader
        title="المقالات الإسلامية"
        subtitle="أحدث المقالات والكتابات الشرعية من علماء الأكاديمية"
        breadcrumb="الرئيسية / المقالات"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {articles.length === 0 ? (
          <EmptyState
            icon={<FileText size={48} />}
            title="لا توجد مقالات بعد"
            description="سيتم نشر المقالات قريباً"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
