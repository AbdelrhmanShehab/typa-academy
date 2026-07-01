export type TeacherStatus = 'active' | 'inactive';

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Book {
  title: string;
  year?: number;
  publisher?: string;
}

export interface Certificate {
  title: string;
  institution: string;
  year?: number;
}

export interface Teacher {
  id: string;
  arabicName: string;
  photo: string;
  biography: string;
  nationality: string;
  specialization: string;
  education: string;
  university: string;
  ijazah: string;
  experience: string;
  languages: string[];
  email: string;
  phone: string;
  socialLinks: SocialLink[];
  books: Book[];
  certificates: Certificate[];
  status: TeacherStatus;
}

export type CreateTeacherInput = Omit<Teacher, 'id'>;
export type UpdateTeacherInput = Partial<CreateTeacherInput>;
