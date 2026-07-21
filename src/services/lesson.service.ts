import { supabase } from '@/lib/supabase';
import { Lesson, CreateLessonInput, UpdateLessonInput } from '@/types';

const TABLE = 'lessons';

export async function getLessonsByCourse(courseId: string): Promise<Lesson[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('course_id', courseId)
    .order('order');
  if (error) throw error;
  return data as Lesson[];
}

export async function getLessonById(id: string): Promise<Lesson | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data as Lesson;
}

export async function createLesson(data: CreateLessonInput): Promise<string> {
  const { data: inserted, error } = await supabase
    .from(TABLE)
    .insert({ ...data, created_at: new Date().toISOString() })
    .select('id')
    .single();
  if (error) throw error;
  return inserted.id;
}

export async function updateLesson(id: string, data: UpdateLessonInput): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteLesson(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
