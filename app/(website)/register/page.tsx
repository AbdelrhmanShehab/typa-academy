'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormValues } from '@/lib/validations/auth.schema';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormValues) {
    try {
      setServerError('');
      await registerUser(data.email, data.password);
      router.push('/');
    } catch {
      setServerError('حدث خطأ أثناء إنشاء الحساب. حاول مرة أخرى.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 geometric-bg px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-green-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">ط</span>
          </div>
          <h1 className="text-green-900 text-2xl font-bold">إنشاء حساب جديد</h1>
          <p className="text-slate-500 text-sm mt-1">انضم إلى أكاديمية طيبة اليوم</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Input
            label="الاسم الكامل (بالعربية)"
            type="text"
            placeholder="محمد أحمد"
            error={errors.arabicName?.message}
            {...register('arabicName')}
          />
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
          <Input
            label="تأكيد كلمة المرور"
            type="password"
            placeholder="••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          {serverError && (
            <p className="text-sm text-red-600 text-center bg-red-50 border border-red-100 rounded-lg py-2">
              {serverError}
            </p>
          )}

          <Button type="submit" fullWidth loading={isSubmitting}>
            إنشاء الحساب
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          لديك حساب؟{' '}
          <Link href="/login" className="text-green-600 font-medium hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
