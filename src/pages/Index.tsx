import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import RoomsSection from '@/components/RoomsSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import GallerySection from '@/components/GallerySection';
// import PromoBanner from '@/components/PromoBanner';
import BlogSection from '@/components/BlogSection';
import TestimonialSection from '@/components/TestimonialSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div className="mt-24">
        <RoomsSection />
      </div>
      <FacilitiesSection />
      <GallerySection />
      {/* <PromoBanner /> */}
      <TestimonialSection />
      <BlogSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
