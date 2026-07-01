import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

export const registerSchema = z
  .object({
    arabicName: z.string().min(2, 'الاسم مطلوب'),
    email: z.string().email('البريد الإلكتروني غير صالح'),
    password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
    confirmPassword: z.string().min(6, 'تأكيد كلمة المرور مطلوب'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمة المرور وتأكيدها غير متطابقتين',
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
