import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './MobileMenu.css';

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu-overlay"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="mobile-menu"
          >
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Menu</span>
              <button
                className="mobile-menu-close"
                onClick={onClose}
                aria-label="Close menu"
              >
                <X size={32} />
              </button>
            </div>
            <nav className="mobile-menu-nav">
              <Link to="/" onClick={onClose} className="mobile-menu-link">
                Магазин
              </Link>
              <Link to="/favorites" onClick={onClose} className="mobile-menu-link">
                Избранное
              </Link>
              <Link to="/cart" onClick={onClose} className="mobile-menu-link">
                Корзина
              </Link>
              <Link to="/profile" onClick={onClose} className="mobile-menu-link">
                Профиль
              </Link>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
