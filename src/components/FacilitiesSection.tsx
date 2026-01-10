import { 
  Waves, 
  Dumbbell, 
  Utensils, 
  Car, 
  Wifi, 
  Coffee,
  Sparkles,
  Users
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const facilities = [
  {
    icon: Waves,
    name: 'Kolam Renang',
    description: 'Kolam renang outdoor dengan pemandangan kota',
  },
  {
    icon: Dumbbell,
    name: 'Fitness Center',
    description: 'Gym modern dengan peralatan lengkap 24 jam',
  },
  {
    icon: Utensils,
    name: 'Restoran',
    description: 'Restoran dengan masakan lokal dan internasional',
  },
  {
    icon: Car,
    name: 'Parkir Gratis',
    description: 'Area parkir luas dan aman untuk tamu hotel',
  },
  {
    icon: Wifi,
    name: 'WiFi Gratis',
    description: 'Koneksi internet cepat di seluruh area hotel',
  },
  {
    icon: Coffee,
    name: 'Lobby Lounge',
    description: 'Lounge nyaman untuk bersantai dan meeting',
  },
  {
    icon: Sparkles,
    name: 'Spa & Wellness',
    description: 'Layanan spa dan pijat relaksasi profesional',
  },
  {
    icon: Users,
    name: 'Meeting Room',
    description: 'Ruang meeting dengan kapasitas hingga 200 orang',
  },
];

const FacilitiesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="facilities" className="py-24 bg-hotel-cream">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef} 
          className={`text-center mb-16 ${headerVisible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <span className="inline-block px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-medium mb-4">
            Fasilitas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Fasilitas Lengkap untuk Kenyamanan Anda
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nikmati berbagai fasilitas premium yang kami sediakan untuk memberikan 
            pengalaman menginap terbaik.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <FacilityCard key={facility.name} facility={facility} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FacilityCard = ({ facility, index }: { facility: typeof facilities[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = facility.icon;

  return (
    <div
      ref={ref}
      className={`group bg-background p-6 rounded-2xl shadow-md hover-lift text-center ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-primary-light rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
        <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{facility.name}</h3>
      <p className="text-muted-foreground text-sm">{facility.description}</p>
    </div>
  );
};

export default FacilitiesSection;
