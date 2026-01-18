import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useGallery } from '@/hooks/useGallery';
import hotelBuilding1 from '@/assets/hotel-building-1.jpeg';
import hotelPool from '@/assets/hotel-pool.jpeg';
import hotelRestaurant from '@/assets/hotel-restaurant.jpeg';
import hotelRestaurant2 from '@/assets/hotel-restaurant-2.jpeg';
import roomDouble from '@/assets/room-double.jpeg';
import roomTwin from '@/assets/room-twin.jpeg';

const fallbackImages = [
  { id: '1', image_url: hotelBuilding1, alt_text: 'Gedung Hotel', category: 'Eksterior' },
  { id: '2', image_url: hotelPool, alt_text: 'Kolam Renang', category: 'Fasilitas' },
  { id: '3', image_url: hotelRestaurant, alt_text: 'Restoran', category: 'Restoran' },
  { id: '4', image_url: hotelRestaurant2, alt_text: 'Area Makan', category: 'Restoran' },
  { id: '5', image_url: roomDouble, alt_text: 'Deluxe Room', category: 'Kamar' },
  { id: '6', image_url: roomTwin, alt_text: 'Suite Room', category: 'Kamar' },
];

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  category: string | null;
}

const GallerySection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { gallery, loading } = useGallery();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('Semua');

  // Use database images or fallback
  const images: GalleryImage[] = gallery.length > 0 ? gallery : fallbackImages;

  // Get unique categories
  const categories = ['Semua', ...Array.from(new Set(images.map(img => img.category || 'Lainnya')))];

  const filteredImages = activeFilter === 'Semua' 
    ? images 
    : images.filter(img => img.category === activeFilter);

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
          {categories.map((filter) => (
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
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
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
        )}

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
              src={filteredImages[selectedImage].image_url}
              alt={filteredImages[selectedImage].alt_text || 'Gallery image'}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            
            <button
              onClick={goToNext}
              className="absolute right-4 text-background hover:text-primary transition-colors"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="absolute bottom-4 text-background text-center">
              <p className="font-medium">{filteredImages[selectedImage].alt_text}</p>
              <p className="text-sm opacity-70">{selectedImage + 1} / {filteredImages.length}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const GalleryItem = ({ image, index, onClick }: { 
  image: GalleryImage; 
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
        src={image.image_url}
        alt={image.alt_text || 'Gallery image'}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-background translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="font-medium">{image.alt_text}</p>
        <p className="text-sm opacity-80">{image.category}</p>
      </div>
    </div>
  );
};

export default GallerySection;
