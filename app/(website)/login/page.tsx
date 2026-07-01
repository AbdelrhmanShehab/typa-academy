'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormValues } from '@/lib/validations/auth.schema';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      setServerError('');
      await login(data.email, data.password);
      router.push('/');
    } catch {
      setServerError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 geometric-bg px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-green-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">ط</span>
          </div>
          <h1 className="text-green-900 text-2xl font-bold">تسجيل الدخول</h1>
          <p className="text-slate-500 text-sm mt-1">أهلاً بك في أكاديمية طيبة</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Input
            label="البريد الإلكتروني"
            type="email"
            placeholder="example@email.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="كلمة المرور"
            type="password"
            placeholder="••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          {serverError && (
            <p className="text-sm text-red-600 text-center bg-red-50 border border-red-100 rounded-lg py-2">
              {serverError}
            </p>
          )}

          <Button type="submit" fullWidth loading={isSubmitting}>
            دخول
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          ليس لديك حساب؟{' '}
          <Link href="/register" className="text-green-600 font-medium hover:underline">
            إنشاء حساب
          </Link>
        </p>
      </div>
    </div>
  );
}
