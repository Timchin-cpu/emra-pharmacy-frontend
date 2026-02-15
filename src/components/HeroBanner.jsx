import { motion } from 'framer-motion';
import './HeroBanner.css';

export default function HeroBanner() {
  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-banner">
      <video
        className="hero-video"
        src="https://res.cloudinary.com/dzluxn3z5/video/upload/v1771177447/0215_ztyzpw.mov"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      <div className="hero-gradient" />

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