import ScrollCanvas from '@/components/shared/ScrollCanvas'
import FloatingParticles from '@/components/shared/FloatingParticles'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import SpecialtiesSection from '@/components/sections/SpecialtiesSection'
import StatsSection from '@/components/sections/StatsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <ScrollCanvas />
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
        <FloatingParticles />
      </div>
      <div className="relative" style={{ zIndex: 1 }}>
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <SpecialtiesSection />
          <StatsSection />
          <ServicesSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
