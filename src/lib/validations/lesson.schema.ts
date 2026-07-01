import { z } from 'zod';

export const lessonSchema = z.object({
  courseId: z.string().min(1, 'الدورة مطلوبة'),
  title: z.string().min(2, 'عنوان الدرس مطلوب'),
  videoUrl: z.string().url('رابط الفيديو غير صالح'),
  duration: z.string().min(1, 'المدة مطلوبة'),
  order: z.number().min(1, 'الترتيب يجب أن يكون 1 على الأقل'),
  summary: z.string().default(''),
  homework: z.string().default(''),
  attachments: z
    .array(
      z.object({
        name: z.string().min(1, 'اسم المرفق مطلوب'),
        url: z.string().url('رابط المرفق غير صالح'),
      }),
    )
    .default([]),
  resources: z
    .array(
      z.object({
        title: z.string().min(1, 'عنوان المصدر مطلوب'),
        url: z.string().url('رابط المصدر غير صالح'),
        type: z.enum(['link', 'pdf', 'document']),
      }),
    )
    .default([]),
});

export type LessonFormValues = z.infer<typeof lessonSchema>;
