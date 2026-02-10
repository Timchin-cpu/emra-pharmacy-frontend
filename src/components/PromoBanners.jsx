import { useState } from 'react';
import { motion } from 'framer-motion';
import './PromoBanners.css';

const banners = [
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
              <div className="promo-banner">
                <div className="promo-banner-image">
                  <img src={banner.image} alt={banner.title} />
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
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="promo-banner-description"
                  >
                    {banner.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <button className="promo-banner-button">
                      {banner.buttonText}
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
              onClick={() => {
                const container = document.querySelector('.promo-banners-scroll');
                if (container) {
                  container.scrollTo({
                    left: index * container.clientWidth,
                    behavior: 'smooth',
                  });
                }
                setCurrentSlide(index);
              }}
              className={`promo-banner-dot ${currentSlide === index ? 'promo-banner-dot-active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
