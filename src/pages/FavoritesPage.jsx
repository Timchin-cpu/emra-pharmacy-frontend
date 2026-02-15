import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useFavorites } from '../context/FavoritesContext';
import './FavoritesPage.css';

const formatPrice = (value) => {
  const num = typeof value === 'string' ? parseFloat(value) : Number(value);
  return Math.round(num).toLocaleString('ru-RU');
};

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="favorites-page">
      <Header />
      <main className="favorites-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="favorites-title">Избранное</h1>
          <p className="favorites-count">
            {favorites.length} {favorites.length === 1 ? 'товар' : 'товаров'}
          </p>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="favorites-empty"
          >
            <Heart size={80} strokeWidth={1} />
            <h2>Ваш список избранного пуст</h2>
            <p>Добавляйте товары в избранное, чтобы не потерять их</p>
            <Link to="/">
              <button className="btn-primary">Перейти к покупкам</button>
            </Link>
          </motion.div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="favorite-card"
              >
                <Link to={`/product/${item.id}`}>
                  <div className="favorite-image-wrapper">
                    <div className="favorite-image-container">
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>
                  </div>
                  <h3 className="favorite-name">{item.name}</h3>
                  <p className="favorite-price">₸ {formatPrice(item.price)}</p>
                </Link>
                <div className="favorite-actions">
                  <button
                    onClick={() => removeFavorite(item.id)}
                    className="btn-remove"
                  >
                    <Heart size={16} className="heart-filled" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}