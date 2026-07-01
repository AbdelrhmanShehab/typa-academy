'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DASHBOARD_NAV_LINKS, APP_NAME } from '@/constants';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Video,
  ClipboardList,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/cn';

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={18} />,
  Users: <Users size={18} />,
  GraduationCap: <GraduationCap size={18} />,
  BookOpen: <BookOpen size={18} />,
  Video: <Video size={18} />,
  ClipboardList: <ClipboardList size={18} />,
  FileText: <FileText size={18} />,
  Settings: <Settings size={18} />,
};

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-green-900 text-green-100 border-l border-green-800">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-green-800">
        <div className="w-8 h-8 rounded-full bg-gold-400 flex items-center justify-center shrink-0">
          <span className="text-green-900 font-bold text-sm">ط</span>
        </div>
        <div>
          <p className="text-white font-bold text-sm">{APP_NAME}</p>
          <p className="text-green-400 text-xs">لوحة التحكم</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {DASHBOARD_NAV_LINKS.map((link) => {
          const isActive =
            link.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                isActive
                  ? 'bg-green-700 text-white'
                  : 'text-green-300 hover:bg-green-800 hover:text-white',
              )}
            >
              <span className={isActive ? 'text-gold-400' : ''}>
                {iconMap[link.icon]}
              </span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-green-800">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-green-400 hover:bg-green-800 hover:text-white w-full">
          <LogOut size={18} />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
