import { Article } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import Badge from './Badge';
import { formatDate, truncate } from '@/utils';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="group block bg-white rounded-2xl border border-green-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-green-200"
    >
      {/* Image */}
      <div className="relative h-44 bg-green-50">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-green-100 to-green-200">
            <span className="text-green-400 text-3xl font-bold">
              {article.title.charAt(0)}
            </span>
          </div>
        )}
        {article.featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="gold">مميز</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-2">
          <Badge variant="outline">{article.category}</Badge>
        </div>

        <h3 className="text-green-900 font-bold text-base mb-2 group-hover:text-green-700 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-slate-500 text-sm mb-4 line-clamp-2">
          {truncate(article.content.replace(/<[^>]+>/g, ''), 100)}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-100">
          <span className="flex items-center gap-1">
            <User size={13} />
            {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={13} />
            {formatDate(article.publishDate)}
          </span>
        </div>
      </div>
    </Link>
  );
}
