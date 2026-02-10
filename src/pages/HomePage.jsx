import { useEffect } from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import CategoryChips from '../components/CategoryChips';
import PromoBanners from '../components/PromoBanners';
import ProductGrid from '../components/ProductGrid';
import TrustBar from '../components/TrustBar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import './HomePage.css';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page">
      <Header />
      <main>
        <HeroBanner />
        <CategoryChips />
        <PromoBanners />
        <ProductGrid />
        <TrustBar />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
