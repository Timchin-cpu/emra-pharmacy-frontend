import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import './ProductCard.css';

export default function ProductCard({ product, index }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const price = typeof product.price === 'string'
    ? parseFloat(product.price)
    : Number(product.price);

  const oldPrice = product.oldPrice != null
    ? (typeof product.oldPrice === 'string' ? parseFloat(product.oldPrice) : Number(product.oldPrice))
    : null;

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite({
        id: product.id,
        name: product.name,
        price: price,
        image: product.image,
        category: product.category,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card-wrapper"
    >
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-card">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="product-card-image-wrapper">
              <div className="product-card-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-card-image"
                  loading="lazy"
                />
              </div>
              {product.tag && (
                <span className="product-card-tag">{product.tag}</span>
              )}
              <button
                onClick={handleToggleFavorite}
                className="product-card-favorite"
                aria-label={isFavorite(product.id) ? 'Убрать из избранного' : 'Добавить в избранное'}
              >
                <Heart
                  size={18}
                  className={isFavorite(product.id) ? 'product-card-favorite-active' : ''}
                />
              </button>
            </div>

            <h3 className="product-card-name">{product.name}</h3>

            {oldPrice ? (
              <div className="product-card-price-wrapper">
                <span className="product-card-price-old">₽{oldPrice.toFixed(2)}</span>
                <span className="product-card-price product-card-price-sale">₽{price.toFixed(2)}</span>
              </div>
            ) : (
              <p className="product-card-price">₽{price.toFixed(2)}</p>
            )}
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}