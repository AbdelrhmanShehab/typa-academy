'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ClipboardList,
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  Award,
  BookOpen,
  User,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import {
  getEnrollments,
  createEnrollment,
  updateEnrollment,
} from '@/services/enrollment.service';
import { getStudents } from '@/services/student.service';
import { getCourses } from '@/services/course.service';
import { Enrollment, Student, Course } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';

const enrollmentSchema = z.object({
  studentId: z.string().min(1, 'يجب اختيار الطالب'),
  courseId: z.string().min(1, 'يجب اختيار الدورة'),
  status: z.enum(['active', 'suspended', 'completed']),
  progress: z.number().min(0, 'الحد الأدنى 0').max(100, 'الحد الأقصى 100'),
  completed: z.boolean(),
  certificateIssued: z.boolean(),
});

type EnrollmentFormValues = z.infer<typeof enrollmentSchema>;

export default function DashboardEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      studentId: '',
      courseId: '',
      status: 'active',
      progress: 0,
      completed: false,
      certificateIssued: false,
    },
  });

  const progressValue = watch('progress');
  const statusValue = watch('status');

  // Sync completion based on progress or status
  useEffect(() => {
    if (progressValue === 100 || statusValue === 'completed') {
      setValue('completed', true);
    } else {
      setValue('completed', false);
    }
  }, [progressValue, statusValue, setValue]);

  // Load enrollments, students, and courses
  async function loadData() {
    setLoading(true);
    try {
      const [enrollmentsData, studentsData, coursesData] = await Promise.all([
        getEnrollments(),
        getStudents(),
        getCourses(),
      ]);
      setEnrollments(enrollmentsData);
      setStudents(studentsData);
      setCourses(coursesData);
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
    setSelectedEnrollment(null);
    reset({
      studentId: students[0]?.id || '',
      courseId: courses[0]?.id || '',
      status: 'active',
      progress: 0,
      completed: false,
      certificateIssued: false,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (enrollment: Enrollment) => {
    setSelectedEnrollment(enrollment);
    reset({
      studentId: enrollment.studentId,
      courseId: enrollment.courseId,
      status: enrollment.status,
      progress: enrollment.progress || 0,
      completed: enrollment.completed || false,
      certificateIssued: enrollment.certificateIssued || false,
    });
    setIsFormOpen(true);
  };

  const onSubmitForm = async (values: EnrollmentFormValues) => {
    try {
      if (selectedEnrollment) {
        await updateEnrollment(selectedEnrollment.id, {
          ...values,
          enrolledAt: selectedEnrollment.enrolledAt,
        });
      } else {
        await createEnrollment({
          ...values,
          enrolledAt: new Date().toISOString(),
        });
      }
      setIsFormOpen(false);
      loadData();
    } catch (err) {
      console.error('Error saving enrollment:', err);
      alert('حدث خطأ أثناء حفظ التسجيل.');
    }
  };

  // Find Student details
  const getStudentInfo = (id: string) => {
    return students.find((s) => s.id === id);
  };

  // Find Course details
  const getCourseInfo = (id: string) => {
    return courses.find((c) => c.id === id);
  };

  // Filter enrollments
  const filteredEnrollments = enrollments.filter((enr) => {
    const student = getStudentInfo(enr.studentId);
    const course = getCourseInfo(enr.courseId);

    const matchesSearch =
      student?.arabicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course?.arabicTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse =
      courseFilter === 'all' ? true : enr.courseId === courseFilter;

    const matchesStatus =
      statusFilter === 'all' ? true : enr.status === statusFilter;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-green-900">إدارة التسجيلات</h2>
          <p className="text-slate-500 text-xs mt-1">تنسيق اشتراكات ومتابعة تقدم الطلاب في المقررات</p>
        </div>
        <Button size="sm" onClick={handleOpenAdd}>
          <Plus size={16} />
          تسجيل طالب جديد
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-green-50 shadow-sm flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="بحث باسم الطالب، البريد، أو عنوان الدورة..."
            className="w-full pl-3 pr-10 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 bg-slate-50/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <select
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 bg-white"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="all">كل الدورات</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.arabicTitle}
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
            <option value="active">نشط</option>
            <option value="suspended">معلق</option>
            <option value="completed">مكتمل</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <Loader2 className="animate-spin text-green-600" size={32} />
          <p className="text-slate-500 text-sm">جاري تحميل قائمة التسجيلات...</p>
        </div>
      ) : filteredEnrollments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-green-100 overflow-hidden shadow-sm">
          <EmptyState
            icon={<ClipboardList size={40} />}
            title="لا توجد تسجيلات"
            description={searchTerm || courseFilter !== 'all' || statusFilter !== 'all' ? 'لا توجد نتائج تطابق معايير البحث' : 'لا يوجد طلاب مسجلين بالدورات بعد'}
            action={
              !searchTerm && courseFilter === 'all' && statusFilter === 'all' ? (
                <Button size="sm" onClick={handleOpenAdd}>
                  <Plus size={16} />
                  تسجيل طالب
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
                  <th className="px-6 py-4">الطالب</th>
                  <th className="px-6 py-4">الدورة العلمية</th>
                  <th className="px-6 py-4">تاريخ التسجيل</th>
                  <th className="px-6 py-4">نسبة التقدم</th>
                  <th className="px-6 py-4 text-center">الشهادة</th>
                  <th className="px-6 py-4 text-center">الحالة</th>
                  <th className="px-6 py-4 text-left">العمليات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {filteredEnrollments.map((enr) => {
                  const student = getStudentInfo(enr.studentId);
                  const course = getCourseInfo(enr.courseId);

                  return (
                    <tr key={enr.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                            {student?.photo ? (
                              <img src={student.photo} alt={student.arabicName} className="w-full h-full object-cover" />
                            ) : (
                              <User size={14} className="text-green-700" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-green-950">{student?.arabicName || 'طالب غير معروف'}</p>
                            <p className="text-[10px] text-slate-400">{student?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-800">{course?.arabicTitle || 'دورة غير معروفة'}</td>
                      <td className="px-6 py-4 text-slate-500">
                        {enr.enrolledAt ? (
                          new Date(enr.enrolledAt).toLocaleDateString('ar-EG', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        ) : (
                          'غير محدد'
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-full max-w-[120px] flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-600 rounded-full"
                              style={{ width: `${enr.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold font-mono text-slate-700">{enr.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {enr.certificateIssued ? (
                          <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            <Award size={12} /> صدرت
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">لم تصدر</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            enr.status === 'active'
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : enr.status === 'completed'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {enr.status === 'active' ? 'نشط' : enr.status === 'completed' ? 'مكتمل' : 'معلق'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-left">
                        <div className="flex items-center justify-end">
                          <button
                            onClick={() => handleOpenEdit(enr)}
                            className="p-1 text-slate-500 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                            title="تعديل التسجيل"
                          >
                            <Edit2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedEnrollment ? 'تعديل تسجيل الطالب' : 'تسجيل طالب في دورة'}
        size="md"
      >
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div className="space-y-4">
            {!selectedEnrollment ? (
              <>
                <Select
                  label="اختر الطالب"
                  options={students.map((s) => ({ value: s.id, label: s.arabicName }))}
                  placeholder={students.length === 0 ? 'لا يوجد طلاب مسجلين' : 'اختر الطالب للالتحاق'}
                  {...register('studentId')}
                  error={errors.studentId?.message}
                />

                <Select
                  label="اختر الدورة العلمية"
                  options={courses.map((c) => ({ value: c.id, label: c.arabicTitle }))}
                  placeholder={courses.length === 0 ? 'لا توجد دورات مسجلة' : 'اختر الدورة المطلوبة'}
                  {...register('courseId')}
                  error={errors.courseId?.message}
                />
              </>
            ) : (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-sm text-slate-700 mb-4">
                <p>
                  <span className="font-semibold text-slate-500">الطالب:</span>{' '}
                  <span className="font-bold text-green-950">{getStudentInfo(selectedEnrollment.studentId)?.arabicName}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-500">الدورة:</span>{' '}
                  <span className="font-bold text-green-950">{getCourseInfo(selectedEnrollment.courseId)?.arabicTitle}</span>
                </p>
              </div>
            )}

            <Select
              label="حالة الالتحاق"
              options={[
                { value: 'active', label: 'نشط (مستمر بالدراسة)' },
                { value: 'suspended', label: 'معلق (موقوف مؤقتاً)' },
                { value: 'completed', label: 'مكتمل (أتم الدورة)' },
              ]}
              {...register('status')}
              error={errors.status?.message}
            />

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 flex justify-between">
                <span>نسبة التقدم بالدورة (%)</span>
                <span className="font-bold font-mono text-green-700">{progressValue}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full accent-green-600 cursor-pointer h-2 bg-slate-100 rounded-lg appearance-none"
                {...register('progress', { valueAsNumber: true })}
              />
              {errors.progress && (
                <p className="text-xs text-red-600">{errors.progress.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-3 p-3 bg-slate-50 border border-slate-100 rounded-lg">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-green-600 focus:ring-green-500 w-4 h-4"
                  {...register('completed')}
                  disabled // Automatically controlled by progress = 100 or status completed
                />
                اكتملت الدورة بنجاح
              </label>
              
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-green-600 focus:ring-green-500 w-4 h-4"
                  {...register('certificateIssued')}
                />
                إصدار شهادة اجتياز للطالب
              </label>
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
              {selectedEnrollment ? 'حفظ التعديلات' : 'تسجيل الطالب'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
