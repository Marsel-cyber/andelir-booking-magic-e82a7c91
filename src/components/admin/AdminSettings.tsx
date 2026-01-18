import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save, Upload, Phone, Image } from 'lucide-react';

interface Setting {
  id: string;
  key: string;
  value: string | null;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [heroBannerUrl, setHeroBannerUrl] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*');

      if (error) throw error;

      setSettings(data || []);
      
      // Map settings to state
      data?.forEach((setting) => {
        switch (setting.key) {
          case 'whatsapp_number':
            setWhatsappNumber(setting.value || '');
            break;
          case 'hero_title':
            setHeroTitle(setting.value || '');
            break;
          case 'hero_subtitle':
            setHeroSubtitle(setting.value || '');
            break;
          case 'hero_banner_url':
            setHeroBannerUrl(setting.value || '');
            break;
        }
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Gagal memuat pengaturan');
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    const { error } = await supabase
      .from('settings')
      .update({ value })
      .eq('key', key);

    if (error) throw error;
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        updateSetting('whatsapp_number', whatsappNumber),
        updateSetting('hero_title', heroTitle),
        updateSetting('hero_subtitle', heroSubtitle),
        updateSetting('hero_banner_url', heroBannerUrl),
      ]);
      toast.success('Pengaturan berhasil disimpan');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Gagal menyimpan pengaturan');
    } finally {
      setSaving(false);
    }
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `hero-banner-${Date.now()}.${fileExt}`;
      const filePath = `banners/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      setHeroBannerUrl(urlData.publicUrl);
      toast.success('Banner berhasil diupload');
    } catch (error) {
      console.error('Error uploading banner:', error);
      toast.error('Gagal mengupload banner');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Memuat pengaturan...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Pengaturan Website</h2>
      </div>

      {/* WhatsApp Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Phone className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">WhatsApp</h3>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="whatsapp">Nomor WhatsApp (dengan kode negara)</Label>
            <Input
              id="whatsapp"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="6282221016393"
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Contoh: 6282221016393 (tanpa + atau spasi)
            </p>
          </div>
        </div>
      </div>

      {/* Hero Banner Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Image className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Banner Hero</h3>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="heroTitle">Judul Hero</Label>
            <Input
              id="heroTitle"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder="Selamat Datang di Andelir Hotel"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="heroSubtitle">Subtitle Hero</Label>
            <Input
              id="heroSubtitle"
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              placeholder="Pengalaman menginap mewah..."
              className="mt-1"
            />
          </div>
          <div>
            <Label>Gambar Banner</Label>
            <div className="mt-2 space-y-4">
              {heroBannerUrl && (
                <div className="relative">
                  <img
                    src={heroBannerUrl}
                    alt="Hero banner preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              <div>
                <Label
                  htmlFor="bannerUpload"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  {uploading ? 'Mengupload...' : 'Upload Banner Baru'}
                </Label>
                <Input
                  id="bannerUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </div>
              <div>
                <Label htmlFor="bannerUrl">Atau masukkan URL gambar</Label>
                <Input
                  id="bannerUrl"
                  value={heroBannerUrl}
                  onChange={(e) => setHeroBannerUrl(e.target.value)}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="px-8">
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
