import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Footer = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div 
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ${
            isVisible ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">A</span>
              </div>
              <span className="font-bold text-xl">Andelir Hotel</span>
            </div>
            <p className="text-background/70 mb-6">
              Hotel bintang 4 dengan lokasi strategis di pusat kota Bandung. 
              Menyediakan akomodasi premium dengan pelayanan terbaik untuk 
              pengalaman menginap yang tak terlupakan.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Link Cepat</h3>
            <ul className="space-y-3">
              {['Tentang Kami', 'Kamar & Suite', 'Fasilitas', 'Galeri', 'Promo', 'Blog', 'Karir'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-background/70 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-background/70">
                  Jl. Andelir No. 123, Bandung 40123, Jawa Barat, Indonesia
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-background/70">(022) 123-4567</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-background/70">info@andelirhotel.com</span>
              </li>
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-background/70">Check-in: 14:00 | Check-out: 12:00</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-background/70 mb-4">
              Dapatkan info promo dan penawaran spesial langsung ke email Anda.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Email Anda"
                className="w-full px-4 py-3 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-primary hover:bg-primary-dark text-primary-foreground rounded-lg font-medium transition-colors"
              >
                Berlangganan
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm text-center md:text-left">
            © 2026 Andelir Hotel. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
