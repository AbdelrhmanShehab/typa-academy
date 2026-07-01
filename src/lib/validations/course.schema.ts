import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string().min(2, 'عنوان الدورة مطلوب'),
  arabicTitle: z.string().min(2, 'العنوان بالعربية مطلوب'),
  slug: z
    .string()
    .min(2, 'الرابط مطلوب')
    .regex(/^[a-z0-9-]+$/, 'الرابط يجب أن يحتوي على أحرف إنجليزية صغيرة وأرقام وشرطة فقط'),
  description: z.string().min(20, 'الوصف قصير جداً'),
  thumbnail: z.string().url('رابط الصورة المصغرة غير صالح').or(z.literal('')),
  teacherId: z.string().min(1, 'يجب اختيار الشيخ'),
  category: z.string().min(1, 'التصنيف مطلوب'),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  language: z.string().min(1, 'اللغة مطلوبة'),
  duration: z.string().min(1, 'المدة مطلوبة'),
  startDate: z.string().min(1, 'تاريخ البدء مطلوب'),
  endDate: z.string().min(1, 'تاريخ الانتهاء مطلوب'),
  price: z.number().min(0, 'السعر يجب أن يكون صفراً أو أكثر'),
  isFree: z.boolean(),
  enrollmentLimit: z.number().min(1, 'حد التسجيل يجب أن يكون 1 على الأقل'),
  requirements: z.string().default(''),
  objectives: z.string().min(1, 'أهداف الدورة مطلوبة'),
  targetAudience: z.string().min(1, 'الفئة المستهدفة مطلوبة'),
  certificate: z.boolean(),
  status: z.enum(['draft', 'published', 'archived']),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
