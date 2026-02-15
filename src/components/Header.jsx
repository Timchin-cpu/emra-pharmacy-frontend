import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingCart, Heart, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useFilter } from '../context/FilterContext';
import MobileMenu from './MobileMenu';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const { searchQuery, setSearchQuery } = useFilter();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Фокус на input при открытии поиска
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Закрыть поиск по Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') closeSearch();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const openSearch = () => setIsSearchOpen(true);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Если не на главной — перейти туда чтобы показать результаты
    if (location.pathname !== '/') {
      navigate('/');
    }
    // Скроллим к товарам
    if (e.target.value) {
      setTimeout(() => {
        const el = document.getElementById('products');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') navigate('/');
    setTimeout(() => {
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const isHomePage = location.pathname === '/';
  const isFavoritesPage = location.pathname === '/favorites';
  const isCartPage = location.pathname === '/cart';
  const isProfilePage = location.pathname === '/profile';

  return (
    <>
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-content">

            {/* Мобильная кнопка меню */}
            <button
              className="header-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={32} />
            </button>

            {/* Лого */}
            <Link to="/" className="header-logo">
              <span>EMRA</span>
            </Link>

            {/* Десктопная навигация */}
            <nav className="header-nav">
              <Link to="/" className={`header-nav-link ${isHomePage ? 'active' : ''}`}>Каталог</Link>
              <Link to="/favorites" className={`header-nav-link ${isFavoritesPage ? 'active' : ''}`}>Избранное</Link>
              <Link to="/cart" className={`header-nav-link ${isCartPage ? 'active' : ''}`}>Корзина</Link>
              <Link to="/profile" className={`header-nav-link ${isProfilePage ? 'active' : ''}`}>Профиль</Link>
            </nav>

            {/* Поиск + иконки */}
            <div className="header-actions">

              {/* Строка поиска (десктоп) */}
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="header-search-form">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Поиск товаров..."
                    className="header-search-input"
                  />
                  <button type="button" className="header-icon-btn" onClick={closeSearch} aria-label="Закрыть поиск">
                    <X size={24} />
                  </button>
                </form>
              ) : (
                <button className="header-icon-btn" onClick={openSearch} aria-label="Поиск">
                  <Search size={32} />
                </button>
              )}

              <Link to="/favorites">
                <button className="header-icon-btn" aria-label={`Избранное ${totalFavorites}`}>
                  <Heart size={32} />
                  {totalFavorites > 0 && <span className="header-badge">{totalFavorites}</span>}
                </button>
              </Link>

              <Link to="/cart">
                <button className="header-icon-btn" aria-label={`Корзина ${totalItems}`}>
                  <ShoppingCart size={32} />
                  {totalItems > 0 && <span className="header-badge">{totalItems}</span>}
                </button>
              </Link>
            </div>
          </div>

          {/* Мобильная строка поиска (под хедером) */}
          {isSearchOpen && (
            <form onSubmit={handleSearchSubmit} className="header-search-mobile">
              <Search size={18} className="header-search-mobile-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Поиск товаров..."
                className="header-search-mobile-input"
                autoFocus
              />
              {searchQuery && (
                <button type="button" onClick={closeSearch} className="header-search-mobile-clear">
                  <X size={18} />
                </button>
              )}
            </form>
          )}
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
