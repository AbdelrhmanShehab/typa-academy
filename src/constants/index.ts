export const APP_NAME = 'Typa Academy';
export const APP_DESCRIPTION =
  'منصة إسلامية تعليمية متخصصة في تعليم العلوم الشرعية على يد كبار العلماء والمشايخ';

export const NAV_LINKS = [
  { href: '/', label: 'الرئيسية' },
  { href: '/about', label: 'عن الأكاديمية' },
  { href: '/teachers', label: 'الشيوخ' },
  { href: '/courses', label: 'الدورات' },
  { href: '/articles', label: 'المقالات' },
  { href: '/contact', label: 'تواصل معنا' },
];

export const COURSE_LEVELS = [
  { value: 'beginner', label: 'مبتدئ' },
  { value: 'intermediate', label: 'متوسط' },
  { value: 'advanced', label: 'متقدم' },
] as const;

export const COURSE_CATEGORIES = [
  'الفقه',
  'العقيدة',
  'التفسير',
  'الحديث',
  'السيرة النبوية',
  'اللغة العربية',
  'التجويد',
  'أصول الفقه',
  'مصطلح الحديث',
] as const;

export const DASHBOARD_NAV_LINKS = [
  { href: '/dashboard', label: 'الرئيسية', icon: 'LayoutDashboard' },
  { href: '/dashboard/teachers', label: 'الشيوخ', icon: 'Users' },
  { href: '/dashboard/students', label: 'الطلاب', icon: 'GraduationCap' },
  { href: '/dashboard/courses', label: 'الدورات', icon: 'BookOpen' },
  { href: '/dashboard/lessons', label: 'الدروس', icon: 'Video' },
  { href: '/dashboard/enrollments', label: 'التسجيلات', icon: 'ClipboardList' },
  { href: '/dashboard/articles', label: 'المقالات', icon: 'FileText' },
  { href: '/dashboard/settings', label: 'الإعدادات', icon: 'Settings' },
] as const;
