import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Settings {
  whatsapp_number: string;
  hero_banner_url: string | null;
  hero_title: string;
  hero_subtitle: string;
}

const defaultSettings: Settings = {
  whatsapp_number: '6282221016393',
  hero_banner_url: null,
  hero_title: 'Selamat Datang di Andelir Hotel',
  hero_subtitle: 'Pengalaman menginap mewah di jantung kota Bandung dengan pelayanan terbaik.',
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('key, value');

        if (error) throw error;

        const settingsMap: Partial<Settings> = {};
        data?.forEach((item) => {
          if (item.key in defaultSettings) {
            settingsMap[item.key as keyof Settings] = item.value || defaultSettings[item.key as keyof Settings];
          }
        });

        setSettings({ ...defaultSettings, ...settingsMap });
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
};
