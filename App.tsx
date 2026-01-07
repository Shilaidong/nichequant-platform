import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import FeaturedItems from './components/FeaturedItems';
import LatestDrops from './components/LatestDrops';
import HowItWorks from './components/HowItWorks';
import PhotoVerification from './components/PhotoVerification';
import PriceValuation from './components/PriceValuation';
import Testimonials from './components/Testimonials';
import MarketData from './components/MarketData';
import Footer from './components/Footer';
import { AuthProvider } from './src/context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen w-full">
        <Header />
        <main>
          <Hero />
          <Features />
          <LatestDrops />
          <FeaturedItems />
          <HowItWorks />
          <PhotoVerification />
          <PriceValuation />
          <Testimonials />
          <MarketData />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;