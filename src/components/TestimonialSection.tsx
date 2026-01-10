import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Wijaya',
    location: 'Jakarta',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    comment: 'Pengalaman menginap yang luar biasa! Pelayanan sangat ramah dan kamar sangat bersih. Lokasi strategis dekat dengan pusat kota Bandung. Pasti akan kembali lagi!',
    date: 'Desember 2025',
  },
  {
    id: 2,
    name: 'Budi Santoso',
    location: 'Surabaya',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    comment: 'Hotel dengan view yang indah dan fasilitas lengkap. Sarapan prasmanan sangat enak dengan banyak pilihan. Staff hotel sangat membantu dan profesional.',
    date: 'November 2025',
  },
  {
    id: 3,
    name: 'Linda Kusuma',
    location: 'Yogyakarta',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    comment: 'Cocok untuk liburan keluarga! Anak-anak sangat senang dengan kolam renangnya. Kamar luas dan nyaman. Harga sangat worth it dengan kualitas yang didapat.',
    date: 'Oktober 2025',
  },
  {
    id: 4,
    name: 'Ahmad Rizky',
    location: 'Semarang',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    comment: 'Saya sering menginap di sini untuk urusan bisnis. WiFi cepat, meeting room bagus, dan akses ke bandara mudah. Highly recommended untuk business travelers!',
    date: 'September 2025',
  },
  {
    id: 5,
    name: 'Maria Chen',
    location: 'Medan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    comment: 'Anniversary kami di sini sangat berkesan. Tim hotel memberikan surprise decoration yang sangat romantic. Terima kasih Andelir Hotel!',
    date: 'Agustus 2025',
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}
        />
      ))}
    </div>
  );
};

const TestimonialSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section id="testimonials" className="py-20 bg-primary-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider mb-2 block">
            Testimoni
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Apa Kata Tamu Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dengarkan pengalaman langsung dari tamu yang telah menginap di Andelir Hotel
          </p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                <Card className="bg-background border-none shadow-lg h-full">
                  <CardContent className="p-6 md:p-8 relative">
                    <Quote className="absolute top-4 right-4 text-primary/20 w-10 h-10" />
                    
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-14 h-14 border-2 border-primary/20">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                    
                    <StarRating rating={testimonial.rating} />
                    
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      "{testimonial.comment}"
                    </p>
                    
                    <p className="mt-4 text-sm text-primary font-medium">
                      {testimonial.date}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-background hover:bg-primary hover:text-primary-foreground border-primary/20" />
            <div className="flex gap-2">
              {[...Array(count)].map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current - 1
                      ? 'bg-primary w-6'
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
            <CarouselNext className="static translate-y-0 bg-background hover:bg-primary hover:text-primary-foreground border-primary/20" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialSection;
