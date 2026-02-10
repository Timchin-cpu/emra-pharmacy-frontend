import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useCart } from '../context/CartContext';
import './CartPage.css';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shipping = 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-page">
      <Header />
      <main className="cart-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="cart-title">Корзина</h1>
          <p className="cart-count">
            {items.length} {items.length === 1 ? 'товар' : 'товаров'}
          </p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="cart-empty"
          >
            <ShoppingCart size={80} strokeWidth={1} />
            <h2>Ваша корзина пуста</h2>
            <p>Добавьте товары в корзину, чтобы оформить заказ</p>
            <Link to="/">
              <button className="btn-primary">Перейти к покупкам</button>
            </Link>
          </motion.div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="cart-item"
                >
                  <Link to={`/product/${item.id.split('-')[0]}`}>
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                  </Link>
                  <div className="cart-item-details">
                    <Link to={`/product/${item.id.split('-')[0]}`}>
                      <h3 className="cart-item-name">{item.name}</h3>
                    </Link>
                    {item.variant && (
                      <p className="cart-item-variant">{item.variant}</p>
                    )}
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    <div className="cart-item-actions">
                      <div className="cart-quantity-controls">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="cart-quantity-btn"
                        >
                          <Minus size={20} />
                        </button>
                        <span className="cart-quantity-value">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="cart-quantity-btn"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="cart-remove-btn"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="cart-summary"
            >
              <div className="cart-summary-card">
                <h2 className="cart-summary-title">Итого</h2>
                <div className="cart-summary-details">
                  <div className="cart-summary-row">
                    <span>Подытог</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Доставка</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Налог</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="cart-summary-separator"></div>
                  <div className="cart-summary-total">
                    <span>Всего</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="btn-checkout">Оформить заказ</button>
                <Link to="/">
                  <button className="btn-continue">Продолжить покупки</button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
