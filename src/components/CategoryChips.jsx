import { motion } from 'framer-motion';
import { useFilter } from '../context/FilterContext';
import { useProducts } from '../context/ProductsContext';
import './CategoryChips.css';

export default function CategoryChips() {
  const { selectedCategory, setSelectedCategory } = useFilter();
  const { categories, loading } = useProducts();

  const handleCategoryClick = (categorySlug) => {
    if (categorySlug === null) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categorySlug);
    }
  };

  // Добавляем "Все товары" в начало
  const allCategories = [
    { id: 'all', name: 'Все товары', slug: null },
    ...categories,
  ];

  if (loading) {
    return (
      <section className="category-chips">
        <div className="category-chips-container">
          <div className="category-chips-scroll">
            <div style={{ padding: '10px 20px', color: '#666' }}>
              Загрузка категорий...
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="category-chips">
      <div className="category-chips-container">
        <div className="category-chips-scroll">
          {allCategories.map((category, index) => {
            const isSelected =
              (category.slug === null && !selectedCategory) ||
              category.slug === selectedCategory;

            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => handleCategoryClick(category.slug)}
                className={`category-chip ${isSelected ? 'category-chip-active' : ''}`}
              >
                {category.name}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}