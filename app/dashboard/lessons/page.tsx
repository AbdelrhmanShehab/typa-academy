'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Video,
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  Paperclip,
  BookOpen,
  X,
  FileText,
  ExternalLink,
} from 'lucide-react';
import {
  getLessonsByCourse,
  createLesson,
  updateLesson,
  deleteLesson,
} from '@/services/lesson.service';
import { getCourses } from '@/services/course.service';
import { uploadFile } from '@/services/storage.service';
import { Lesson, Course } from '@/types';
import { lessonSchema, LessonFormValues } from '@/lib/validations/lesson.schema';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';

function LessonsDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingLessons, setLoadingLessons] = useState(false);

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      courseId: '',
      title: '',
      videoUrl: '',
      duration: '',
      order: 1,
      summary: '',
      homework: '',
      attachments: [],
      resources: [],
    },
  });

  const {
    fields: attachmentFields,
    append: appendAttachment,
    remove: removeAttachment,
  } = useFieldArray({ control, name: 'attachments' });

  const {
    fields: resourceFields,
    append: appendResource,
    remove: removeResource,
  } = useFieldArray({ control, name: 'resources' });

  // Load courses
  useEffect(() => {
    async function loadCourses() {
      setLoadingCourses(true);
      try {
        const data = await getCourses();
        setCourses(data);
        
        // Check query param first
        const paramCourseId = searchParams.get('courseId');
        if (paramCourseId && data.some((c) => c.id === paramCourseId)) {
          setSelectedCourseId(paramCourseId);
        } else if (data.length > 0) {
          setSelectedCourseId(data[0].id);
        }
      } catch (err) {
        console.error('Failed to load courses:', err);
      } finally {
        setLoadingCourses(false);
      }
    }
    loadCourses();
  }, [searchParams]);

  // Load lessons when selected course changes
  useEffect(() => {
    async function loadLessons() {
      if (!selectedCourseId) {
        setLessons([]);
        return;
      }
      setLoadingLessons(true);
      try {
        const data = await getLessonsByCourse(selectedCourseId);
        setLessons(data);
      } catch (err) {
        console.error('Failed to load lessons:', err);
      } finally {
        setLoadingLessons(false);
      }
    }
    loadLessons();
  }, [selectedCourseId]);

  const handleCourseChange = (id: string) => {
    setSelectedCourseId(id);
    // Update URL query param quietly
    router.replace(`/dashboard/lessons?courseId=${id}`, { scroll: false });
  };

  const handleOpenAdd = () => {
    setSelectedLesson(null);
    reset({
      courseId: selectedCourseId,
      title: '',
      videoUrl: '',
      duration: '',
      order: lessons.length + 1,
      summary: '',
      homework: '',
      attachments: [],
      resources: [],
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    reset({
      courseId: lesson.courseId,
      title: lesson.title,
      videoUrl: lesson.videoUrl,
      duration: lesson.duration,
      order: lesson.order,
      summary: lesson.summary || '',
      homework: lesson.homework || '',
      attachments: lesson.attachments || [],
      resources: lesson.resources || [],
    });
    setIsFormOpen(true);
  };

  const handleOpenDelete = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsDeleteOpen(true);
  };

  const handleAttachmentFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingIndex(index);
    try {
      const url = await uploadFile(file, 'attachments');
      setValue(`attachments.${index}.url`, url);
      setValue(`attachments.${index}.name`, file.name);
    } catch (err) {
      console.error('Failed to upload attachment:', err);
      alert('فشل رفع الملف المرفق.');
    } finally {
      setUploadingIndex(null);
    }
  };

  const onSubmitForm = async (values: LessonFormValues) => {
    try {
      if (selectedLesson) {
        await updateLesson(selectedLesson.id, values);
      } else {
        await createLesson(values);
      }
      setIsFormOpen(false);
      // Reload lessons
      const data = await getLessonsByCourse(selectedCourseId);
      setLessons(data);
    } catch (err) {
      console.error('Error saving lesson:', err);
      alert('حدث خطأ أثناء حفظ الدرس.');
    }
  };

  const onDeleteConfirm = async () => {
    if (!selectedLesson) return;
    try {
      await deleteLesson(selectedLesson.id);
      setIsDeleteOpen(false);
      // Reload lessons
      const data = await getLessonsByCourse(selectedCourseId);
      setLessons(data);
    } catch (err) {
      console.error('Error deleting lesson:', err);
      alert('حدث خطأ أثناء الحذف.');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-green-900">إدارة الدروس واللقاءات</h2>
          <p className="text-slate-500 text-xs mt-1">تسيير الحلقات واللقاءات والملفات المرفقة لكل دورة</p>
        </div>
        
        {selectedCourseId && (
          <Button size="sm" onClick={handleOpenAdd}>
            <Plus size={16} />
            إضافة درس جديد
          </Button>
        )}
      </div>

      {/* Course selector */}
      <div className="bg-white p-5 rounded-2xl border border-green-50 shadow-sm mb-6 flex flex-col sm:flex-row items-center gap-4">
        <label className="text-sm font-semibold text-green-900 shrink-0">اختر الدورة العلمية للعرض:</label>
        {loadingCourses ? (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin text-green-600" size={16} />
            <span className="text-xs text-slate-400">جاري تحميل الدورات...</span>
          </div>
        ) : (
          <select
            className="w-full sm:max-w-md px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 bg-white"
            value={selectedCourseId}
            onChange={(e) => handleCourseChange(e.target.value)}
          >
            {courses.length === 0 && <option value="">لا توجد دورات مسجلة</option>}
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.arabicTitle}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Content */}
      {!selectedCourseId ? (
        <div className="bg-white rounded-2xl border border-green-100 overflow-hidden shadow-sm">
          <EmptyState
            icon={<BookOpen size={40} />}
            title="يرجى اختيار دورة أولاً"
            description="يجب إنشاء دورة واختيارها لتتمكن من إضافة الدروس إليها"
          />
        </div>
      ) : loadingLessons ? (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <Loader2 className="animate-spin text-green-600" size={32} />
          <p className="text-slate-500 text-sm">جاري تحميل دروس الدورة...</p>
        </div>
      ) : lessons.length === 0 ? (
        <div className="bg-white rounded-2xl border border-green-100 overflow-hidden shadow-sm">
          <EmptyState
            icon={<Video size={40} />}
            title="لا توجد دروس لهذه الدورة"
            description="ابدأ بإضافة أول درس أو حلقة علمية للمنهج الدراسي"
            action={
              <Button size="sm" onClick={handleOpenAdd}>
                <Plus size={16} />
                إضافة درس
              </Button>
            }
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-green-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-green-50/50 text-slate-700 text-xs font-semibold border-b border-green-100">
                  <th className="px-6 py-4 w-20 text-center">الترتيب</th>
                  <th className="px-6 py-4">عنوان الدرس</th>
                  <th className="px-6 py-4">رابط اللقاء / الفيديو</th>
                  <th className="px-6 py-4">مدة اللقاء</th>
                  <th className="px-6 py-4">المرفقات والمراجع</th>
                  <th className="px-6 py-4 text-left">العمليات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {lessons.map((lesson) => (
                  <tr key={lesson.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-center font-bold text-green-800">
                      #{lesson.order}
                    </td>
                    <td className="px-6 py-4 font-semibold text-green-950">
                      {lesson.title}
                    </td>
                    <td className="px-6 py-4 max-w-[200px] truncate text-slate-400 font-mono text-xs" dir="ltr">
                      {lesson.videoUrl}
                    </td>
                    <td className="px-6 py-4">{lesson.duration}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs">
                        {lesson.attachments && lesson.attachments.length > 0 && (
                          <span className="text-green-700 flex items-center gap-1 font-medium">
                            <Paperclip size={12} /> {lesson.attachments.length} مرفقات
                          </span>
                        )}
                        {lesson.resources && lesson.resources.length > 0 && (
                          <span className="text-blue-700 flex items-center gap-1 font-medium">
                            <FileText size={12} /> {lesson.resources.length} مصادر إضافية
                          </span>
                        )}
                        {(!lesson.attachments || lesson.attachments.length === 0) &&
                          (!lesson.resources || lesson.resources.length === 0) && (
                            <span className="text-slate-400">لا يوجد</span>
                          )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(lesson)}
                          className="p-1 text-slate-500 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                          title="تعديل"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(lesson)}
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
        title={selectedLesson ? 'تعديل محتوى الدرس' : 'إضافة درس جديد'}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div className="max-h-[65vh] overflow-y-auto px-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input
                  label="عنوان الدرس / موضوع اللقاء"
                  placeholder="مثال: شرح باب الفاعل ونائب الفاعل"
                  {...register('title')}
                  error={errors.title?.message}
                />
              </div>

              <Input
                label="رابط فيديو اللقاء (يوتيوب أو زووم أو غيره)"
                placeholder="https://www.youtube.com/watch?v=..."
                {...register('videoUrl')}
                error={errors.videoUrl?.message}
              />

              <Input
                label="مدة اللقاء الدراسي"
                placeholder="مثال: ساعة ونصف / ٩٠ دقيقة"
                {...register('duration')}
                error={errors.duration?.message}
              />

              <Input
                label="رقم ترتيب الدرس في المنهج"
                type="number"
                {...register('order', { valueAsNumber: true })}
                error={errors.order?.message}
              />

              <div className="col-span-2">
                <Textarea
                  label="ملخص سريع لمحتويات اللقاء"
                  placeholder="اكتب العناصر الرئيسية التي تم التطرق لها خلال المحاضرة..."
                  rows={3}
                  {...register('summary')}
                  error={errors.summary?.message}
                />
              </div>

              <div className="col-span-2">
                <Textarea
                  label="الواجبات والتكليفات المنزلية"
                  placeholder="اكتب المطلوب من الطلاب تسليمه قبل المحاضرة القادمة..."
                  rows={2}
                  {...register('homework')}
                  error={errors.homework?.message}
                />
              </div>
            </div>

            {/* Attachments Section */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <Paperclip size={14} className="text-green-600" />
                  المرفقات والكتب المقررة (رفع على Supabase Storage)
                </h4>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => appendAttachment({ name: '', url: '' })}
                >
                  <Plus size={14} />
                  إضافة مرفق
                </Button>
              </div>

              {attachmentFields.map((field, index) => (
                <div key={field.id} className="flex gap-3 items-end mb-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Input
                      label="اسم المرفق / الملف"
                      placeholder="مثال: متن الآجرومية PDF"
                      {...register(`attachments.${index}.name` as const)}
                      error={errors.attachments?.[index]?.name?.message}
                    />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-slate-700">رابط الملف / رفعه</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="https://..."
                          className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none bg-white"
                          {...register(`attachments.${index}.url` as const)}
                        />
                        <input
                          type="file"
                          id={`attach-file-${index}`}
                          className="hidden"
                          onChange={(e) => handleAttachmentFileUpload(e, index)}
                        />
                        <label
                          htmlFor={`attach-file-${index}`}
                          className="px-2.5 py-2 bg-green-50 border border-green-200 text-xs font-medium rounded-lg text-green-700 hover:bg-green-100 cursor-pointer inline-flex items-center gap-1 shadow-sm shrink-0"
                        >
                          {uploadingIndex === index ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            'رفع'
                          )}
                        </label>
                      </div>
                      {errors.attachments?.[index]?.url && (
                        <p className="text-xs text-red-600">{errors.attachments?.[index]?.url?.message}</p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg shrink-0 mb-0.5"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Resources Section */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <FileText size={14} className="text-green-600" />
                  مراجع ومصادر خارجية مفيدة
                </h4>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => appendResource({ title: '', url: '', type: 'link' })}
                >
                  <Plus size={14} />
                  إضافة مصدر
                </Button>
              </div>

              {resourceFields.map((field, index) => (
                <div key={field.id} className="flex gap-3 items-end mb-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Input
                      label="اسم المرجع / الكتاب"
                      placeholder="مثال: شرح الشيخ العثيمين"
                      {...register(`resources.${index}.title` as const)}
                      error={errors.resources?.[index]?.title?.message}
                    />
                    <Input
                      label="رابط المرجع"
                      placeholder="https://..."
                      {...register(`resources.${index}.url` as const)}
                      error={errors.resources?.[index]?.url?.message}
                    />
                    <Select
                      label="نوع المصدر"
                      options={[
                        { value: 'link', label: 'رابط خارجي' },
                        { value: 'pdf', label: 'ملف PDF' },
                        { value: 'document', label: 'مستند وورد/مقال' },
                      ]}
                      {...register(`resources.${index}.type` as const)}
                      error={errors.resources?.[index]?.type?.message}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeResource(index)}
                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg shrink-0 mb-0.5"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
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
              {selectedLesson ? 'حفظ التعديلات' : 'إضافة الدرس'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="تأكيد حذف الدرس"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">
            هل أنت متأكد من رغبتك في حذف الدرس{' '}
            <strong className="text-green-900">"{selectedLesson?.title}"</strong>؟
            هذا الإجراء سيقوم بإزالة محتوى اللقاء ومرفقاته نهائياً.
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

export default function DashboardLessonsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20 gap-2">
        <Loader2 className="animate-spin text-green-600" size={32} />
        <p className="text-slate-500 text-sm font-medium">جاري تحميل إدارة الدروس...</p>
      </div>
    }>
      <LessonsDashboardContent />
    </Suspense>
  );
}
