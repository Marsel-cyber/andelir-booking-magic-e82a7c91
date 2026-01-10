import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const PromoBanner = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="promo" className="py-16 bg-primary overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-background rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-background rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={ref}
          className={`flex flex-col lg:flex-row items-center justify-between gap-8 ${
            isVisible ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm px-4 py-2 rounded-full text-primary-foreground mb-4">
              <Sparkles className="w-4 h-4 animate-bounce-subtle" />
              <span className="text-sm font-medium">Promo Spesial</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Diskon Hingga <span className="text-hotel-gold">30%</span>
            </h2>
            
            <p className="text-primary-foreground/90 text-lg max-w-xl mb-6">
              Pesan sekarang dan nikmati diskon spesial untuk menginap di Andelir Hotel. 
              Berlaku untuk pemesanan minimal 2 malam.
            </p>

            <div className="flex items-center gap-4 justify-center lg:justify-start text-primary-foreground/80 mb-8">
              <Clock className="w-5 h-5" />
              <span>Promo berakhir dalam 3 hari!</span>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="bg-background text-primary hover:bg-hotel-gold hover:text-foreground gap-2 font-semibold"
              >
                Klaim Promo
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Lihat Syarat & Ketentuan
              </Button>
            </div>
          </div>

          {/* Right Content - Promo Card */}
          <div className="bg-background rounded-3xl p-8 shadow-2xl max-w-sm w-full animate-float">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Mulai dari</p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-2xl text-muted-foreground line-through">Rp 1.200.000</span>
              </div>
              <div className="text-5xl font-bold text-primary mb-2">Rp 840.000</div>
              <p className="text-muted-foreground">/malam</p>
              
              <div className="my-6 border-t border-border" />
              
              <ul className="text-left space-y-3 mb-6">
                {['Breakfast untuk 2 orang', 'Late checkout hingga 14:00', 'Akses kolam renang gratis', 'Free upgrade kamar*'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-foreground">
                    <span className="w-5 h-5 bg-primary-light text-primary rounded-full flex items-center justify-center text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              
              <Button className="w-full bg-primary hover:bg-primary-dark text-primary-foreground">
                Pesan Sekarang
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
