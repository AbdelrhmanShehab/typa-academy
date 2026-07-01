'use client';

import { Bell, User, Menu } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export default function DashboardHeader({
  title,
  onMenuClick,
}: DashboardHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-green-50"
          aria-label="القائمة"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-green-900 font-bold text-lg">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-500 hover:bg-green-50">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <User size={16} className="text-green-600" />
          </div>
          <span className="text-sm font-medium text-slate-700 hidden sm:block">
            المدير
          </span>
        </button>
      </div>
    </header>
  );
}
