import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import MobileMenu from './MobileMenu';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const isFavoritesPage = location.pathname === '/favorites';
  const isCartPage = location.pathname === '/cart';
  const isProfilePage = location.pathname === '/profile';

  return (
    <>
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-content">
            <button
              className="header-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={32} />
            </button>

            <Link to="/" className="header-logo">
              <span>EMRA</span>
            </Link>

            <nav className="header-nav">
              <Link to="/" className={`header-nav-link ${isHomePage ? 'active' : ''}`}>
                Каталог
              </Link>
              <Link to="/favorites" className={`header-nav-link ${isFavoritesPage ? 'active' : ''}`}>
                Избранное
              </Link>
              <Link to="/cart" className={`header-nav-link ${isCartPage ? 'active' : ''}`}>
                Корзина
              </Link>
              <Link to="/profile" className={`header-nav-link ${isProfilePage ? 'active' : ''}`}>
                Профиль
              </Link>
            </nav>

            <div className="header-actions">
              <button className="header-icon-btn" aria-label="Search">
                <Search size={32} />
              </button>
              <Link to="/favorites">
                <button className="header-icon-btn" aria-label={`Favorites with ${totalFavorites} items`}>
                  <Heart size={32} />
                  {totalFavorites > 0 && (
                    <span className="header-badge">{totalFavorites}</span>
                  )}
                </button>
              </Link>
              <Link to="/cart">
                <button className="header-icon-btn" aria-label={`Shopping cart with ${totalItems} items`}>
                  <ShoppingCart size={32} />
                  {totalItems > 0 && (
                    <span className="header-badge">{totalItems}</span>
                  )}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
