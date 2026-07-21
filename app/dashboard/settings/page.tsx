'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Settings,
  Save,
  Loader2,
  Globe,
  Mail,
  Phone,
  Link2,
  PlayCircle,
  AtSign,
  Send,
  CheckCircle,
} from 'lucide-react';
import { getSiteSettings, saveSiteSettings, SiteSettings } from '@/services/settings.service';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

export default function DashboardSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SiteSettings>({
    defaultValues: {
      academyName: '',
      academyDescription: '',
      contactEmail: '',
      contactPhone: '',
      socialFacebook: '',
      socialYoutube: '',
      socialTwitter: '',
      socialTelegram: '',
    },
  });

  // Load site settings
  useEffect(() => {
    async function loadSettings() {
      try {
        const settings = await getSiteSettings();
        reset(settings);
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, [reset]);

  const onSubmit = async (data: SiteSettings) => {
    try {
      setSaveSuccess(false);
      await saveSiteSettings(data);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('حدث خطأ أثناء حفظ الإعدادات.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-2">
        <Loader2 className="animate-spin text-green-600" size={32} />
        <p className="text-slate-500 text-sm">جاري تحميل إعدادات الموقع...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Settings size={20} className="text-green-600" />
        <div>
          <h2 className="text-xl font-bold text-green-900">إعدادات المنصة</h2>
          <p className="text-slate-500 text-xs mt-1">تحديث الاسم والشعار وقنوات التواصل للأكاديمية</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
        {saveSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center gap-3 animate-fade-in">
            <CheckCircle className="text-green-600 shrink-0" size={18} />
            <p className="text-sm font-medium">تم حفظ إعدادات المنصة بنجاح وسيتم تطبيقها على الواجهة.</p>
          </div>
        )}

        {/* General Info */}
        <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-green-900 border-b border-slate-50 pb-2 mb-4">المعلومات الأساسية</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="اسم الأكاديمية (يظهر في الترويسة والعناوين)"
              placeholder="مثال: أكاديمية تيبا للعلوم الشرعية"
              {...register('academyName', { required: true })}
            />

            <Textarea
              label="الوصف التعريفي بالأكاديمية (يظهر أسفل الشعار ومحركات البحث)"
              placeholder="منصة إسلامية تعليمية متخصصة في تعليم العلوم الشرعية..."
              rows={3}
              {...register('academyDescription')}
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-green-900 border-b border-slate-50 pb-2 mb-4">معلومات الاتصال المباشر</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="البريد الإلكتروني للتواصل"
              type="email"
              placeholder="info@academy.com"
              {...register('contactEmail')}
            />

            <Input
              label="رقم الهاتف/الواتساب"
              placeholder="مثال: 966500000000"
              {...register('contactPhone')}
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-green-900 border-b border-slate-50 pb-2 mb-4">قنوات ومواقع التواصل الاجتماعي</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5 mb-1">
                <Link2 size={16} className="text-blue-600" />
                حساب فيسبوك (Facebook URL)
              </label>
              <input
                type="text"
                placeholder="https://facebook.com/..."
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 bg-white"
                {...register('socialFacebook')}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5 mb-1">
                <PlayCircle size={16} className="text-red-600" />
                قناة يوتيوب (YouTube Channel)
              </label>
              <input
                type="text"
                placeholder="https://youtube.com/c/..."
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 bg-white"
                {...register('socialYoutube')}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5 mb-1">
                <AtSign size={16} className="text-slate-800" />
                حساب إكس/تويتر (Twitter URL)
              </label>
              <input
                type="text"
                placeholder="https://x.com/..."
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 bg-white"
                {...register('socialTwitter')}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5 mb-1">
                <Send size={16} className="text-sky-500" />
                قناة تيليجرام (Telegram Channel)
              </label>
              <input
                type="text"
                placeholder="https://t.me/..."
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 bg-white"
                {...register('socialTelegram')}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end">
          <Button type="submit" size="md" loading={isSubmitting}>
            <Save size={16} />
            حفظ إعدادات المنصة
          </Button>
        </div>
      </form>
    </div>
  );
}
