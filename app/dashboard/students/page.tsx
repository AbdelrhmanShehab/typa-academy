'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  GraduationCap,
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  Mail,
  Phone,
  BookOpen,
  X,
  User,
} from 'lucide-react';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '@/services/student.service';
import { uploadFile } from '@/services/storage.service';
import { Student } from '@/types';
import { studentSchema, StudentFormValues } from '@/lib/validations/student.schema';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';

export default function DashboardStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'books'>('general');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      arabicName: '',
      photo: '',
      biography: '',
      nationality: '',
      languages: ['العربية'],
      email: '',
      phone: '',
      books: [],
    },
  });

  const {
    fields: bookFields,
    append: appendBook,
    remove: removeBook,
  } = useFieldArray({ control, name: 'books' });

  const currentPhoto = watch('photo');

  // Load students
  async function loadStudents() {
    setLoading(true);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error('Failed to load students:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  const handleOpenAdd = () => {
    setSelectedStudent(null);
    reset({
      arabicName: '',
      photo: '',
      biography: '',
      nationality: '',
      languages: ['العربية'],
      email: '',
      phone: '',
      books: [],
    });
    setActiveTab('general');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setSelectedStudent(student);
    reset({
      arabicName: student.arabicName,
      photo: student.photo,
      biography: student.biography,
      nationality: student.nationality,
      languages: student.languages || ['العربية'],
      email: student.email,
      phone: student.phone,
      books: student.books || [],
    });
    setActiveTab('general');
    setIsFormOpen(true);
  };

  const handleOpenDelete = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteOpen(true);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const url = await uploadFile(file, 'students');
      setValue('photo', url);
    } catch (err) {
      console.error('Error uploading photo:', err);
      alert('فشل رفع الصورة. يرجى المحاولة مرة أخرى.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const onSubmitForm = async (values: StudentFormValues) => {
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent.id, values);
      } else {
        await createStudent(values);
      }
      setIsFormOpen(false);
      loadStudents();
    } catch (err) {
      console.error('Error saving student:', err);
      alert('حدث خطأ أثناء حفظ البيانات.');
    }
  };

  const onDeleteConfirm = async () => {
    if (!selectedStudent) return;
    try {
      await deleteStudent(selectedStudent.id);
      setIsDeleteOpen(false);
      loadStudents();
    } catch (err) {
      console.error('Error deleting student:', err);
      alert('حدث خطأ أثناء الحذف.');
    }
  };

  // Filter students
  const filteredStudents = students.filter((student) => {
    return (
      student.arabicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-green-900">إدارة الطلاب</h2>
          <p className="text-slate-500 text-xs mt-1">إضافة، تعديل وحذف بيانات طلاب الأكاديمية</p>
        </div>
        <Button size="sm" onClick={handleOpenAdd}>
          <Plus size={16} />
          إضافة طالب جديد
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-green-50 shadow-sm flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="بحث باسم الطالب، الجنسية أو البريد..."
            className="w-full pl-3 pr-10 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 bg-slate-50/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <Loader2 className="animate-spin text-green-600" size={32} />
          <p className="text-slate-500 text-sm">جاري تحميل قائمة الطلاب...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-green-100 overflow-hidden shadow-sm">
          <EmptyState
            icon={<GraduationCap size={40} />}
            title="لا يوجد طلاب"
            description={searchTerm ? 'لا توجد نتائج تطابق معايير البحث' : 'ابدأ بإضافة أول طالب للمنصة الآن'}
            action={
              !searchTerm ? (
                <Button size="sm" onClick={handleOpenAdd}>
                  <Plus size={16} />
                  إضافة طالب
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
                  <th className="px-6 py-4">الجنسية</th>
                  <th className="px-6 py-4">اللغات</th>
                  <th className="px-6 py-4">معلومات الاتصال</th>
                  <th className="px-6 py-4">المتون المحفوظة</th>
                  <th className="px-6 py-4 text-left">العمليات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                          {student.photo ? (
                            <img src={student.photo} alt={student.arabicName} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-green-700 font-bold text-sm">
                              {student.arabicName.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-green-950">{student.arabicName}</p>
                          <p className="text-xs text-slate-400 max-w-[200px] truncate">{student.biography}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{student.nationality}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(student.languages || []).map((lang) => (
                          <span key={lang} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5 text-xs">
                        <span className="flex items-center gap-1"><Mail size={12} className="text-slate-400" /> {student.email}</span>
                        <span className="flex items-center gap-1"><Phone size={12} className="text-slate-400" /> {student.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs max-w-[150px] truncate">
                      {student.books && student.books.length > 0
                        ? student.books.map((b) => b.title).join('، ')
                        : 'لا توجد متون بعد'}
                    </td>
                    <td className="px-6 py-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(student)}
                          className="p-1 text-slate-500 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                          title="تعديل"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(student)}
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
        title={selectedStudent ? 'تعديل بيانات الطالب' : 'إضافة طالب جديد'}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          {/* Tabs */}
          <div className="flex border-b border-slate-100">
            <button
              type="button"
              className={`pb-2.5 px-4 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === 'general'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
              onClick={() => setActiveTab('general')}
            >
              المعلومات الأساسية
            </button>
            <button
              type="button"
              className={`pb-2.5 px-4 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === 'contact'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
              onClick={() => setActiveTab('contact')}
            >
              الاتصال والعنوان
            </button>
            <button
              type="button"
              className={`pb-2.5 px-4 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === 'books'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
              onClick={() => setActiveTab('books')}
            >
              المتون والكتب المحفوظة ({bookFields.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="max-h-[50vh] overflow-y-auto px-1 space-y-4">
            {activeTab === 'general' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Photo upload */}
                <div className="col-span-2 flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0">
                    {currentPhoto ? (
                      <img src={currentPhoto} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User size={24} className="text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">الصورة الشخصية للشرائح</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        id="student-photo-upload"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                      <label
                        htmlFor="student-photo-upload"
                        className="px-3 py-1.5 bg-white border border-slate-200 text-xs font-medium rounded-lg text-green-700 hover:bg-slate-50 cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                      >
                        {uploadingPhoto ? (
                          <>
                            <Loader2 size={12} className="animate-spin" />
                            جاري الرفع...
                          </>
                        ) : (
                          'اختر صورة'
                        )}
                      </label>
                      {currentPhoto && (
                        <button
                          type="button"
                          onClick={() => setValue('photo', '')}
                          className="p-1 text-red-500 hover:bg-red-50 rounded text-xs"
                        >
                          حذف الصورة
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <Input
                  label="اسم الطالب الكامل"
                  placeholder="مثال: أحمد بن محمد الأنصاري"
                  {...register('arabicName')}
                  error={errors.arabicName?.message}
                />

                <Input
                  label="الجنسية"
                  placeholder="مثال: مصري"
                  {...register('nationality')}
                  error={errors.nationality?.message}
                />

                <div className="col-span-2">
                  <Input
                    label="اللغات (مفصولة بفواصل)"
                    placeholder="مثال: العربية, الإنجليزية"
                    defaultValue="العربية"
                    onChange={(e) => {
                      const list = e.target.value.split(',').map((x) => x.trim()).filter(Boolean);
                      setValue('languages', list);
                    }}
                    error={errors.languages?.message}
                  />
                </div>

                <div className="col-span-2">
                  <Textarea
                    label="نبذة عن الطالب / الأهداف الدراسية"
                    placeholder="اكتب نبذة قصيرة عن الطالب ودوافعه الدراسية..."
                    rows={4}
                    {...register('biography')}
                    error={errors.biography?.message}
                  />
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="البريد الإلكتروني"
                  type="email"
                  placeholder="email@example.com"
                  {...register('email')}
                  error={errors.email?.message}
                />

                <Input
                  label="رقم الهاتف"
                  placeholder="مثال: 201200000000"
                  {...register('phone')}
                  error={errors.phone?.message}
                />
              </div>
            )}

            {activeTab === 'books' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <BookOpen size={14} className="text-green-600" />
                    المتون والكتب والمنظومات المحفوظة لدى الطالب
                  </h4>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => appendBook({ title: '', author: '' })}
                  >
                    <Plus size={14} />
                    إضافة متن
                  </Button>
                </div>

                {bookFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-end mb-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Input
                        label="اسم المتن/الكتاب"
                        placeholder="مثال: الأربعون النووية"
                        {...register(`books.${index}.title` as const)}
                        error={errors.books?.[index]?.title?.message}
                      />
                      <Input
                        label="الناظم / المؤلف"
                        placeholder="مثال: الإمام النووي"
                        {...register(`books.${index}.author` as const)}
                        error={errors.books?.[index]?.author?.message}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeBook(index)}
                      className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg shrink-0 mb-0.5"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer actions */}
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
              {selectedStudent ? 'حفظ التعديلات' : 'إضافة الطالب'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="تأكيد حذف الطالب"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">
            هل أنت متأكد من رغبتك في حذف الطالب{' '}
            <strong className="text-green-900">"{selectedStudent?.arabicName}"</strong>؟
            هذا الإجراء سيقوم بحذف الطالب وكافة سجلات التسجيل التابعة له نهائياً.
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
