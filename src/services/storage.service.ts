import { supabase } from '@/lib/supabase';

const DEFAULT_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'typa-academy';

export async function uploadFile(
  file: File,
  folder: 'teachers' | 'students' | 'courses' | 'articles' | 'attachments',
): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const isMock =
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes('mock-project');

  if (isMock) {
    console.warn('Supabase not configured, returning base64 string data URL for development');
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  }

  const { data, error } = await supabase.storage
    .from(DEFAULT_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    throw error;
  }

  const { data: publicUrlData } = supabase.storage
    .from(DEFAULT_BUCKET)
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
