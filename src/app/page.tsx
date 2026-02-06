'use client';

import AIChatWidget from '@/components/AIChatWidget';
import CTASection from '@/components/CTASection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import Navigation from '@/components/Navigation';
import ProblemSection from '@/components/ProblemSection';
import SocialProofSection from '@/components/SocialProofSection';
import React from 'react'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Problem Statement */}
      <ProblemSection />

      {/* Features */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Social Proof */}
      {/* <SocialProofSection /> */}

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
      
      <AIChatWidget />


      
    </div>
  )
}

export default LandingPage





