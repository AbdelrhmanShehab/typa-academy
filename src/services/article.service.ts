import { supabase } from '@/lib/supabase';
import { Article, CreateArticleInput, UpdateArticleInput } from '@/types';

const TABLE = 'articles';

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('publish_date', { ascending: false });
  if (error) throw error;
  return data as Article[];
}

export async function getArticleById(id: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data as Article;
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('featured', true)
    .order('publish_date', { ascending: false });
  if (error) throw error;
  return data as Article[];
}

export async function createArticle(data: CreateArticleInput): Promise<string> {
  const { data: inserted, error } = await supabase
    .from(TABLE)
    .insert({ ...data, created_at: new Date().toISOString() })
    .select('id')
    .single();
  if (error) throw error;
  return inserted.id;
}

export async function updateArticle(id: string, data: UpdateArticleInput): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteArticle(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}
