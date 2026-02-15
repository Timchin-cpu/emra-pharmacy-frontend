import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import './FavoritesPage.css';

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const { addItem } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (item) => {
    // Безопасное преобразование цены
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price) 
      : Number(item.price);

    addItem({
      id: item.id,
      name: item.name,
      price: price,
      quantity: 1,
      image: item.image,
    });
  };

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
            {favorites.map((item, index) => {
              // Безопасное преобразование цены для отображения
              const price = typeof item.price === 'string' 
                ? parseFloat(item.price) 
                : Number(item.price);

              return (
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
                    <p className="favorite-price">₸{price.toFixed(2)}</p>
                  </Link>
                  <div className="favorite-actions">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="btn-add-cart"
                    >
                      <ShoppingCart size={14} />
                      <span className="btn-text-full">В корзину</span>
                      <span className="btn-text-short">+</span>
                    </button>
                    <button
                      onClick={() => removeFavorite(item.id)}
                      className="btn-remove"
                    >
                      <Heart size={16} className="heart-filled" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
