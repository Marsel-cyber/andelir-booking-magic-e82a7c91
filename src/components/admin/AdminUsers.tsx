import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { UserPlus, Trash2, Shield, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'user';
  created_at: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Gagal memuat data admin');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEmail || !newPassword) {
      toast.error('Email dan password wajib diisi');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password minimal 6 karakter');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-admin-user', {
        body: { email: newEmail, password: newPassword }
      });

      if (error) throw error;

      if (data?.success) {
        toast.success('Admin baru berhasil ditambahkan!');
        setDialogOpen(false);
        setNewEmail('');
        setNewPassword('');
        fetchUsers();
      } else {
        throw new Error(data?.error || 'Gagal membuat admin');
      }
    } catch (error: any) {
      console.error('Error creating admin:', error);
      toast.error(error.message || 'Gagal membuat admin baru');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus admin ini?')) return;

    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;
      
      toast.success('Admin berhasil dihapus');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Gagal menghapus admin');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Kelola Admin</h2>
          <p className="text-muted-foreground">Tambah atau hapus akun admin</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Tambah Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Admin Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimal 6 karakter"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Memproses...' : 'Buat Admin'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {users.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Belum ada admin terdaftar</p>
            </CardContent>
          </Card>
        ) : (
          users.map((user) => (
            <Card key={user.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.user_id}</p>
                    <p className="text-sm text-muted-foreground">
                      Ditambahkan: {new Date(user.created_at).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="capitalize">
                    {user.role}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteUser(user.user_id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Catatan Keamanan</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• Admin memiliki akses penuh ke panel pengelolaan website</p>
          <p>• Pastikan hanya memberikan akses admin kepada orang yang dipercaya</p>
          <p>• Gunakan password yang kuat (kombinasi huruf, angka, dan simbol)</p>
          <p>• Menghapus user role tidak menghapus akun dari sistem autentikasi</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
