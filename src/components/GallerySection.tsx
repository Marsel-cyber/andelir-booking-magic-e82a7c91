import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
    alt: 'Lobby Hotel',
    category: 'Lobby',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070',
    alt: 'Kamar Deluxe',
    category: 'Kamar',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080',
    alt: 'Kolam Renang',
    category: 'Fasilitas',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070',
    alt: 'Restoran',
    category: 'Restoran',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074',
    alt: 'Suite Room',
    category: 'Kamar',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070',
    alt: 'Pool View',
    category: 'Fasilitas',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070',
    alt: 'Spa',
    category: 'Fasilitas',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070',
    alt: 'Presidential Suite',
    category: 'Kamar',
  },
];

const GallerySection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filters = ['Semua', 'Kamar', 'Fasilitas', 'Restoran', 'Lobby'];

  const filteredImages = activeFilter === 'Semua' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };
  
  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef} 
          className={`text-center mb-12 ${headerVisible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <span className="inline-block px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-medium mb-4">
            Galeri
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Jelajahi Keindahan Hotel Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lihat koleksi foto dari berbagai sudut hotel dan fasilitas kami.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-primary-light hover:text-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <GalleryItem 
              key={image.id} 
              image={image} 
              index={index} 
              onClick={() => openLightbox(index)} 
            />
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-background hover:text-primary transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={goToPrevious}
              className="absolute left-4 text-background hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            
            <img
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            
            <button
              onClick={goToNext}
              className="absolute right-4 text-background hover:text-primary transition-colors"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="absolute bottom-4 text-background text-center">
              <p className="font-medium">{filteredImages[selectedImage].alt}</p>
              <p className="text-sm opacity-70">{selectedImage + 1} / {filteredImages.length}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const GalleryItem = ({ image, index, onClick }: { 
  image: typeof galleryImages[0]; 
  index: number; 
  onClick: () => void;
}) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`relative group cursor-pointer overflow-hidden rounded-xl aspect-square ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-background translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="font-medium">{image.alt}</p>
        <p className="text-sm opacity-80">{image.category}</p>
      </div>
    </div>
  );
};

export default GallerySection;
