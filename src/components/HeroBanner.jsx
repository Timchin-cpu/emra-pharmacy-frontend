import { motion } from 'framer-motion';
import './HeroBanner.css';

export default function HeroBanner() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-banner">
      <div className="hero-gradient" />
      
      <motion.video
        src="https://c.animaapp.com/mlb3gun1em62JQ/img/ai_1.mp4"
        poster="https://c.animaapp.com/mlb3gun1em62JQ/img/ai_1-poster.png"
        alt="Cherry Cola skincare collection on ice"
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hero-title"
        >
          Здоровье в надежных руках
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hero-subtitle"
        >
          Качественные лекарства и витамины для вашего здоровья
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
