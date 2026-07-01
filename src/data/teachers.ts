import { Teacher } from '@/types';

export const teachersData: Teacher[] = [
  {
    id: 'teacher-1',
    arabicName: 'الشيخ د. عبد الرحمن بن عبد العزيز',
    photo: '/images/teachers/teacher-1.jpg',
    biography: 'أستاذ العقيدة والمذاهب المعاصرة، تخرج من الجامعة الإسلامية بالمدينة المنورة، وحصل على الماجستير والدكتوراه في العقيدة. لديه خبرة تزيد عن ٢٠ عاماً في تدريس العلوم الشرعية وإلقاء المحاضرات.',
    nationality: 'سعودي',
    specialization: 'العقيدة والمذاهب المعاصرة',
    education: 'دكتوراه في العقيدة',
    university: 'الجامعة الإسلامية بالمدينة المنورة',
    ijazah: 'حاصل على إجازات في الكتب الستة والعقيدة الواسطية والتدمرية.',
    experience: '٢٢ سنة',
    languages: ['العربية', 'الإنجليزية'],
    email: 'abdulrahman@typa-academy.com',
    phone: '+966500000001',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com' },
      { platform: 'youtube', url: 'https://youtube.com' }
    ],
    books: [
      { title: 'شرح العقيدة الطحاوية المعاصر', year: 2018 },
      { title: 'منهج السلف في الاستدلال', year: 2021 }
    ],
    certificates: [
      { title: 'شهادة الدكتوراه في العقيدة', institution: 'الجامعة الإسلامية', year: 2004 }
    ],
    status: 'active'
  },
  {
    id: 'teacher-2',
    arabicName: 'الشيخ المقرئ أحمد بن علي',
    photo: '/images/teachers/teacher-2.jpg',
    biography: 'جامع القراءات العشر المتواترة من طريق الشاطبية والدرة والطبية. حاصل على إجازات مسندة إلى رسول الله صلى الله عليه وسلم. أشرف على العديد من المقارئ الإلكترونية وحلقات تحفيظ القرآن الكريم.',
    nationality: 'مصر',
    specialization: 'القرآن الكريم والقراءات والتجويد',
    education: 'ليسانس القرآن الكريم وعلومه',
    university: 'جامعة الأزهر الشريف',
    ijazah: 'حاصل على إجازة بالقراءات العشر المتواترة بموجب سند متصل إلى النبي صلى الله عليه وسلم.',
    experience: '١٥ سنة',
    languages: ['العربية'],
    email: 'ahmed.ali@typa-academy.com',
    phone: '+201000000002',
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com' }
    ],
    books: [
      { title: 'التيسير في علم التجويد', year: 2015 },
      { title: 'الوجيز في القراءات العشر', year: 2019 }
    ],
    certificates: [
      { title: 'إجازة في القراءات العشر صغرى وكبرى', institution: 'مشيخة المقارئ المصرية', year: 2010 }
    ],
    status: 'active'
  },
  {
    id: 'teacher-3',
    arabicName: 'الشيخ د. يوسف بن محمد الشافعي',
    photo: '/images/teachers/teacher-3.jpg',
    biography: 'أستاذ الفقه المقارن وأصول الفقه. متخصص في فقه المعاملات المالية المعاصرة ومستشار شرعي للعديد من المؤسسات المالية الإسلامية. صدر له عدة أبحاث محكمة في فقه النوازل.',
    nationality: 'أردني',
    specialization: 'الفقه وأصول الفقه',
    education: 'دكتوراه في الفقه المقارن',
    university: 'جامعة العلوم الإسلامية العالمية',
    ijazah: 'حاصل على إجازات في الفقه الشافعي وأصوله من علماء الشام واليمن.',
    experience: '١٨ سنة',
    languages: ['العربية', 'الإنجليزية'],
    email: 'yousef@typa-academy.com',
    phone: '+962700000003',
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com' }
    ],
    books: [
      { title: 'فقه النوازل المالية المعاصرة', year: 2017 },
      { title: 'المدخل إلى مذهب الإمام الشافعي', year: 2020 }
    ],
    certificates: [
      { title: 'شهادة الدكتوراه في الفقه وأصوله', institution: 'جامعة العلوم الإسلامية', year: 2008 }
    ],
    status: 'active'
  }
];
