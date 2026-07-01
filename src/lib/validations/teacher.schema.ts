import { z } from 'zod';

export const socialLinkSchema = z.object({
  platform: z.string().min(1, 'المنصة مطلوبة'),
  url: z.string().url('رابط غير صالح'),
});

export const bookSchema = z.object({
  title: z.string().min(1, 'عنوان الكتاب مطلوب'),
  year: z.number().optional(),
  publisher: z.string().optional(),
});

export const certificateSchema = z.object({
  title: z.string().min(1, 'عنوان الشهادة مطلوب'),
  institution: z.string().min(1, 'المؤسسة مطلوبة'),
  year: z.number().optional(),
});

export const teacherSchema = z.object({
  arabicName: z.string().min(2, 'الاسم مطلوب'),
  photo: z.string().url('رابط الصورة غير صالح').or(z.literal('')),
  biography: z.string().min(10, 'السيرة الذاتية قصيرة جداً'),
  nationality: z.string().min(1, 'الجنسية مطلوبة'),
  specialization: z.string().min(1, 'التخصص مطلوب'),
  education: z.string().min(1, 'المؤهل العلمي مطلوب'),
  university: z.string().min(1, 'الجامعة مطلوبة'),
  ijazah: z.string().min(1, 'الإجازة مطلوبة'),
  experience: z.string().min(1, 'الخبرة مطلوبة'),
  languages: z.array(z.string()).min(1, 'يجب إضافة لغة واحدة على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  phone: z.string().min(7, 'رقم الهاتف غير صالح'),
  socialLinks: z.array(socialLinkSchema).default([]),
  books: z.array(bookSchema).default([]),
  certificates: z.array(certificateSchema).default([]),
  status: z.enum(['active', 'inactive']),
});

export type TeacherFormValues = z.infer<typeof teacherSchema>;
