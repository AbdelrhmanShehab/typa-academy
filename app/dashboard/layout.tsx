'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, role, loading, isAdmin, isTeacher } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/dashboard/login';

  useEffect(() => {
    if (loading || isLoginPage) return;
    // Not logged in at all → go to dashboard login
    if (!user) {
      router.replace('/dashboard/login');
      return;
    }
    // Logged in but not admin/teacher (e.g. a student) → also block
    if (!isAdmin && !isTeacher) {
      router.replace('/dashboard/login');
    }
  }, [user, role, loading, isAdmin, isTeacher, isLoginPage, router]);

  // Render login page directly without blocking with auth guard
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show spinner while determining auth state
  if (loading || !user || (!isAdmin && !isTeacher)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <Loader2 className="animate-spin text-green-400" size={32} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="لوحة التحكم" />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
