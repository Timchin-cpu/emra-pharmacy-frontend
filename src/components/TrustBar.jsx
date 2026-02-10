import { motion } from 'framer-motion';
import { Shield, RotateCcw, Award } from 'lucide-react';
import './TrustBar.css';

const trustItems = [
  {
    icon: Shield,
    title: 'Безопасная оплата',
    description: 'Ваши транзакции защищены',
  },
  {
    icon: RotateCcw,
    title: 'Бесплатный возврат',
    description: 'Гарантия возврата денег 30 дней',
  },
  {
    icon: Award,
    title: 'Сертифицированное качество',
    description: 'Все препараты сертифицированы',
  },
];

export default function TrustBar() {
  return (
    <section id="trust" className="trust-bar">
      <div className="trust-bar-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="trust-bar-header"
        >
          <h2 className="trust-bar-title">Почему выбирают нас</h2>
          <p className="trust-bar-subtitle">
            Мы заботимся о вашем здоровье и предлагаем только качественные препараты
          </p>
        </motion.div>
        <div className="trust-bar-grid">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="trust-bar-item"
            >
              <div className="trust-bar-icon">
                <item.icon size={40} strokeWidth={1.5} />
              </div>
              <h3 className="trust-bar-item-title">{item.title}</h3>
              <p className="trust-bar-item-description">{item.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="trust-bar-image"
        >
          <img
            src="https://c.animaapp.com/mlb3gun1em62JQ/img/ai_5.png"
            alt="Trust and safety editorial composition"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
