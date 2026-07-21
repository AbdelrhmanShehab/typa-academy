import { supabase } from '@/lib/supabase';
import { Course, CreateCourseInput, UpdateCourseInput } from '@/types';

const TABLE = 'courses';

export async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('title');
  if (error) throw error;
  return data as Course[];
}

export async function getCourseById(id: string): Promise<Course | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data as Course;
}

export async function getPublishedCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('status', 'published')
    .order('title');
  if (error) throw error;
  return data as Course[];
}

export async function getCoursesByTeacher(teacherId: string): Promise<Course[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('teacher_id', teacherId);
  if (error) throw error;
  return data as Course[];
}

export async function createCourse(data: CreateCourseInput): Promise<string> {
  const { data: inserted, error } = await supabase
    .from(TABLE)
    .insert({ ...data, created_at: new Date().toISOString() })
    .select('id')
    .single();
  if (error) throw error;
  return inserted.id;
}

export async function updateCourse(id: string, data: UpdateCourseInput): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteCourse(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
