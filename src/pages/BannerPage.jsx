import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import ProductCard from '../components/ProductCard';
import { bannersAPI } from '../services/apiService';
import { useProducts } from '../context/ProductsContext';
import './BannerPage.css';

export default function BannerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading: productsLoading } = useProducts();
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        const response = await bannersAPI.getActive();
        const raw = response?.data ?? response;
        const list = Array.isArray(raw) ? raw
          : Array.isArray(raw?.banners) ? raw.banners
          : Array.isArray(raw?.items) ? raw.items
          : [];
        const found = list.find(b => String(b.id) === String(id));
        if (found) setBanner(found);
      } catch {
        // баннер не найден
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const recommended = products.slice(0, 6);

  if (loading) {
    return (
      <div className="banner-page">
        <Header />
        <div style={{ textAlign: 'center', padding: '120px 20px' }}>
          <p style={{ color: '#666' }}>Загрузка...</p>
        </div>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  if (!banner) {
    return (
      <div className="banner-page">
        <Header />
        <div style={{ textAlign: 'center', padding: '120px 20px' }}>
          <p style={{ color: '#666' }}>Баннер не найден</p>
          <button onClick={() => navigate('/')} style={{ marginTop: 16, padding: '0.75rem 1.5rem', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            На главную
          </button>
        </div>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="banner-page">
      <Header />
      <main>

        {/* Hero баннер */}
        <div className="banner-hero">
          {banner.image && (
            <div className="banner-hero-image">
              <img src={banner.image} alt={banner.title} />
            </div>
          )}
          <div className="banner-hero-gradient" />
          <div className="banner-hero-content">
   
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="banner-hero-title"
            >
              {banner.title}
            </motion.h1>
            {banner.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="banner-hero-subtitle"
              >
                {banner.subtitle}
              </motion.p>
            )}
            {banner.link && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <a
                  href={banner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="banner-hero-btn"
                >
                  Перейти
                </a>
              </motion.div>
            )}
          </div>
        </div>

        {/* Товары */}
        <section className="banner-products-section">
          <div className="banner-products-container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="banner-products-title"
            >
              Рекомендуемые товары
            </motion.h2>

            {productsLoading ? (
              <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Загрузка товаров...</p>
            ) : (
              <div className="banner-products-grid">
                {recommended.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}