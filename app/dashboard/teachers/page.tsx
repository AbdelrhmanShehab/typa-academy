'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  Globe,
  Mail,
  Phone,
  Book,
  Award,
  Link as LinkIcon,
  X,
  CheckCircle,
} from 'lucide-react';
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from '@/services/teacher.service';
import { uploadFile } from '@/services/storage.service';
import { Teacher } from '@/types';
import { teacherSchema, TeacherFormValues } from '@/lib/validations/teacher.schema';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';

export default function DashboardTeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  
  // Form active tab
  const [activeTab, setActiveTab] = useState<'general' | 'social' | 'books' | 'certificates'>('general');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      arabicName: '',
      photo: '',
      biography: '',
      nationality: '',
      specialization: '',
      education: '',
      university: '',
      ijazah: '',
      experience: '',
      languages: ['العربية'],
      email: '',
      phone: '',
      socialLinks: [],
      books: [],
      certificates: [],
      status: 'active',
    },
  });

  // Field arrays for dynamic lists
  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({ control, name: 'socialLinks' });

  const {
    fields: bookFields,
    append: appendBook,
    remove: removeBook,
  } = useFieldArray({ control, name: 'books' });

  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({ control, name: 'certificates' });

  const currentPhoto = watch('photo');

  // Load teachers
  async function loadTeachers() {
    setLoading(true);
    try {
      const data = await getTeachers();
      setTeachers(data);
    } catch (err) {
      console.error('Failed to load teachers:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTeachers();
  }, []);

  const handleOpenAdd = () => {
    setSelectedTeacher(null);
    reset({
      arabicName: '',
      photo: '',
      biography: '',
      nationality: '',
      specialization: '',
      education: '',
      university: '',
      ijazah: '',
      experience: '',
      languages: ['العربية'],
      email: '',
      phone: '',
      socialLinks: [],
      books: [],
      certificates: [],
      status: 'active',
    });
    setActiveTab('general');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    reset({
      arabicName: teacher.arabicName,
      photo: teacher.photo,
      biography: teacher.biography,
      nationality: teacher.nationality,
      specialization: teacher.specialization,
      education: teacher.education,
      university: teacher.university,
      ijazah: teacher.ijazah,
      experience: teacher.experience,
      languages: teacher.languages || ['العربية'],
      email: teacher.email,
      phone: teacher.phone,
      socialLinks: teacher.socialLinks || [],
      books: teacher.books || [],
      certificates: teacher.certificates || [],
      status: teacher.status,
    });
    setActiveTab('general');
    setIsFormOpen(true);
  };

  const handleOpenDelete = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteOpen(true);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const url = await uploadFile(file, 'teachers');
      setValue('photo', url);
    } catch (err) {
      console.error('Error uploading photo:', err);
      alert('فشل رفع الصورة. يرجى المحاولة مرة أخرى.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const onSubmitForm = async (values: TeacherFormValues) => {
    try {
      if (selectedTeacher) {
        await updateTeacher(selectedTeacher.id, values);
      } else {
        await createTeacher(values);
      }
      setIsFormOpen(false);
      loadTeachers();
    } catch (err) {
      console.error('Error saving teacher:', err);
      alert('حدث خطأ أثناء حفظ البيانات.');
    }
  };

  const onDeleteConfirm = async () => {
    if (!selectedTeacher) return;
    try {
      await deleteTeacher(selectedTeacher.id);
      setIsDeleteOpen(false);
      loadTeachers();
    } catch (err) {
      console.error('Error deleting teacher:', err);
      alert('حدث خطأ أثناء الحذف.');
    }
  };

  // Filter teachers
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.arabicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus =
      statusFilter === 'all' ? true : teacher.status === statusFilter;
      
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-green-900">إدارة الشيوخ</h2>
          <p className="text-slate-500 text-xs mt-1">عرض وتعديل بيانات المشايخ والعلماء بالأكاديمية</p>
        </div>
        <Button size="sm" onClick={handleOpenAdd}>
          <Plus size={16} />
          إضافة شيخ جديد
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-green-50 shadow-sm flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="بحث باسم الشيخ، التخصص أو البريد..."
            className="w-full pl-3 pr-10 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 bg-slate-50/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <select
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">كل الحالات</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <Loader2 className="animate-spin text-green-600" size={32} />
          <p className="text-slate-500 text-sm">جاري تحميل قائمة الشيوخ...</p>
        </div>
      ) : filteredTeachers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-green-100 overflow-hidden shadow-sm">
          <EmptyState
            icon={<Users size={40} />}
            title="لا يوجد شيوخ"
            description={searchTerm || statusFilter !== 'all' ? 'لا توجد نتائج تطابق معايير البحث' : 'ابدأ بإضافة أول شيخ للمنصة الآن'}
            action={
              !searchTerm && statusFilter === 'all' ? (
                <Button size="sm" onClick={handleOpenAdd}>
                  <Plus size={16} />
                  إضافة شيخ
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
                  <th className="px-6 py-4">الشيخ</th>
                  <th className="px-6 py-4">التخصص</th>
                  <th className="px-6 py-4">الجنسية</th>
                  <th className="px-6 py-4">معلومات الاتصال</th>
                  <th className="px-6 py-4 text-center">الحالة</th>
                  <th className="px-6 py-4 text-left">العمليات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                          {teacher.photo ? (
                            <img src={teacher.photo} alt={teacher.arabicName} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-green-700 font-bold text-sm">
                              {teacher.arabicName.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-green-950">{teacher.arabicName}</p>
                          <p className="text-xs text-slate-400">{teacher.education}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{teacher.specialization}</td>
                    <td className="px-6 py-4">{teacher.nationality}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5 text-xs">
                        <span className="flex items-center gap-1"><Mail size={12} className="text-slate-400" /> {teacher.email}</span>
                        <span className="flex items-center gap-1"><Phone size={12} className="text-slate-400" /> {teacher.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          teacher.status === 'active'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {teacher.status === 'active' ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(teacher)}
                          className="p-1 text-slate-500 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                          title="تعديل"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(teacher)}
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
        title={selectedTeacher ? 'تعديل بيانات الشيخ' : 'إضافة شيخ جديد'}
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
              المعلومات العامة
            </button>
            <button
              type="button"
              className={`pb-2.5 px-4 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === 'social'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
              onClick={() => setActiveTab('social')}
            >
              قنوات الاتصال
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
              المؤلفات والكتب ({bookFields.length})
            </button>
            <button
              type="button"
              className={`pb-2.5 px-4 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === 'certificates'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
              onClick={() => setActiveTab('certificates')}
            >
              الشهادات والإجازات ({certFields.length})
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
                      <Users size={24} className="text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">الصورة الشخصية</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        id="photo-upload"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                      <label
                        htmlFor="photo-upload"
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
                    <p className="text-[10px] text-slate-400 mt-1">يتم رفع الملفات بأمان على Supabase Storage</p>
                  </div>
                </div>

                <Input
                  label="الاسم الكامل للشيخ (بالعربية)"
                  placeholder="مثال: د. عبد الله بن يوسف"
                  {...register('arabicName')}
                  error={errors.arabicName?.message}
                />

                <Input
                  label="الجنسية"
                  placeholder="مثال: سعودي"
                  {...register('nationality')}
                  error={errors.nationality?.message}
                />

                <Input
                  label="التخصص العلمي"
                  placeholder="مثال: العقيدة والمذاهب المعاصرة"
                  {...register('specialization')}
                  error={errors.specialization?.message}
                />

                <Input
                  label="المؤهل العلمي"
                  placeholder="مثال: دكتوراه في الشريعة الإسلامية"
                  {...register('education')}
                  error={errors.education?.message}
                />

                <Input
                  label="الجامعة المتخرج منها"
                  placeholder="مثال: الجامعة الإسلامية بالمدينة المنورة"
                  {...register('university')}
                  error={errors.university?.message}
                />

                <Input
                  label="الإجازات العلمية"
                  placeholder="مثال: مجاز بالكتب الستة وعاصم"
                  {...register('ijazah')}
                  error={errors.ijazah?.message}
                />

                <Input
                  label="سنوات الخبرة / تفاصيل الخبرة"
                  placeholder="مثال: تدريس العلوم الشرعية لأكثر من ١٥ سنة"
                  {...register('experience')}
                  error={errors.experience?.message}
                />

                <Select
                  label="الحالة"
                  options={[
                    { value: 'active', label: 'نشط' },
                    { value: 'inactive', label: 'غير نشط' },
                  ]}
                  {...register('status')}
                  error={errors.status?.message}
                />

                <div className="col-span-2">
                  <Textarea
                    label="السيرة الذاتية (بالتفصيل)"
                    placeholder="اكتب نبذة شاملة عن الشيخ ومسيرته العلمية..."
                    rows={4}
                    {...register('biography')}
                    error={errors.biography?.message}
                  />
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-4">
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
                    placeholder="مثال: 966500000000"
                    {...register('phone')}
                    error={errors.phone?.message}
                  />
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <LinkIcon size={14} className="text-green-600" />
                      روابط التواصل الاجتماعي ومواقع الشيخ
                    </h4>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => appendSocial({ platform: '', url: '' })}
                    >
                      <Plus size={14} />
                      إضافة رابط
                    </Button>
                  </div>

                  {socialFields.map((field, index) => (
                    <div key={field.id} className="flex gap-3 items-end mb-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Input
                          label="المنصة / الموقع"
                          placeholder="مثال: يوتيوب، تويتر، الموقع الرسمي"
                          {...register(`socialLinks.${index}.platform` as const)}
                          error={errors.socialLinks?.[index]?.platform?.message}
                        />
                        <Input
                          label="الرابط الكامل (URL)"
                          placeholder="https://..."
                          {...register(`socialLinks.${index}.url` as const)}
                          error={errors.socialLinks?.[index]?.url?.message}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSocial(index)}
                        className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg shrink-0 mb-0.5 border border-transparent hover:border-red-100"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'books' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <Book size={14} className="text-green-600" />
                    الكتب والمؤلفات والبحوث المنشورة
                  </h4>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => appendBook({ title: '', year: undefined, publisher: '' })}
                  >
                    <Plus size={14} />
                    إضافة كتاب
                  </Button>
                </div>

                {bookFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-end mb-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-1.5">
                        <Input
                          label="عنوان الكتاب/البحث"
                          placeholder="مثال: شرح القواعد المثلى"
                          {...register(`books.${index}.title` as const)}
                          error={errors.books?.[index]?.title?.message}
                        />
                      </div>
                      <Input
                        label="سنة النشر"
                        type="number"
                        placeholder="مثال: 1445"
                        {...register(`books.${index}.year` as const, { valueAsNumber: true })}
                        error={errors.books?.[index]?.year?.message}
                      />
                      <Input
                        label="دار النشر"
                        placeholder="مثال: دار ابن الجوزي"
                        {...register(`books.${index}.publisher` as const)}
                        error={errors.books?.[index]?.publisher?.message}
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

            {activeTab === 'certificates' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <Award size={14} className="text-green-600" />
                    الشهادات العلمية والجوائز التقديرية
                  </h4>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => appendCert({ title: '', institution: '', year: undefined })}
                  >
                    <Plus size={14} />
                    إضافة شهادة
                  </Button>
                </div>

                {certFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-end mb-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-1.5">
                        <Input
                          label="الشهادة / الجائزة"
                          placeholder="مثال: شهادة حفظ القرآن الكريم"
                          {...register(`certificates.${index}.title` as const)}
                          error={errors.certificates?.[index]?.title?.message}
                        />
                      </div>
                      <Input
                        label="الجهة المانحة"
                        placeholder="مثال: وزارة الشؤون الإسلامية"
                        {...register(`certificates.${index}.institution` as const)}
                        error={errors.certificates?.[index]?.institution?.message}
                      />
                      <Input
                        label="السنة"
                        type="number"
                        placeholder="مثال: 1440"
                        {...register(`certificates.${index}.year` as const, { valueAsNumber: true })}
                        error={errors.certificates?.[index]?.year?.message}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCert(index)}
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
              {selectedTeacher ? 'حفظ التعديلات' : 'إضافة الشيخ'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="تأكيد الحذف"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">
            هل أنت متأكد من رغبتك في حذف الشيخ{' '}
            <strong className="text-green-900">"{selectedTeacher?.arabicName}"</strong>؟
            هذا الإجراء نهائي وسيتم إلغاء ارتباطه بالدورات الحالية.
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
