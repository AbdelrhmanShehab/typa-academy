'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  DollarSign,
  Clock,
  Award,
  Video,
  Eye,
} from 'lucide-react';
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from '@/services/course.service';
import { getTeachers } from '@/services/teacher.service';
import { uploadFile } from '@/services/storage.service';
import { Course, Teacher } from '@/types';
import { courseSchema, CourseFormValues } from '@/lib/validations/course.schema';
import { COURSE_CATEGORIES, COURSE_LEVELS } from '@/constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';
import Link from 'next/link';

export default function DashboardCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      arabicTitle: '',
      slug: '',
      description: '',
      thumbnail: '',
      teacherId: '',
      category: '',
      level: 'beginner',
      language: 'العربية',
      duration: '',
      startDate: '',
      endDate: '',
      price: 0,
      isFree: true,
      enrollmentLimit: 100,
      requirements: '',
      objectives: '',
      targetAudience: '',
      certificate: true,
      status: 'draft',
    },
  });

  const currentThumbnail = watch('thumbnail');
  const isFreeField = watch('isFree');

  // Load courses and teachers
  async function loadData() {
    setLoading(true);
    try {
      const [coursesData, teachersData] = await Promise.all([
        getCourses(),
        getTeachers(),
      ]);
      setCourses(coursesData);
      setTeachers(teachersData);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setSelectedCourse(null);
    reset({
      title: '',
      arabicTitle: '',
      slug: '',
      description: '',
      thumbnail: '',
      teacherId: teachers[0]?.id || '',
      category: COURSE_CATEGORIES[0] || '',
      level: 'beginner',
      language: 'العربية',
      duration: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: 0,
      isFree: true,
      enrollmentLimit: 100,
      requirements: '',
      objectives: '',
      targetAudience: '',
      certificate: true,
      status: 'draft',
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setSelectedCourse(course);
    reset({
      title: course.title,
      arabicTitle: course.arabicTitle,
      slug: course.slug,
      description: course.description,
      thumbnail: course.thumbnail,
      teacherId: course.teacherId,
      category: course.category,
      level: course.level,
      language: course.language || 'العربية',
      duration: course.duration,
      startDate: course.startDate,
      endDate: course.endDate,
      price: course.price,
      isFree: course.isFree,
      enrollmentLimit: course.enrollmentLimit,
      requirements: course.requirements || '',
      objectives: course.objectives,
      targetAudience: course.targetAudience,
      certificate: course.certificate,
      status: course.status,
    });
    setIsFormOpen(true);
  };

  const handleOpenDelete = (course: Course) => {
    setSelectedCourse(course);
    setIsDeleteOpen(true);
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingThumbnail(true);
    try {
      const url = await uploadFile(file, 'courses');
      setValue('thumbnail', url);
    } catch (err) {
      console.error('Error uploading thumbnail:', err);
      alert('فشل رفع الصورة المصغرة.');
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const onSubmitForm = async (values: CourseFormValues) => {
    try {
      if (selectedCourse) {
        await updateCourse(selectedCourse.id, values);
      } else {
        await createCourse(values);
      }
      setIsFormOpen(false);
      loadData();
    } catch (err) {
      console.error('Error saving course:', err);
      alert('حدث خطأ أثناء حفظ الدورة.');
    }
  };

  const onDeleteConfirm = async () => {
    if (!selectedCourse) return;
    try {
      await deleteCourse(selectedCourse.id);
      setIsDeleteOpen(false);
      loadData();
    } catch (err) {
      console.error('Error deleting course:', err);
      alert('حدث خطأ أثناء الحذف.');
    }
  };

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.arabicTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' ? true : course.category === categoryFilter;

    const matchesStatus =
      statusFilter === 'all' ? true : course.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get teacher name
  const getTeacherName = (id: string) => {
    const teacher = teachers.find((t) => t.id === id);
    return teacher ? teacher.arabicName : 'شيخ غير معروف';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-green-900">إدارة الدورات</h2>
          <p className="text-slate-500 text-xs mt-1">إنشاء وتعديل وتفصيل الدورات والبرامج العلمية</p>
        </div>
        <Button size="sm" onClick={handleOpenAdd}>
          <Plus size={16} />
          إضافة دورة جديدة
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-green-50 shadow-sm flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="بحث باسم الدورة..."
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
            {COURSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-44">
          <select
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">كل الحالات</option>
            <option value="draft">مسودة</option>
            <option value="published">منشورة</option>
            <option value="archived">مؤرشفة</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <Loader2 className="animate-spin text-green-600" size={32} />
          <p className="text-slate-500 text-sm">جاري تحميل قائمة الدورات...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-green-100 overflow-hidden shadow-sm">
          <EmptyState
            icon={<BookOpen size={40} />}
            title="لا توجد دورات"
            description={searchTerm || categoryFilter !== 'all' || statusFilter !== 'all' ? 'لا توجد نتائج تطابق معايير البحث' : 'ابدأ بإضافة أول دورة للمنصة الآن'}
            action={
              !searchTerm && categoryFilter === 'all' && statusFilter === 'all' ? (
                <Button size="sm" onClick={handleOpenAdd}>
                  <Plus size={16} />
                  إضافة دورة
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
                  <th className="px-6 py-4">الدورة</th>
                  <th className="px-6 py-4">الشيخ المدرس</th>
                  <th className="px-6 py-4">التصنيف والمستوى</th>
                  <th className="px-6 py-4">المدة والطلاب</th>
                  <th className="px-6 py-4">السعر</th>
                  <th className="px-6 py-4 text-center">الحالة</th>
                  <th className="px-6 py-4 text-left">العمليات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 rounded overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          {course.thumbnail ? (
                            <img src={course.thumbnail} alt={course.arabicTitle} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-green-50 text-green-700">
                              <BookOpen size={16} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-green-950">{course.arabicTitle}</p>
                          <p className="text-[10px] text-slate-400 truncate max-w-[200px]" dir="ltr">
                            {course.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getTeacherName(course.teacherId)}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-slate-800">{course.category}</span>
                        <span className="text-xs text-slate-400">
                          {COURSE_LEVELS.find((l) => l.value === course.level)?.label || course.level}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {course.duration}
                        </span>
                        <span>الحد: {course.enrollmentLimit} طالب</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {course.isFree ? (
                        <span className="text-green-600 font-semibold text-xs bg-green-50 px-2 py-0.5 rounded">مجانية</span>
                      ) : (
                        <span className="font-semibold text-slate-800">{course.price} ر.س</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          course.status === 'published'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : course.status === 'archived'
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {course.status === 'published' ? 'منشورة' : course.status === 'archived' ? 'مؤرشفة' : 'مسودة'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/lessons?courseId=${course.id}`}
                          className="p-1 text-slate-500 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                          title="عرض الدروس"
                        >
                          <Video size={16} />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(course)}
                          className="p-1 text-slate-500 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                          title="تعديل"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(course)}
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
        title={selectedCourse ? 'تعديل الدورة العلمية' : 'إضافة دورة جديدة'}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div className="max-h-[65vh] overflow-y-auto px-1 space-y-4">
            {/* Thumbnail upload */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-24 h-16 rounded overflow-hidden bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0">
                {currentThumbnail ? (
                  <img src={currentThumbnail} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                ) : (
                  <BookOpen size={24} className="text-slate-400" />
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">الصورة المصغرة للدورة</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    id="thumbnail-upload"
                    className="hidden"
                    onChange={handleThumbnailUpload}
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="px-3 py-1.5 bg-white border border-slate-200 text-xs font-medium rounded-lg text-green-700 hover:bg-slate-50 cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                  >
                    {uploadingThumbnail ? (
                      <>
                        <Loader2 size={12} className="animate-spin" />
                        جاري الرفع...
                      </>
                    ) : (
                      'اختر صورة'
                    )}
                  </label>
                  {currentThumbnail && (
                    <button
                      type="button"
                      onClick={() => setValue('thumbnail', '')}
                      className="p-1 text-red-500 hover:bg-red-50 rounded text-xs"
                    >
                      حذف
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="عنوان الدورة (بالعربية)"
                placeholder="مثال: شرح المقدمة الآجرومية في النحو"
                {...register('arabicTitle')}
                error={errors.arabicTitle?.message}
              />

              <Input
                label="الرابط الفريد (Slug - بالإنجليزية)"
                placeholder="ajrumiyah-sharh"
                {...register('slug')}
                error={errors.slug?.message}
              />

              <div className="col-span-2">
                <Input
                  label="العنوان بالإنجليزية (لأغراض البحث والنظام)"
                  placeholder="Example: Explanation of Al-Ajrumiyah"
                  {...register('title')}
                  error={errors.title?.message}
                />
              </div>

              <Select
                label="الشيخ المدرس"
                options={teachers.map((t) => ({ value: t.id, label: t.arabicName }))}
                placeholder={teachers.length === 0 ? 'يرجى إضافة شيوخ أولاً' : 'اختر الشيخ المدرس'}
                {...register('teacherId')}
                error={errors.teacherId?.message}
              />

              <Select
                label="تصنيف المادة العلمية"
                options={COURSE_CATEGORIES.map((cat) => ({ value: cat, label: cat }))}
                {...register('category')}
                error={errors.category?.message}
              />

              <Select
                label="المستوى الدراسي"
                options={COURSE_LEVELS.map((lvl) => ({ value: lvl.value, label: lvl.label }))}
                {...register('level')}
                error={errors.level?.message}
              />

              <Input
                label="لغة التدريس"
                placeholder="العربية"
                {...register('language')}
                error={errors.language?.message}
              />

              <Input
                label="مدة الدورة (مثال: ١٠ أسابيع / ١٢ ساعة)"
                placeholder="١٢ ساعة دراسية"
                {...register('duration')}
                error={errors.duration?.message}
              />

              <Input
                label="تاريخ بدء الدراسة"
                type="date"
                {...register('startDate')}
                error={errors.startDate?.message}
              />

              <Input
                label="تاريخ انتهاء الدراسة"
                type="date"
                {...register('endDate')}
                error={errors.endDate?.message}
              />

              <Input
                label="الحد الأقصى للطلاب المسجلين"
                type="number"
                {...register('enrollmentLimit', { valueAsNumber: true })}
                error={errors.enrollmentLimit?.message}
              />

              <div className="flex items-center gap-6 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-green-600 focus:ring-green-500 w-4 h-4"
                    {...register('isFree')}
                  />
                  دورة مجانية
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-green-600 focus:ring-green-500 w-4 h-4"
                    {...register('certificate')}
                  />
                  شهادة عند الاجتياز
                </label>
              </div>

              {!isFreeField && (
                <Input
                  label="سعر الدورة (ر.س)"
                  type="number"
                  placeholder="150"
                  {...register('price', { valueAsNumber: true })}
                  error={errors.price?.message}
                />
              )}

              <Select
                label="حالة النشر"
                options={[
                  { value: 'draft', label: 'مسودة' },
                  { value: 'published', label: 'منشورة (تظهر بالموقع)' },
                  { value: 'archived', label: 'مؤرشفة' },
                ]}
                {...register('status')}
                error={errors.status?.message}
              />
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-4">
              <Textarea
                label="وصف الدورة بالتفصيل"
                placeholder="اكتب تفاصيل الدورة، محتوياتها والمحاور التي سيتم دراستها..."
                rows={3}
                {...register('description')}
                error={errors.description?.message}
              />

              <Textarea
                label="أهداف الدورة (مفصولة بأسطر)"
                placeholder="الهدف الأول&#10;الهدف الثاني"
                rows={2}
                {...register('objectives')}
                error={errors.objectives?.message}
              />

              <Textarea
                label="الفئة المستهدفة"
                placeholder="مثال: طلاب العلم المبتدئين في النحو"
                rows={1.5}
                {...register('targetAudience')}
                error={errors.targetAudience?.message}
              />

              <Textarea
                label="متطلبات الدورة الدراسية"
                placeholder="مثال: حفظ متن الآجرومية أو قراءته"
                rows={1.5}
                {...register('requirements')}
                error={errors.requirements?.message}
              />
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
              {selectedCourse ? 'حفظ التعديلات' : 'إضافة الدورة'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="تأكيد حذف الدورة"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">
            هل أنت متأكد من رغبتك في حذف الدورة{' '}
            <strong className="text-green-900">"{selectedCourse?.arabicTitle}"</strong>؟
            سيؤدي هذا إلى حذف الدورة وجميع الدروس والتسجيلات الملحقة بها نهائياً.
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
