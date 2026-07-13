import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import About from '../components/About.jsx'
import Developer from '../components/Developer.jsx'
import CTASection from '../components/CTASection.jsx'
import Footer from '../components/Footer.jsx'

const LandingPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#0B0D12] text-slate-100 overflow-x-hidden">
      {/* ambient dot grid, spans the whole page */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[1]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(94,234,212,0.10) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <Navbar />

      <main className="relative">
        <Hero />
        <Features />
        <HowItWorks />
        <WhyChooseUs />
        <About />
        <Developer />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}

export default LandingPage