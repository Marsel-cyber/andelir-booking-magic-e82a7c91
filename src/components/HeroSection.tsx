import BookingWidget from './BookingWidget';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070')`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-40">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-block px-4 py-2 bg-primary/90 text-primary-foreground rounded-full text-sm font-medium mb-6">
            ⭐ Hotel Bintang 4 di Bandung
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
            Pengalaman Menginap{' '}
            <span className="text-hotel-gold">Premium</span> di Jantung Kota
          </h1>
          <p className="text-lg md:text-xl text-background/90 mb-8 max-w-2xl">
            Nikmati kenyamanan dan kemewahan di Andelir Hotel. Lokasi strategis, 
            fasilitas lengkap, dan pelayanan terbaik untuk liburan sempurna Anda.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#rooms"
              className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-dark text-primary-foreground rounded-lg font-semibold transition-all hover-lift"
            >
              Lihat Kamar
            </a>
            <a
              href="#facilities"
              className="inline-flex items-center px-8 py-4 bg-background/20 hover:bg-background/30 text-background border-2 border-background/50 rounded-lg font-semibold transition-all backdrop-blur-sm"
            >
              Jelajahi Fasilitas
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-32 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16 text-background">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-hotel-gold">150+</div>
              <div className="text-sm opacity-80">Kamar Nyaman</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-hotel-gold">4.8</div>
              <div className="text-sm opacity-80">Rating Tamu</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-hotel-gold">15+</div>
              <div className="text-sm opacity-80">Tahun Pengalaman</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-hotel-gold">50K+</div>
              <div className="text-sm opacity-80">Tamu Puas</div>
            </div>
          </div>
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
