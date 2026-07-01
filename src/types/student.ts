export interface StudentBook {
  title: string;
  author?: string;
}

export interface Student {
  id: string;
  arabicName: string;
  photo: string;
  biography: string;
  nationality: string;
  languages: string[];
  email: string;
  phone: string;
  books: StudentBook[];
}

export type CreateStudentInput = Omit<Student, 'id'>;
export type UpdateStudentInput = Partial<CreateStudentInput>;
