'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Loader2, Lock, Mail, ShieldCheck } from 'lucide-react';

const schema = z.object({
  email: z.string().email('بريد إلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});
type FormValues = z.infer<typeof schema>;

export default function DashboardLoginPage() {
  const { login, user, isAdmin, isTeacher, loading } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  // Redirect if already authenticated as admin/teacher
  useEffect(() => {
    if (!loading && user && (isAdmin || isTeacher)) {
      router.replace('/dashboard');
    }
  }, [user, isAdmin, isTeacher, loading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    try {
      setServerError('');
      await login(data.email, data.password);
      // After login, onAuthStateChange fires → role is fetched → useEffect above redirects
    } catch {
      setServerError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  }

  // Show spinner only briefly while redirecting an already-logged-in admin
  if (!loading && user && (isAdmin || isTeacher)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <Loader2 className="animate-spin text-green-400" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #22c55e 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <ShieldCheck size={28} className="text-white" />
            </div>
            <h1 className="text-white text-2xl font-bold">لوحة تحكم الأكاديمية</h1>
            <p className="text-slate-400 text-sm mt-1">للمشرفين والمعلمين فقط</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                <Mail size={14} className="text-green-400" />
                البريد الإلكتروني
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                autoComplete="email"
                className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
                <Lock size={14} className="text-green-400" />
                كلمة المرور
              </label>
              <input
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-400 text-xs">{errors.password.message}</p>
              )}
            </div>

            {serverError && (
              <div className="bg-red-900/40 border border-red-700 rounded-xl px-4 py-3 text-red-300 text-sm text-center">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-150 shadow-lg shadow-green-900/30"
            >
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <ShieldCheck size={18} />
              )}
              {isSubmitting ? 'جاري الدخول...' : 'دخول'}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-4">
          هذه الصفحة مخصصة للإدارة فقط
        </p>
      </div>
    </div>
  );
}
