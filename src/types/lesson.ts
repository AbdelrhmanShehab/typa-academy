export interface Attachment {
  name: string;
  url: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'link' | 'pdf' | 'document';
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  videoUrl: string;
  duration: string;
  order: number;
  attachments: Attachment[];
  summary: string;
  resources: Resource[];
  homework: string;
}

export type CreateLessonInput = Omit<Lesson, 'id'>;
export type UpdateLessonInput = Partial<CreateLessonInput>;
