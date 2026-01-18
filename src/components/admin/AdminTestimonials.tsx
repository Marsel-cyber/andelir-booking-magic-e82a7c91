import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Star, Upload } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string | null;
  avatar_url: string | null;
  rating: number | null;
  comment: string;
  date: string | null;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    avatar_url: '',
    rating: '5',
    comment: '',
    date: '',
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Gagal memuat testimoni');
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `avatars/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(fileName, file);

    if (uploadError) {
      toast.error('Gagal mengupload gambar');
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(fileName);

    setFormData({ ...formData, avatar_url: publicUrl });
    setUploading(false);
    toast.success('Avatar berhasil diupload');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const testimonialData = {
      name: formData.name,
      location: formData.location || null,
      avatar_url: formData.avatar_url || null,
      rating: parseInt(formData.rating),
      comment: formData.comment,
      date: formData.date || null,
    };

    if (editingTestimonial) {
      const { error } = await supabase
        .from('testimonials')
        .update(testimonialData)
        .eq('id', editingTestimonial.id);

      if (error) {
        toast.error('Gagal mengupdate testimoni');
      } else {
        toast.success('Testimoni berhasil diupdate');
        fetchTestimonials();
      }
    } else {
      const { error } = await supabase
        .from('testimonials')
        .insert([testimonialData]);

      if (error) {
        toast.error('Gagal menambahkan testimoni');
      } else {
        toast.success('Testimoni berhasil ditambahkan');
        fetchTestimonials();
      }
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      location: testimonial.location || '',
      avatar_url: testimonial.avatar_url || '',
      rating: (testimonial.rating || 5).toString(),
      comment: testimonial.comment,
      date: testimonial.date || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus testimoni ini?')) return;

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Gagal menghapus testimoni');
    } else {
      toast.success('Testimoni berhasil dihapus');
      fetchTestimonials();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      avatar_url: '',
      rating: '5',
      comment: '',
      date: '',
    });
    setEditingTestimonial(null);
  };

  const renderStars = (rating: number | null) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < (rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return <div className="text-center py-8">Memuat data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Kelola Testimoni</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Testimoni
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Lokasi</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Jakarta, Indonesia"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((r) => (
                        <SelectItem key={r} value={r.toString()}>{r} Bintang</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Tanggal</Label>
                  <Input
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="Januari 2025"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Avatar</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    placeholder="URL avatar atau upload"
                    className="flex-1"
                  />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button type="button" variant="outline" disabled={uploading} asChild>
                      <span>
                        <Upload className="w-4 h-4" />
                      </span>
                    </Button>
                  </label>
                </div>
                {formData.avatar_url && (
                  <img src={formData.avatar_url} alt="Preview" className="mt-2 h-16 w-16 object-cover rounded-full" />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment">Komentar</Label>
                <Textarea
                  id="comment"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingTestimonial ? 'Update Testimoni' : 'Simpan Testimoni'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                {testimonial.avatar_url ? (
                  <img src={testimonial.avatar_url} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <CardTitle className="text-base">{testimonial.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex">{renderStars(testimonial.rating)}</div>
              <p className="text-sm text-muted-foreground line-clamp-3">"{testimonial.comment}"</p>
              {testimonial.date && <p className="text-xs text-muted-foreground">{testimonial.date}</p>}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(testimonial)}>
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(testimonial.id)}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Belum ada testimoni. Klik "Tambah Testimoni" untuk menambahkan.
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
