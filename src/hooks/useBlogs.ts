import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Blog {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  author: string | null;
  category: string | null;
  is_published: boolean | null;
  published_at: string | null;
  created_at: string;
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setBlogs(data || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading };
};
