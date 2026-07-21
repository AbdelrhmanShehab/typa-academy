import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(5, 'العنوان قصير جداً'),
  image: z.string().url('رابط الصورة غير صالح').or(z.literal('')),
  category: z.string().min(1, 'التصنيف مطلوب'),
  tags: z.array(z.string()),
  content: z.string().min(50, 'المحتوى قصير جداً'),
  author: z.string().min(2, 'اسم الكاتب مطلوب'),
  publishDate: z.string().min(1, 'تاريخ النشر مطلوب'),
  featured: z.boolean(),
});

export type ArticleFormValues = z.infer<typeof articleSchema>;
