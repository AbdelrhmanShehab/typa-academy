import { supabase } from '@/lib/supabase';
import { Enrollment, CreateEnrollmentInput, UpdateEnrollmentInput } from '@/types';

const TABLE = 'enrollments';

export async function getEnrollments(): Promise<Enrollment[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('enrolled_at', { ascending: false });
  if (error) throw error;
  return data as Enrollment[];
}

export async function getEnrollmentsByStudent(studentId: string): Promise<Enrollment[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('student_id', studentId);
  if (error) throw error;
  return data as Enrollment[];
}

export async function getEnrollmentsByCourse(courseId: string): Promise<Enrollment[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('course_id', courseId);
  if (error) throw error;
  return data as Enrollment[];
}

export async function createEnrollment(data: CreateEnrollmentInput): Promise<string> {
  const { data: inserted, error } = await supabase
    .from(TABLE)
    .insert({ ...data, created_at: new Date().toISOString() })
    .select('id')
    .single();
  if (error) throw error;
  return inserted.id;
}

export async function updateEnrollment(id: string, data: UpdateEnrollmentInput): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}
