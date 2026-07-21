import { z } from 'zod';

export const studentBookSchema = z.object({
  title: z.string().min(1, 'عنوان الكتاب/المتن مطلوب'),
  author: z.string().optional(),
});

export const studentSchema = z.object({
  arabicName: z.string().min(2, 'الاسم مطلوب'),
  photo: z.string().url('رابط الصورة غير صالح').or(z.literal('')),
  biography: z.string().min(10, 'السيرة الذاتية قصيرة جداً'),
  nationality: z.string().min(1, 'الجنسية مطلوبة'),
  languages: z.array(z.string()).min(1, 'يجب تحديد لغة واحدة على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  phone: z.string().min(7, 'رقم الهاتف غير صالح'),
  books: z.array(studentBookSchema),
});

export type StudentFormValues = z.infer<typeof studentSchema>;
