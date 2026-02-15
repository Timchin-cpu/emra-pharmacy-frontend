import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import ProductCard from '../components/ProductCard';
import { bannersAPI } from '../services/apiService';
import { useProducts } from '../context/ProductsContext';
import './BannerPage.css';

// Рандомные данные для каждого баннера пока нет API
const MOCK_BANNERS = {
  1: {
    title: 'Зимняя распродажа',
    description: 'Специальная подборка товаров для вашего здоровья со скидками до 30%',
    image: 'https://images.unsplash.com/photo-1550572017-4814c6f5a5a7?w=1200&q=80',
    promoTitle: '-30%',
    promoSubtitle: 'Специальное предложение',
    promoText: 'На все товары из подборки действует скидка',
    promoButton: 'Перейти к покупкам',
    sectionTitle: 'Рекомендуемые товары',
    sectionSubtitle: 'Тщательно отобранные препараты для поддержания вашего здоровья',
  },
  2: {
    title: 'Бесплатная доставка',
    description: 'При заказе от 1000₽ доставим бесплатно',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80',
    promoTitle: '0₽',
    promoSubtitle: 'Бесплатная доставка',
    promoText: 'При заказе от 1000₽',
    promoButton: 'Перейти к покупкам',
    sectionTitle: 'Популярные товары',
    sectionSubtitle: 'Самые востребованные препараты нашей аптеки',
  },
  3: {
    title: 'Новинки месяца',
    description: 'Пробиотики и витамины премиум класса — новинки февраля',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=1200&q=80',
    promoTitle: 'NEW',
    promoSubtitle: 'Новинки месяца',
    promoText: 'Первыми попробуйте новые поступления',
    promoButton: 'Смотреть новинки',
    sectionTitle: 'Новые поступления',
    sectionSubtitle: 'Свежие поступления этого месяца',
  },
};

export default function BannerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading: productsLoading } = useProducts();
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        // Пробуем загрузить с сервера
        const response = await bannersAPI.getActive();
        const raw = response?.data ?? response;
        const list = Array.isArray(raw) ? raw
          : Array.isArray(raw?.banners) ? raw.banners
          : Array.isArray(raw?.items) ? raw.items
          : [];
        const found = list.find(b => String(b.id) === String(id));
        if (found) {
          setBanner(found);
        } else {
          // Фолбэк на моковые данные
          setBanner(MOCK_BANNERS[id] || MOCK_BANNERS[1]);
        }
      } catch {
        setBanner(MOCK_BANNERS[id] || MOCK_BANNERS[1]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // Берём первые 6 товаров как "рекомендуемые"
  const recommended = products.slice(0, 6);

  const scrollToProducts = () => {
    const el = document.getElementById('banner-products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="banner-page">
        <Header />
        <div style={{ textAlign: 'center', padding: '120px 20px' }}>
          <p style={{ color: '#666' }}>Загрузка...</p>
        </div>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="banner-page">
      <Header />

      <main>
        {/* Hero баннер */}
        <div className="banner-hero">
          <div className="banner-hero-image">
            <img src={banner.image} alt={banner.title} />
          </div>
          <div className="banner-hero-gradient" />
          <div className="banner-hero-content">
            {/* <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="banner-back-btn"
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={18} />
              Назад
            </motion.button> */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="banner-hero-title"
            >
              {banner.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="banner-hero-description"
            >
              {banner.description}
            </motion.p>
          </div>
        </div>

        {/* Промо блок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="banner-promo-block"
        >
          <div className="banner-promo-inner">
            <p className="banner-promo-title">{banner.promoTitle}</p>
            <p className="banner-promo-subtitle">{banner.promoSubtitle}</p>
            <p className="banner-promo-text">{banner.promoText}</p>
            <button className="banner-promo-btn" onClick={scrollToProducts}>
              {banner.promoButton}
            </button>
          </div>
        </motion.div>

        {/* Сетка товаров */}
        <section id="banner-products" className="banner-products-section">
          <div className="banner-products-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="banner-products-header"
            >
              <h2 className="banner-products-title">{banner.sectionTitle}</h2>
              <p className="banner-products-subtitle">{banner.sectionSubtitle}</p>
            </motion.div>

            {productsLoading ? (
              <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                Загрузка товаров...
              </p>
            ) : (
              <div className="banner-products-grid">
                {recommended.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}