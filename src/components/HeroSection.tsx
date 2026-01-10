import BookingWidget from './BookingWidget';
import hotelBuilding from '@/assets/hotel-building-2.jpeg';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${hotelBuilding})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Selamat Datang di{' '}
            <span className="text-hotel-gold">Andelir Hotel</span>
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-xl">
            Pengalaman menginap mewah di jantung kota Bandung dengan pelayanan terbaik.
          </p>
          <a
            href="#rooms"
            className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-dark text-primary-foreground rounded-lg font-semibold transition-all hover-lift"
          >
            Jelajahi Kamar
          </a>
        </div>
      </div>

      {/* Booking Widget positioned at bottom */}
      <div className="absolute -bottom-16 left-0 right-0 z-20 px-4">
        <BookingWidget />
      </div>
    </section>
  );
};

export default HeroSection;
