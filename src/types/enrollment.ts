export type EnrollmentStatus = 'active' | 'suspended' | 'completed';

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  progress: number; // 0–100
  completed: boolean;
  certificateIssued: boolean;
  status: EnrollmentStatus;
}

export type CreateEnrollmentInput = Omit<Enrollment, 'id'>;
export type UpdateEnrollmentInput = Partial<CreateEnrollmentInput>;
