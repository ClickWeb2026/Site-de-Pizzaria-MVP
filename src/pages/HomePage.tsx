import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { InfoSection } from '../components/home/InfoSection';
export function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <InfoSection />
    </main>);

}