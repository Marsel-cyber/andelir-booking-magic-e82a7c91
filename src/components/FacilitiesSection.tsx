import { 
  Waves, 
  Dumbbell, 
  Utensils, 
  Car, 
  Wifi, 
  Coffee,
  Sparkles,
  Users,
  LucideIcon
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const facilities = [
  {
    icon: Waves,
    name: 'Kolam Renang',
    description: 'Kolam renang outdoor dengan pemandangan kota',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
  },
  {
    icon: Dumbbell,
    name: 'Fitness Center',
    description: 'Gym modern dengan peralatan lengkap 24 jam',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
  },
  {
    icon: Utensils,
    name: 'Restoran',
    description: 'Restoran dengan masakan lokal dan internasional',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
  },
  {
    icon: Sparkles,
    name: 'Spa & Wellness',
    description: 'Layanan spa dan pijat relaksasi profesional',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
  },
];

const quickFacilities = [
  { icon: Car, name: 'Parkir Gratis' },
  { icon: Wifi, name: 'WiFi Gratis' },
  { icon: Coffee, name: 'Lobby Lounge' },
  { icon: Users, name: 'Meeting Room' },
];

const FacilitiesSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="facilities" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef} 
          className={`text-center mb-16 ${headerVisible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Fasilitas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Fasilitas Premium
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nikmati berbagai fasilitas untuk kenyamanan Anda
          </p>
        </div>

        {/* Main Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {facilities.map((facility, index) => (
            <FacilityCard key={facility.name} facility={facility} index={index} />
          ))}
        </div>

        {/* Quick Facilities */}
        <div className="flex flex-wrap justify-center gap-4">
          {quickFacilities.map((item) => (
            <QuickFacilityBadge key={item.name} icon={item.icon} name={item.name} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FacilityCardProps {
  facility: {
    icon: LucideIcon;
    name: string;
    description: string;
    image: string;
  };
  index: number;
}

const FacilityCard = ({ facility, index }: FacilityCardProps) => {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = facility.icon;

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl h-72 ${
        isVisible ? 'animate-fade-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url('${facility.image}')` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-xl font-bold mb-1">{facility.name}</h3>
        <p className="text-white/80 text-sm">{facility.description}</p>
      </div>
    </div>
  );
};

const QuickFacilityBadge = ({ icon: Icon, name }: { icon: LucideIcon; name: string }) => {
  return (
    <div className="flex items-center gap-2 px-5 py-3 bg-muted rounded-full">
      <Icon className="w-5 h-5 text-primary" />
      <span className="font-medium text-foreground">{name}</span>
    </div>
  );
};

export default FacilitiesSection;