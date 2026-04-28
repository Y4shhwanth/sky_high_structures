import HeroSequence from "@/components/HeroSequence";
import Navbar from "@/components/Navbar";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import EstimatorSection from "@/components/EstimatorSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import SocialProofSection from "@/components/SocialProofSection";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import AIChatbot from "@/components/AIChatbot";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSequence />
      <StatsSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <AboutSection />
      <BlogSection />
      <TestimonialsSection />
      <EstimatorSection />
      <ContactSection />
      <SocialProofSection />
      <Footer />
      <WhatsAppWidget />
      <AIChatbot />
    </main>
  );
}
