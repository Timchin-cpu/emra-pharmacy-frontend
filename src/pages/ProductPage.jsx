import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, ChevronDown, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useFavorites } from '../context/FavoritesContext';
import { useProducts } from '../context/ProductsContext';
import './ProductPage.css';

const formatPrice = (value) => {
  const num = typeof value === 'string' ? parseFloat(value) : Number(value);
  return Math.round(num).toLocaleString('ru-RU');
};

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { getProductById } = useProducts();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    };
    loadProduct();
    window.scrollTo(0, 0);
  }, [id, getProductById]);

  const price = product
    ? (typeof product.price === 'string' ? parseFloat(product.price) : Number(product.price))
    : 0;

  const oldPrice = product?.oldPrice != null
    ? (typeof product.oldPrice === 'string' ? parseFloat(product.oldPrice) : Number(product.oldPrice))
    : null;

  const handleToggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite({
        id: product.id,
        name: product.name,
        price: price,
        image: product.image,
        category: product.category?.name || product.category,
      });
    }
  };

  const handleBuyClick = () => {
    if (product.sku) {
      window.open(product.sku, '_blank', 'noopener,noreferrer');
    }
  };

  const toggleAccordion = (value) => {
    setOpenAccordion(openAccordion === value ? null : value);
  };

  if (loading) {
    return (
      <div className="product-page">
        <Header />
        <div className="product-not-found">
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <p style={{ fontSize: '18px', color: '#666' }}>Загрузка товара...</p>
          </div>
        </div>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page">
        <Header />
        <div className="product-not-found">
          <h1>Товар не найден</h1>
          <button onClick={() => navigate('/')} className="btn-primary">На главную</button>
        </div>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="product-page">
      <Header />
      <main className="product-main">
        <button onClick={() => navigate('/')} className="btn-back">
          <ArrowLeft size={20} />
          Назад к товарам
        </button>

        <div className="product-layout">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="product-image-section"
          >
            <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="product-info-section"
          >
            <div className="product-header">
              <div>
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <h1 className="product-title">{product.name}</h1>
              </div>
              <button
                onClick={handleToggleFavorite}
                className="product-favorite-btn"
                aria-label={isFavorite(product.id) ? 'Убрать из избранного' : 'Добавить в избранное'}
              >
                <Heart size={32} className={isFavorite(product.id) ? 'favorite-active' : ''} />
              </button>
            </div>

            {oldPrice ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--color-muted-foreground)', textDecoration: 'line-through' }}>
                  ₸ {formatPrice(oldPrice)}
                </span>
                <span className="product-price" style={{ marginBottom: 0 }}>
                  ₸ {formatPrice(price)}
                </span>
              </div>
            ) : (
              <p className="product-price">₸ {formatPrice(price)}</p>
            )}

            <p className="product-description">{product.description}</p>

            <button
              onClick={handleBuyClick}
              className="btn-add-to-cart"
              disabled={!product.sku}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <ExternalLink size={18} />
              Купить
            </button>

            <div className="product-accordion">
              {[
                { key: 'ingredients', label: 'Состав', value: product.ingredients },
                { key: 'usage', label: 'Способ применения', value: product.usage },
                { key: 'safety', label: 'Меры предосторожности', value: product.safety },
              ].map(({ key, label, value }) => (
                <div className="accordion-item" key={key}>
                  <button onClick={() => toggleAccordion(key)} className="accordion-trigger">
                    {label}
                    <ChevronDown
                      size={20}
                      className={`accordion-icon ${openAccordion === key ? 'accordion-icon-open' : ''}`}
                    />
                  </button>
                  {openAccordion === key && (
                    <div className="accordion-content">{value || '—'}</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}