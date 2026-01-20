import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Blog {
  id: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  author: string | null;
  category: string | null;
  created_at: string;
}

const BlogDetail = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return;

      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', blogId)
        .eq('is_published', true)
        .single();

      if (error) {
        console.error('Error fetching blog:', error);
      } else {
        setBlog(data);

        // Fetch related blogs
        const { data: related } = await supabase
          .from('blogs')
          .select('*')
          .eq('is_published', true)
          .neq('id', blogId)
          .limit(3);

        if (related) {
          setRelatedBlogs(related);
        }
      }
      setLoading(false);
    };

    fetchBlog();
  }, [blogId]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'd MMMM yyyy', { locale: id });
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Artikel Tidak Ditemukan</h1>
          <p className="text-muted-foreground mb-8">Maaf, artikel yang Anda cari tidak tersedia.</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src={blog.featured_image_url || 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070'}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <article className="max-w-4xl mx-auto">
          <div className="bg-background rounded-2xl shadow-xl p-8 md:p-12">
            {/* Back Link */}
            <Link 
              to="/#blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Blog
            </Link>

            {/* Category */}
            {blog.category && (
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium">{blog.category}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {blog.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(blog.published_at || blog.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{blog.author || 'Admin Hotel'}</span>
              </div>
            </div>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-xl text-muted-foreground italic mb-8">
                {blog.excerpt}
              </p>
            )}

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: blog.content || '<p>Konten tidak tersedia.</p>' }}
            />
          </div>
        </article>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="max-w-6xl mx-auto mt-16 mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Artikel Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.id}`}
                  className="group bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={related.featured_image_url || 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070'}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {formatDate(related.published_at)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;
