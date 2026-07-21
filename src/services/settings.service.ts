import { supabase } from '@/lib/supabase';

export interface SiteSettings {
  academyName: string;
  academyDescription: string;
  contactEmail: string;
  contactPhone: string;
  socialFacebook: string;
  socialYoutube: string;
  socialTwitter: string;
  socialTelegram: string;
}

const TABLE = 'settings';
const SETTINGS_ID = 'general';

const defaultSettings: SiteSettings = {
  academyName: 'أكاديمية طيبة للعلوم الشرعية',
  academyDescription: 'منصة إسلامية تعليمية متخصصة في تعليم العلوم الشرعية على يد كبار العلماء والمشايخ',
  contactEmail: 'info@typa-academy.com',
  contactPhone: '966500000000',
  socialFacebook: 'https://facebook.com',
  socialYoutube: 'https://youtube.com',
  socialTwitter: 'https://x.com',
  socialTelegram: 'https://t.me',
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id', SETTINGS_ID)
      .single();
    if (error || !data) return defaultSettings;
    return { ...defaultSettings, ...data } as SiteSettings;
  } catch (err) {
    console.error('Failed to get settings:', err);
    return defaultSettings;
  }
}

export async function saveSiteSettings(data: SiteSettings): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .upsert({ id: SETTINGS_ID, ...data }, { onConflict: 'id' });
  if (error) throw error;
}
