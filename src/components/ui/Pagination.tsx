import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="التنقل بين الصفحات">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-slate-500 hover:bg-green-50 hover:text-green-700 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            'min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium',
            page === currentPage
              ? 'bg-green-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-green-50 hover:text-green-700',
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-slate-500 hover:bg-green-50 hover:text-green-700 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} />
      </button>
    </nav>
  );
}
