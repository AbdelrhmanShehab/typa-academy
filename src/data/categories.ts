export interface Category {
  id: string;
  title: string;
  description: string;
  iconName: string; // The Lucide icon component name to render
}

export const categoriesData: Category[] = [
  {
    id: 'cat-quran',
    title: 'القرآن الكريم',
    description: 'تلاوة وحفظ وتصحيح التلاوة مع شيوخ مسندين بمتصل السند.',
    iconName: 'BookOpen'
  },
  {
    id: 'cat-tajweed',
    title: 'التجويد',
    description: 'دراسة قواعد التجويد النظرية والعملية لتلاوة صحيحة خالية من الأخطاء.',
    iconName: 'Mic'
  },
  {
    id: 'cat-hadith',
    title: 'الحديث',
    description: 'دراسة السنة النبوية الشريفة، مصطلح الحديث، وشروح الكتب الستة.',
    iconName: 'MessageCircle'
  },
  {
    id: 'cat-creed',
    title: 'العقيدة',
    description: 'دراسة التوحيد وأصول الدين الصحيح وفق منهج أهل السنة والجماعة.',
    iconName: 'Shield'
  },
  {
    id: 'cat-fiqh',
    title: 'الفقه',
    description: 'فهم أحكام العبادات والمعاملات الفقهية وتطبيقاتها المعاصرة.',
    iconName: 'Compass'
  },
  {
    id: 'cat-tafsir',
    title: 'التفسير',
    description: 'تدبر كلام الله ومعرفة معاني الآيات وأسباب النزول والأحكام المتعلقة بها.',
    iconName: 'Search'
  },
  {
    id: 'cat-arabic',
    title: 'اللغة العربية',
    description: 'تعليم النحو والصرف والبلاغة والأدب العربي لفهم أفضل للنصوص الشرعية.',
    iconName: 'Languages'
  }
];
