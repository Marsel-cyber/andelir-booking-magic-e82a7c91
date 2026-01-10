import { Calendar, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const blogPosts = [
  {
    id: 1,
    title: '10 Destinasi Wisata Terbaik di Bandung yang Wajib Dikunjungi',
    excerpt: 'Jelajahi keindahan Bandung dengan mengunjungi tempat-tempat wisata terbaik yang menawarkan pengalaman tak terlupakan.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2064',
    date: '5 Januari 2026',
    author: 'Admin Hotel',
    category: 'Travel Tips',
  },
  {
    id: 2,
    title: 'Tips Staycation Nyaman dan Hemat di Hotel Bintang 4',
    excerpt: 'Dapatkan pengalaman staycation terbaik dengan tips dan trik untuk menghemat budget tanpa mengurangi kenyamanan.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070',
    date: '2 Januari 2026',
    author: 'Admin Hotel',
    category: 'Lifestyle',
  },
  {
    id: 3,
    title: 'Kuliner Khas Bandung yang Harus Dicoba Saat Menginap',
    excerpt: 'Nikmati kelezatan kuliner khas Sunda dan makanan populer lainnya yang bisa Anda temukan di sekitar hotel.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074',
    date: '28 Desember 2025',
    author: 'Admin Hotel',
    category: 'Kuliner',
  },
];

const BlogSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="blog" className="py-24 bg-hotel-cream">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-16 ${headerVisible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <span className="inline-block px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-medium mb-4">
            Blog & Artikel
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Berita & Tips Terbaru
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan inspirasi perjalanan, tips wisata, dan informasi menarik lainnya 
            dari blog kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2">
            Lihat Semua Artikel
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const BlogCard = ({ post, index }: { post: typeof blogPosts[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <article
      ref={ref}
      className={`group bg-background rounded-2xl overflow-hidden shadow-lg hover-lift ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <a 
          href="#" 
          className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
        >
          Baca Selengkapnya
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
};

export default BlogSection;
