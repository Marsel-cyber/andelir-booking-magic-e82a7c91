import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Upload, Eye, EyeOff } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  category: string | null;
  author: string | null;
  is_published: boolean | null;
  published_at: string | null;
}

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featured_image_url: '',
    category: '',
    author: 'Admin',
    is_published: false,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Gagal memuat blog');
    } else {
      setBlogs(data || []);
    }
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `blogs/${Date.now()}.${fileExt}`;

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

    setFormData({ ...formData, featured_image_url: publicUrl });
    setUploading(false);
    toast.success('Gambar berhasil diupload');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const blogData = {
      title: formData.title,
      excerpt: formData.excerpt || null,
      content: formData.content || null,
      featured_image_url: formData.featured_image_url || null,
      category: formData.category || null,
      author: formData.author || 'Admin',
      is_published: formData.is_published,
      published_at: formData.is_published ? new Date().toISOString() : null,
    };

    if (editingBlog) {
      const { error } = await supabase
        .from('blogs')
        .update(blogData)
        .eq('id', editingBlog.id);

      if (error) {
        toast.error('Gagal mengupdate blog');
      } else {
        toast.success('Blog berhasil diupdate');
        fetchBlogs();
      }
    } else {
      const { error } = await supabase
        .from('blogs')
        .insert([blogData]);

      if (error) {
        toast.error('Gagal menambahkan blog');
      } else {
        toast.success('Blog berhasil ditambahkan');
        fetchBlogs();
      }
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      featured_image_url: blog.featured_image_url || '',
      category: blog.category || '',
      author: blog.author || 'Admin',
      is_published: blog.is_published || false,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus blog ini?')) return;

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Gagal menghapus blog');
    } else {
      toast.success('Blog berhasil dihapus');
      fetchBlogs();
    }
  };

  const togglePublish = async (blog: Blog) => {
    const { error } = await supabase
      .from('blogs')
      .update({
        is_published: !blog.is_published,
        published_at: !blog.is_published ? new Date().toISOString() : null,
      })
      .eq('id', blog.id);

    if (error) {
      toast.error('Gagal mengubah status publikasi');
    } else {
      toast.success(blog.is_published ? 'Blog disembunyikan' : 'Blog dipublikasikan');
      fetchBlogs();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      featured_image_url: '',
      category: '',
      author: 'Admin',
      is_published: false,
    });
    setEditingBlog(null);
  };

  if (loading) {
    return <div className="text-center py-8">Memuat data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Kelola Blog</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingBlog ? 'Edit Blog' : 'Tambah Blog Baru'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Travel Tips"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Penulis</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Featured Image</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.featured_image_url}
                    onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
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
                {formData.featured_image_url && (
                  <img src={formData.featured_image_url} alt="Preview" className="mt-2 h-40 w-full object-cover rounded" />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Ringkasan</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  placeholder="Ringkasan singkat artikel..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Konten (mendukung format Markdown)</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  placeholder="Tulis konten blog di sini... Anda bisa menggunakan format Markdown."
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="is_published">Publikasikan</Label>
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
              </div>
              <Button type="submit" className="w-full">
                {editingBlog ? 'Update Blog' : 'Simpan Blog'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <Card key={blog.id}>
            {blog.featured_image_url && (
              <img src={blog.featured_image_url} alt={blog.title} className="w-full h-40 object-cover rounded-t-lg" />
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base line-clamp-2">{blog.title}</CardTitle>
                  {blog.category && (
                    <span className="text-xs text-primary font-medium">{blog.category}</span>
                  )}
                </div>
                <Button
                  size="icon"
                  variant={blog.is_published ? 'default' : 'outline'}
                  className="h-8 w-8 shrink-0"
                  onClick={() => togglePublish(blog)}
                >
                  {blog.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">{blog.excerpt}</p>
              <p className="text-xs text-muted-foreground">Oleh: {blog.author}</p>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(blog)}>
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(blog.id)}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Belum ada blog. Klik "Tambah Blog" untuk menambahkan.
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
