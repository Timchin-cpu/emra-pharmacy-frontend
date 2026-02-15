import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { bannersAPI } from '../services/apiService';
import './PromoBanners.css';

const FALLBACK_BANNERS = [
  {
    id: 1,
    title: 'Скидка 20%',
    description: 'На все витамины и БАДы',
    buttonText: 'К покупкам',
    image: 'https://images.unsplash.com/photo-1550572017-4814c6f5a5a7?w=1200&q=80',
  },
  {
    id: 2,
    title: 'Бесплатная доставка',
    description: 'При заказе от 1000₽',
    buttonText: 'К покупкам',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80',
  },
  {
    id: 3,
    title: 'Новинки месяца',
    description: 'Пробиотики премиум класса',
    buttonText: 'К покупкам',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=1200&q=80',
  },
];

export default function PromoBanners() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const response = await bannersAPI.getActive();
        const raw = response?.data ?? response;
        const list = Array.isArray(raw) ? raw
          : Array.isArray(raw?.banners) ? raw.banners
          : Array.isArray(raw?.items) ? raw.items
          : [];
        setBanners(list.length > 0 ? list : FALLBACK_BANNERS);
      } catch {
        setBanners(FALLBACK_BANNERS);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const scrollToSlide = (index) => {
    const container = document.querySelector('.promo-banners-scroll');
    if (container) {
      container.scrollTo({ left: index * container.clientWidth, behavior: 'smooth' });
    }
    setCurrentSlide(index);
  };

  const handleBannerClick = (banner) => {
    bannersAPI.trackClick?.(banner.id).catch(() => {});
    navigate(`/banner/${banner.id}`);
  };

  if (loading) {
    return (
      <section className="promo-banners">
        <div className="promo-banner" style={{ margin: '0 1rem', background: 'var(--color-card)', height: '16rem', borderRadius: '1rem' }} />
      </section>
    );
  }

  return (
    <section className="promo-banners">
      <div className="promo-banners-container">
        <div className="promo-banners-scroll">
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="promo-banner-slide"
              onViewportEnter={() => setCurrentSlide(index)}
            >
              <div
                className="promo-banner"
                onClick={() => handleBannerClick(banner)}
                style={{ cursor: 'pointer' }}
              >
                <div className="promo-banner-image">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80'; }}
                  />
                </div>
                <div className="promo-banner-gradient" />
                <div className="promo-banner-content">
                  <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="promo-banner-title"
                  >
                    {banner.title}
                  </motion.h2>
                  {banner.subtitle && (
                    <motion.p
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="promo-banner-description"
                    >
                      {banner.subtitle}
                    </motion.p>
                  )}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <button
                      className="promo-banner-button"
                      onClick={(e) => { e.stopPropagation(); handleBannerClick(banner); }}
                    >
                      {banner.buttonText || 'К покупкам'}
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="promo-banners-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`promo-banner-dot ${currentSlide === index ? 'promo-banner-dot-active' : ''}`}
              aria-label={`Слайд ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}