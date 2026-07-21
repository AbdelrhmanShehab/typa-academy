import { supabase } from '@/lib/supabase';
import { Student, CreateStudentInput, UpdateStudentInput } from '@/types';

const TABLE = 'students';

export async function getStudents(): Promise<Student[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('arabic_name');
  if (error) throw error;
  return data as Student[];
}

export async function getStudentById(id: string): Promise<Student | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data as Student;
}

export async function createStudent(data: CreateStudentInput): Promise<string> {
  const { data: inserted, error } = await supabase
    .from(TABLE)
    .insert({ ...data, created_at: new Date().toISOString() })
    .select('id')
    .single();
  if (error) throw error;
  return inserted.id;
}

export async function updateStudent(id: string, data: UpdateStudentInput): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteStudent(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
