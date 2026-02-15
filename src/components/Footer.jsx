import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="footer-brand">Аптека от А до Я</h3>
            <p className="footer-description">
              Качественные лекарства и витамины для вашего здоровья и благополучия.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Twitter">
                <Twitter size={24} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="footer-heading">Каталог</h4>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">Все товары</a></li>
              <li><a href="#" className="footer-link">Обезболивающие</a></li>
              <li><a href="#" className="footer-link">Витамины</a></li>
              <li><a href="#" className="footer-link">Пищеварение</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="footer-heading">Поддержка</h4>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">О нас</a></li>
              <li><a href="#" className="footer-link">Контакты</a></li>
              <li><a href="#" className="footer-link">Доставка</a></li>
              <li><a href="#" className="footer-link">Возврат товара</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="footer-heading">Рассылка</h4>
            <p className="footer-newsletter-text">
              Подпишитесь на специальные предложения
            </p>
            <div className="footer-newsletter">
              <input
                type="email"
                placeholder="Ваш email"
                className="footer-input"
              />
              <button className="footer-button">Подписаться</button>
            </div>
          </motion.div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2024 Аптека от А до Я. All rights reserved.
            </p>
            <div className="footer-links">
              <a href="#" className="footer-bottom-link">Политика конфиденциальности</a>
              <a href="#" className="footer-bottom-link">Условия использования</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
