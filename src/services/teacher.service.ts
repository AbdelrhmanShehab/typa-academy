import { supabase } from '@/lib/supabase';
import { Teacher, CreateTeacherInput, UpdateTeacherInput } from '@/types';

const TABLE = 'teachers';

export async function getTeachers(): Promise<Teacher[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('arabic_name');
  if (error) throw error;
  return data as Teacher[];
}

export async function getTeacherById(id: string): Promise<Teacher | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data as Teacher;
}

export async function getActiveTeachers(): Promise<Teacher[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('status', 'active')
    .order('arabic_name');
  if (error) throw error;
  return data as Teacher[];
}

export async function createTeacher(data: CreateTeacherInput): Promise<string> {
  const { data: inserted, error } = await supabase
    .from(TABLE)
    .insert({ ...data, created_at: new Date().toISOString() })
    .select('id')
    .single();
  if (error) throw error;
  return inserted.id;
}

export async function updateTeacher(id: string, data: UpdateTeacherInput): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteTeacher(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
