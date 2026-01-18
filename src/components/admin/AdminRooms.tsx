import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Upload } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  description: string | null;
  price: number;
  size: string | null;
  max_guests: number | null;
  image_url: string | null;
  amenities: string[] | null;
}

const AdminRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    size: '',
    max_guests: '2',
    image_url: '',
    amenities: '',
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Gagal memuat data kamar');
    } else {
      setRooms(data || []);
    }
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `rooms/${Date.now()}.${fileExt}`;

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

    setFormData({ ...formData, image_url: publicUrl });
    setUploading(false);
    toast.success('Gambar berhasil diupload');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const roomData = {
      name: formData.name,
      description: formData.description || null,
      price: parseFloat(formData.price),
      size: formData.size || null,
      max_guests: parseInt(formData.max_guests) || 2,
      image_url: formData.image_url || null,
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean),
    };

    if (editingRoom) {
      const { error } = await supabase
        .from('rooms')
        .update(roomData)
        .eq('id', editingRoom.id);

      if (error) {
        toast.error('Gagal mengupdate kamar');
      } else {
        toast.success('Kamar berhasil diupdate');
        fetchRooms();
      }
    } else {
      const { error } = await supabase
        .from('rooms')
        .insert([roomData]);

      if (error) {
        toast.error('Gagal menambahkan kamar');
      } else {
        toast.success('Kamar berhasil ditambahkan');
        fetchRooms();
      }
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      description: room.description || '',
      price: room.price.toString(),
      size: room.size || '',
      max_guests: (room.max_guests || 2).toString(),
      image_url: room.image_url || '',
      amenities: (room.amenities || []).join(', '),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus kamar ini?')) return;

    const { error } = await supabase
      .from('rooms')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Gagal menghapus kamar');
    } else {
      toast.success('Kamar berhasil dihapus');
      fetchRooms();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      size: '',
      max_guests: '2',
      image_url: '',
      amenities: '',
    });
    setEditingRoom(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return <div className="text-center py-8">Memuat data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Kelola Kamar</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Kamar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingRoom ? 'Edit Kamar' : 'Tambah Kamar Baru'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Kamar</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Harga (IDR)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Ukuran</Label>
                  <Input
                    id="size"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder="32 m²"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max_guests">Maksimal Tamu</Label>
                <Input
                  id="max_guests"
                  type="number"
                  value={formData.max_guests}
                  onChange={(e) => setFormData({ ...formData, max_guests: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amenities">Fasilitas (pisahkan dengan koma)</Label>
                <Input
                  id="amenities"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  placeholder="WiFi Gratis, AC, TV LED"
                />
              </div>
              <div className="space-y-2">
                <Label>Gambar</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="URL gambar atau upload"
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
                {formData.image_url && (
                  <img src={formData.image_url} alt="Preview" className="mt-2 h-32 w-full object-cover rounded" />
                )}
              </div>
              <Button type="submit" className="w-full">
                {editingRoom ? 'Update Kamar' : 'Simpan Kamar'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <Card key={room.id}>
            {room.image_url && (
              <img src={room.image_url} alt={room.name} className="w-full h-40 object-cover rounded-t-lg" />
            )}
            <CardHeader>
              <CardTitle className="text-lg">{room.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground line-clamp-2">{room.description}</p>
              <p className="text-lg font-bold text-primary">{formatPrice(room.price)}/malam</p>
              <div className="flex gap-2">
                <span className="text-sm text-muted-foreground">{room.size}</span>
                <span className="text-sm text-muted-foreground">• Maks {room.max_guests} tamu</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(room)}>
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(room.id)}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {rooms.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Belum ada data kamar. Klik "Tambah Kamar" untuk menambahkan.
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
