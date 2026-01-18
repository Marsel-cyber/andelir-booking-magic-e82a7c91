import { Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useRooms } from '@/hooks/useRooms';
import { useSettings } from '@/hooks/useSettings';
import roomDouble from '@/assets/room-double.jpeg';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

const RoomsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { rooms, loading } = useRooms();
  const { settings } = useSettings();

  const handleBooking = () => {
    const phoneNumber = settings.whatsapp_number || '6282221016393';
    const message = encodeURIComponent('Halo, saya ingin melakukan reservasi kamar di Andelir Hotel.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="rooms" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`text-center mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="inline-block px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-medium mb-4">
            Akomodasi
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pilihan Kamar Terbaik
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan kenyamanan sempurna di setiap kamar kami yang dirancang dengan 
            sentuhan modern dan fasilitas lengkap.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Belum ada kamar yang tersedia
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {rooms.map((room, index) => (
              <RoomCard key={room.id} room={room} index={index} onBook={handleBooking} />
            ))}
          </div>
        )}

        {rooms.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Lihat Semua Kamar
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

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

const RoomCard = ({ room, index, onBook }: { room: Room; index: number; onBook: () => void }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group bg-card rounded-2xl overflow-hidden shadow-lg hover-lift ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={room.image_url || roomDouble}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {room.size && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            {room.size}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
          <Users className="w-4 h-4" />
          <span>Maks {room.max_guests || 2} Tamu</span>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2">{room.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{room.description || 'Kamar nyaman dengan fasilitas lengkap'}</p>

        {room.amenities && room.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {room.amenities.map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
              >
                {amenity}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-2xl font-bold text-primary">{formatPrice(room.price)}</span>
            <span className="text-muted-foreground text-sm">/malam</span>
          </div>
          <Button onClick={onBook} className="bg-primary hover:bg-primary-dark text-primary-foreground">
            Pesan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomsSection;
