import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import './MobileBottomNav.css';

export default function MobileBottomNav() {
  const location = useLocation();
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();

  const navItems = [
    {
      path: '/',
      icon: Home,
      label: 'Главная',
    },
    {
      path: '/favorites',
      icon: Heart,
      label: 'Избранное',
      badge: totalFavorites,
    },
    {
      path: '/cart',
      icon: ShoppingCart,
      label: 'Корзина',
      badge: totalItems,
    },
    {
      path: '/profile',
      icon: User,
      label: 'Профиль',
    },
  ];

  return (
    <nav className="mobile-bottom-nav">
      <div className="mobile-bottom-nav-content">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="mobile-bottom-nav-item"
            >
              <div className="mobile-bottom-nav-icon-wrapper">
                <Icon
                  size={24}
                  className={`mobile-bottom-nav-icon ${isActive ? 'active' : ''}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="mobile-bottom-nav-badge">{item.badge}</span>
                )}
              </div>
              <span className={`mobile-bottom-nav-label ${isActive ? 'active' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
