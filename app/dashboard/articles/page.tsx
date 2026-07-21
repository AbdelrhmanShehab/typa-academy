'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  Calendar,
  User,
  Star,
  BookOpen,
} from 'lucide-react';
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from '@/services/article.service';
import { uploadFile } from '@/services/storage.service';
import { Article } from '@/types';
import { articleSchema, ArticleFormValues } from '@/lib/validations/article.schema';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';

const ARTICLE_CATEGORIES = [
  'شروح علمية',
  'فتاوى وأحكام',
  'أخلاق وتزكية',
  'تاريخ وسير',
  'تربية إسلامية',
  'مقالات عامة',
];

export default function DashboardArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      image: '',
      category: '',
      tags: [],
      content: '',
      author: '',
      publishDate: '',
      featured: false,
    },
  });

  const currentImage = watch('image');

  // Load articles
  async function loadArticles() {
    setLoading(true);
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      console.error('Failed to load articles:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpenAdd = () => {
    setSelectedArticle(null);
    reset({
      title: '',
      image: '',
      category: ARTICLE_CATEGORIES[0],
      tags: [],
      content: '',
      author: 'إدارة الأكاديمية',
      publishDate: new Date().toISOString().split('T')[0],
      featured: false,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (article: Article) => {
    setSelectedArticle(article);
    reset({
      title: article.title,
      image: article.image || '',
      category: article.category,
      tags: article.tags || [],
      content: article.content,
      author: article.author,
      publishDate: article.publishDate,
      featured: article.featured || false,
    });
    setIsFormOpen(true);
  };

  const handleOpenDelete = (article: Article) => {
    setSelectedArticle(article);
    setIsDeleteOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadFile(file, 'articles');
      setValue('image', url);
    } catch (err) {
      console.error('Error uploading cover image:', err);
      alert('فشل رفع صورة الغلاف.');
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmitForm = async (values: ArticleFormValues) => {
    try {
      if (selectedArticle) {
        await updateArticle(selectedArticle.id, values);
      } else {
        await createArticle(values);
      }
      setIsFormOpen(false);
      loadArticles();
    } catch (err) {
      console.error('Error saving article:', err);
      alert('حدث خطأ أثناء حفظ المقال.');
    }
  };

  const onDeleteConfirm = async () => {
    if (!selectedArticle) return;
    try {
      await deleteArticle(selectedArticle.id);
      setIsDeleteOpen(false);
      loadArticles();
    } catch (err) {
      console.error('Error deleting article:', err);
      alert('حدث خطأ أثناء الحذف.');
    }
  };

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' ? true : article.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-green-900">إدارة المقالات والبحوث</h2>
          <p className="text-slate-500 text-xs mt-1">عرض وتنسيق المقالات والمنشورات بالمدونة</p>
        </div>
        <Button size="sm" onClick={handleOpenAdd}>
          <Plus size={16} />
          إضافة مقال جديد
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-green-50 shadow-sm flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="بحث في المقالات..."
            className="w-full pl-3 pr-10 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 bg-slate-50/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <select
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 bg-white"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">كل التصنيفات</option>
            {ARTICLE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <Loader2 className="animate-spin text-green-600" size={32} />
          <p className="text-slate-500 text-sm">جاري تحميل قائمة المقالات...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-green-100 overflow-hidden shadow-sm">
          <EmptyState
            icon={<FileText size={40} />}
            title="لا توجد مقالات"
            description={searchTerm || categoryFilter !== 'all' ? 'لا توجد نتائج تطابق معايير البحث' : 'ابدأ بكتابة أول مقال للمنصة الآن'}
            action={
              !searchTerm && categoryFilter === 'all' ? (
                <Button size="sm" onClick={handleOpenAdd}>
                  <Plus size={16} />
                  إضافة مقال
                </Button>
              ) : undefined
            }
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-green-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-green-50/50 text-slate-700 text-xs font-semibold border-b border-green-100">
                  <th className="px-6 py-4">المقال</th>
                  <th className="px-6 py-4">الكاتب</th>
                  <th className="px-6 py-4">التصنيف والوسوم</th>
                  <th className="px-6 py-4">تاريخ النشر</th>
                  <th className="px-6 py-4 text-center">مميز</th>
                  <th className="px-6 py-4 text-left">العمليات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 rounded overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          {article.image ? (
                            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-green-50 text-green-700">
                              <FileText size={16} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-green-950 max-w-[280px] truncate">{article.title}</p>
                          <p className="text-xs text-slate-400 truncate max-w-[280px]">
                            {article.content.substring(0, 50)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-slate-700">
                        <User size={12} className="text-slate-400" /> {article.author}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-slate-800">{article.category}</span>
                        <div className="flex flex-wrap gap-0.5">
                          {(article.tags || []).map((t) => (
                            <span key={t} className="text-[10px] bg-slate-100 px-1 rounded text-slate-500">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      <span className="flex items-center gap-1 text-xs">
                        <Calendar size={12} className="text-slate-400" /> {article.publishDate}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {article.featured ? (
                        <span className="inline-flex items-center gap-0.5 text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Star size={12} className="fill-amber-500 text-amber-500" /> نعم
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">لا</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(article)}
                          className="p-1 text-slate-500 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                          title="تعديل"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(article)}
                          className="p-1 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          title="حذف"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedArticle ? 'تعديل المقال' : 'إضافة مقال جديد'}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div className="max-h-[65vh] overflow-y-auto px-1 space-y-4">
            {/* Cover image upload */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-24 h-16 rounded overflow-hidden bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0">
                {currentImage ? (
                  <img src={currentImage} alt="Cover Preview" className="w-full h-full object-cover" />
                ) : (
                  <FileText size={24} className="text-slate-400" />
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">صورة غلاف المقال</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    id="article-image-upload"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="article-image-upload"
                    className="px-3 py-1.5 bg-white border border-slate-200 text-xs font-medium rounded-lg text-green-700 hover:bg-slate-50 cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 size={12} className="animate-spin" />
                        جاري الرفع...
                      </>
                    ) : (
                      'اختر صورة غلاف'
                    )}
                  </label>
                  {currentImage && (
                    <button
                      type="button"
                      onClick={() => setValue('image', '')}
                      className="p-1 text-red-500 hover:bg-red-50 rounded text-xs"
                    >
                      حذف
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input
                  label="عنوان المقال الرئيسي"
                  placeholder="مثال: من معالم العقيدة الصحيحة وآثارها"
                  {...register('title')}
                  error={errors.title?.message}
                />
              </div>

              <Select
                label="التصنيف"
                options={ARTICLE_CATEGORIES.map((cat) => ({ value: cat, label: cat }))}
                {...register('category')}
                error={errors.category?.message}
              />

              <Input
                label="اسم الكاتب"
                placeholder="مثال: الشيخ أحمد الباز"
                {...register('author')}
                error={errors.author?.message}
              />

              <Input
                label="تاريخ النشر"
                type="date"
                {...register('publishDate')}
                error={errors.publishDate?.message}
              />

              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-green-600 focus:ring-green-500 w-4 h-4"
                    {...register('featured')}
                  />
                  مقال مميز (يظهر في الواجهة الرئيسية)
                </label>
              </div>

              <div className="col-span-2">
                <Input
                  label="الوسوم (مفصولة بفواصل)"
                  placeholder="مثال: عقيدة, فقه, تزكية"
                  onChange={(e) => {
                    const tagList = e.target.value.split(',').map((x) => x.trim()).filter(Boolean);
                    setValue('tags', tagList);
                  }}
                />
              </div>

              <div className="col-span-2">
                <Textarea
                  label="محتوى المقال الكامل"
                  placeholder="اكتب نص المقال بالتفصيل هنا..."
                  rows={10}
                  {...register('content')}
                  error={errors.content?.message}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsFormOpen(false)}
            >
              إلغاء
            </Button>
            <Button type="submit" size="sm" loading={isSubmitting}>
              {selectedArticle ? 'حفظ التعديلات' : 'إضافة المقال'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="تأكيد حذف المقال"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">
            هل أنت متأكد من رغبتك في حذف المقال{' '}
            <strong className="text-green-900">"{selectedArticle?.title}"</strong>؟
            هذا الإجراء سيقوم بحذف المقال وغلافه بشكل نهائي من المدونة.
          </p>
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteOpen(false)}
            >
              تراجع
            </Button>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={onDeleteConfirm}
            >
              تأكيد الحذف
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
