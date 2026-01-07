import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import FeaturedItems from './components/FeaturedItems';
import HowItWorks from './components/HowItWorks';
import PhotoVerification from './components/PhotoVerification';
import PriceValuation from './components/PriceValuation';
import Testimonials from './components/Testimonials';
import MarketData from './components/MarketData';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main>
        <Hero />
        <Features />
        <FeaturedItems />
        <HowItWorks />
        <PhotoVerification />
        <PriceValuation />
        <Testimonials />
        <MarketData />
      </main>
      <Footer />
    </div>
  );
};

export default App;