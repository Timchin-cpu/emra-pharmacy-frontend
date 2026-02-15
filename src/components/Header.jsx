import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, Heart, X } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useFilter } from '../context/FilterContext';
import MobileMenu from './MobileMenu';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  const { totalFavorites } = useFavorites();
  const { searchQuery, setSearchQuery } = useFilter();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') closeSearch(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== '/') navigate('/');
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

  const isHomePage      = location.pathname === '/';
  const isFavoritesPage = location.pathname === '/favorites';
  const isProfilePage   = location.pathname === '/profile';

  return (
    <>
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-content">

            <button className="header-menu-btn" onClick={() => setIsMobileMenuOpen(true)} aria-label="Меню">
              <Menu size={32} />
            </button>

            <Link to="/" className="header-logo"><span>Аптека от А до Я</span></Link>

            <nav className="header-nav">
              <Link to="/"         className={`header-nav-link ${isHomePage      ? 'active' : ''}`}>Каталог</Link>
              <Link to="/favorites" className={`header-nav-link ${isFavoritesPage ? 'active' : ''}`}>Избранное</Link>
              <Link to="/profile"  className={`header-nav-link ${isProfilePage   ? 'active' : ''}`}>Профиль</Link>
            </nav>

            <div className="header-actions">
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
                  <button type="button" className="header-icon-btn" onClick={closeSearch}>
                    <X size={24} />
                  </button>
                </form>
              ) : (
                <button className="header-icon-btn" onClick={() => setIsSearchOpen(true)} aria-label="Поиск">
                  <Search size={32} />
                </button>
              )}

              <Link to="/favorites">
                <button className="header-icon-btn" aria-label="Избранное">
                  <Heart size={32} />
                  {totalFavorites > 0 && <span className="header-badge">{totalFavorites}</span>}
                </button>
              </Link>
            </div>
          </div>

          {/* Мобильная строка поиска */}
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