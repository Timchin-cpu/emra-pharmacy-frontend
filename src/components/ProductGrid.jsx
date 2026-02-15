import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { useFilter } from '../context/FilterContext';
import { useProducts } from '../context/ProductsContext';
import './ProductGrid.css';

export default function ProductGrid() {
  const { selectedCategory, searchQuery } = useFilter();
  const { products, loading, error } = useProducts();

  // Фильтрация по категории
  let filteredProducts = selectedCategory
    ? products.filter((product) =>
        product.category?.slug === selectedCategory ||
        product.category?.name === selectedCategory
      )
    : products;

  // Фильтрация по поисковому запросу
  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filteredProducts = filteredProducts.filter((product) =>
      product.name?.toLowerCase().includes(q) ||
      product.description?.toLowerCase().includes(q) ||
      product.category?.name?.toLowerCase().includes(q) ||
      product.tag?.toLowerCase().includes(q)
    );
  }

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

  if (error) {
    return (
      <section id="products" className="product-grid-section">
        <div className="product-grid-container">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: '#e74c3c' }}>
              ⚠️ Ошибка загрузки товаров: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section id="products" className="product-grid-section">
        <div className="product-grid-container">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: '#666' }}>📦 Товары не найдены</p>
          </div>
        </div>
      </section>
    );
  }

  // Заголовок секции
  const sectionTitle = searchQuery
    ? `Результаты поиска: «${searchQuery}»`
    : selectedCategory
    ? selectedCategory
    : 'Популярные товары';

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
          {sectionTitle}
        </motion.h2>
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '16px', color: '#666' }}>
              {searchQuery
                ? `По запросу «${searchQuery}» ничего не найдено`
                : `Товары в категории «${selectedCategory}» не найдены`}
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
