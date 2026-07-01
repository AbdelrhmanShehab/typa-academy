'use client';

import { Search } from 'lucide-react';
import { cn } from '@/lib/cn';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'ابحث...',
  className,
}: SearchBarProps) {
  return (
    <div className={cn('relative', className)}>
      <Search
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pr-10 pl-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 placeholder:text-slate-400"
      />
    </div>
  );
}
