export type CourseStatus = 'draft' | 'published' | 'archived';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  title: string;
  arabicTitle: string;
  slug: string;
  description: string;
  thumbnail: string;
  teacherId: string;
  category: string;
  level: CourseLevel;
  language: string;
  duration: string;
  startDate: string;
  endDate: string;
  price: number;
  isFree: boolean;
  enrollmentLimit: number;
  requirements: string;
  objectives: string;
  targetAudience: string;
  certificate: boolean;
  status: CourseStatus;
}

export type CreateCourseInput = Omit<Course, 'id'>;
export type UpdateCourseInput = Partial<CreateCourseInput>;
