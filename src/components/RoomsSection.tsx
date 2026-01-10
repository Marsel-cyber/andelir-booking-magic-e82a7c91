import { Bed, Wifi, Coffee, Bath, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const rooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    description: 'Kamar nyaman dengan pemandangan kota yang menakjubkan',
    price: 850000,
    size: '32 m²',
    guests: 2,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070',
    amenities: ['WiFi Gratis', 'AC', 'TV LED 42"', 'Minibar'],
  },
  {
    id: 2,
    name: 'Suite Room',
    description: 'Suite elegan dengan ruang tamu terpisah dan bathtub mewah',
    price: 1500000,
    size: '48 m²',
    guests: 3,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074',
    amenities: ['WiFi Gratis', 'Bathtub', 'Ruang Tamu', 'Breakfast'],
  },
  {
    id: 3,
    name: 'Presidential Suite',
    description: 'Kemewahan tertinggi dengan fasilitas eksklusif dan butler service',
    price: 3500000,
    size: '85 m²',
    guests: 4,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070',
    amenities: ['Butler Service', 'Jacuzzi', 'Living Room', 'Kitchen'],
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

const RoomsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Lihat Semua Kamar
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const RoomCard = ({ room, index }: { room: typeof rooms[0]; index: number }) => {
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
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
          {room.size}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
          <Users className="w-4 h-4" />
          <span>Maks {room.guests} Tamu</span>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2">{room.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{room.description}</p>

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

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-2xl font-bold text-primary">{formatPrice(room.price)}</span>
            <span className="text-muted-foreground text-sm">/malam</span>
          </div>
          <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
            Pesan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomsSection;
