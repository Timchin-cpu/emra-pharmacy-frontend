import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { useFilter } from '../context/FilterContext';
import { useProducts } from '../context/ProductsContext';
import './ProductGrid.css';

export default function ProductGrid() {
  const { selectedCategory } = useFilter();
  const { products, loading, error } = useProducts();

  // Фильтрация по категории
  const filteredProducts = selectedCategory
    ? products.filter((product) => 
        product.category?.slug === selectedCategory || 
        product.category?.name === selectedCategory
      )
    : products;

  // Состояние загрузки
  if (loading) {
    return (
      <section id="products" className="product-grid-section">
        <div className="product-grid-container">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: '#666' }}>Загрузка товаров...</p>
          </div>
        </div>
      </section>
    );
  }

  // Ошибка загрузки
  if (error) {
    return (
      <section id="products" className="product-grid-section">
        <div className="product-grid-container">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: '#e74c3c' }}>
              ⚠️ Ошибка загрузки товаров: {error}
            </p>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
              Проверьте что backend запущен на http://localhost:5000
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Нет товаров
  if (!products || products.length === 0) {
    return (
      <section id="products" className="product-grid-section">
        <div className="product-grid-container">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: '#666' }}>
              📦 Товары не найдены
            </p>
            <p style={{ fontSize: '14px', color: '#999', marginTop: '10px' }}>
              Добавьте товары через админ-панель или создайте seed данные
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="product-grid-section">
      <div className="product-grid-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="product-grid-title"
        >
          {selectedCategory ? selectedCategory : 'Популярные товары'}
        </motion.h2>
        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p style={{ fontSize: '16px', color: '#666' }}>
              Товары в категории "{selectedCategory}" не найдены
            </p>
          </div>
        )}
      </div>
    </section>
  );
}