import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './HeroBanner.css';

export default function HeroBanner() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Telegram WebApp может блокировать autoplay — принудительно запускаем
    video.muted = true;
    video.play().catch(() => {
      // Если autoplay заблокирован — просто показываем постер
    });
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-banner">
      <div className="hero-gradient" />

      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        webkit-playsinline="true"
        x5-playsinline="true"
      />

      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hero-title"
        >
          Скандинавское качество с 30 летний историей
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hero-subtitle"
        >
          Beauty from within
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <button onClick={scrollToProducts} className="hero-button">
            Перейти к покупкам
          </button>
        </motion.div>
      </div>
    </section>
  );
}