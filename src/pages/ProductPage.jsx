import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Minus, Plus, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useProducts } from '../context/ProductsContext';
import './ProductPage.css';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { getProductById } = useProducts();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [openAccordion, setOpenAccordion] = useState(null);

  // Загрузка товара при монтировании
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

  // Установка варианта по умолчанию
  useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  // Безопасное преобразование цены
  const price = product ? (
    typeof product.price === 'string' 
      ? parseFloat(product.price) 
      : Number(product.price)
  ) : 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id + (selectedVariant ? `-${selectedVariant}` : ''),
      name: product.name,
      price: price,
      quantity,
      image: product.image,
      variant: selectedVariant,
    });
  };

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

  const toggleAccordion = (value) => {
    setOpenAccordion(openAccordion === value ? null : value);
  };

  // Состояние загрузки
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

  // Товар не найден
  if (!product) {
    return (
      <div className="product-page">
        <Header />
        <div className="product-not-found">
          <h1>Товар не найден</h1>
          <button onClick={() => navigate('/')} className="btn-primary">
            На главную
          </button>
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
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="product-info-section"
          >
            <div className="product-header">
              <div>
                {product.tag && (
                  <span className="product-tag">{product.tag}</span>
                )}
                <h1 className="product-title">{product.name}</h1>
              </div>
              <button
                onClick={handleToggleFavorite}
                className="product-favorite-btn"
                aria-label={isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  size={32}
                  className={isFavorite(product.id) ? 'favorite-active' : ''}
                />
              </button>
            </div>

            <p className="product-price">₽{price.toFixed(2)}</p>

            <p className="product-description">{product.description}</p>

            {product.variants && product.variants.length > 0 && (
              <div className="product-variants">
                <label className="product-label">Выберите вариант</label>
                <div className="variant-buttons">
                  {product.variants.map((variant) => (
                    <button
                      key={variant}
                      onClick={() => setSelectedVariant(variant)}
                      className={`variant-btn ${selectedVariant === variant ? 'variant-btn-active' : ''}`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="product-quantity">
              <label className="product-label">Количество</label>
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                >
                  <Minus size={20} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <button onClick={handleAddToCart} className="btn-add-to-cart">
              Добавить в корзину
            </button>

            <div className="product-accordion">
              <div className="accordion-item">
                <button
                  onClick={() => toggleAccordion('ingredients')}
                  className="accordion-trigger"
                >
                  Состав
                  <ChevronDown
                    size={20}
                    className={`accordion-icon ${openAccordion === 'ingredients' ? 'accordion-icon-open' : ''}`}
                  />
                </button>
                {openAccordion === 'ingredients' && (
                  <div className="accordion-content">
                    {product.ingredients || 'Качественные компоненты, тщательно подобранные для оптимального результата.'}
                  </div>
                )}
              </div>

              <div className="accordion-item">
                <button
                  onClick={() => toggleAccordion('usage')}
                  className="accordion-trigger"
                >
                  Способ применения
                  <ChevronDown
                    size={20}
                    className={`accordion-icon ${openAccordion === 'usage' ? 'accordion-icon-open' : ''}`}
                  />
                </button>
                {openAccordion === 'usage' && (
                  <div className="accordion-content">
                    {product.usage || 'Применять согласно инструкции. Для достижения наилучших результатов использовать регулярно.'}
                  </div>
                )}
              </div>

              <div className="accordion-item">
                <button
                  onClick={() => toggleAccordion('safety')}
                  className="accordion-trigger"
                >
                  Меры предосторожности
                  <ChevronDown
                    size={20}
                    className={`accordion-icon ${openAccordion === 'safety' ? 'accordion-icon-open' : ''}`}
                  />
                </button>
                {openAccordion === 'safety' && (
                  <div className="accordion-content">
                    {product.safety || 'Сертифицированный препарат. Перед применением проконсультируйтесь с врачом.'}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}