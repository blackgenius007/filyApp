import React from 'react';
import HeroSection from '../HeroSection/hero1';
import FeatureSection from './features';
import Stats from './stats';

function home() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <Stats />
    </div>
  );
}

export default home;
