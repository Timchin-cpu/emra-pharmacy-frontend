import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, Heart, Settings, LogOut, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { ordersAPI } from '../services/apiService';
import { getTelegramUser, openTelegramLink } from '../utils/telegram';
import './ProfilePage.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, isTelegramUser } = useAuth();
  const { totalFavorites } = useFavorites();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Получаем данные пользователя
  const tgUser = isTelegramUser ? getTelegramUser() : null;
  
  // Используем данные Telegram если доступны, иначе фейковые
  const userData = user || tgUser || {
    firstName: 'Гость',
    lastName: '',
    username: 'guest',
    photoUrl: null,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Загружаем заказы если авторизован
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getMy();
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleContactSupport = () => {
    if (isTelegramUser) {
      // Открыть чат с поддержкой в Telegram
      openTelegramLink('https://t.me/Аптека от А до Я_support_bot');
    } else {
      // Открыть email
      window.location.href = 'mailto:support@Аптека от А до Я-pharmacy.ru';
    }
  };

  return (
    <div className="profile-page">
      <Header />
      <main className="profile-main">
        <div className="profile-container">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar">
              {userData.photoUrl ? (
                <img src={userData.photoUrl} alt={userData.firstName} />
              ) : (
                <div className="profile-avatar-placeholder">
                  <User size={48} />
                </div>
              )}
            </div>
            <div className="profile-info">
              <h1 className="profile-name">
                {userData.firstName} {userData.lastName || ''}
              </h1>
              {userData.username && (
                <p className="profile-username">@{userData.username}</p>
              )}
              {isTelegramUser && (
                <span className="profile-badge">
                  <MessageCircle size={14} />
                  Telegram User
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="profile-stats">
            <div className="profile-stat">
              <Package size={24} />
              <div>
                <span className="profile-stat-value">{orders.length}</span>
                <span className="profile-stat-label">Заказов</span>
              </div>
            </div>
            <div className="profile-stat">
              <Heart size={24} />
              <div>
                <span className="profile-stat-value">{totalFavorites}</span>
                <span className="profile-stat-label">Избранное</span>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          {user && (
            <div className="profile-section">
              <h2 className="profile-section-title">Мои заказы</h2>
              {loading ? (
                <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                  Загрузка заказов...
                </p>
              ) : orders.length > 0 ? (
                <div className="profile-orders">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="profile-order">
                      <div className="profile-order-info">
                        <p className="profile-order-number">Заказ #{order.id.slice(0, 8)}</p>
                        <p className="profile-order-date">
                          {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                      <div className="profile-order-details">
                        <p className="profile-order-price">₸{order.totalAmount}</p>
                        <span className={`profile-order-status profile-order-status-${order.status}`}>
                          {order.status === 'pending' && 'В обработке'}
                          {order.status === 'confirmed' && 'Подтверждён'}
                          {order.status === 'delivering' && 'Доставляется'}
                          {order.status === 'delivered' && 'Доставлен'}
                          {order.status === 'cancelled' && 'Отменён'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  У вас пока нет заказов
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="profile-actions">
            {!user && (
              <div className="profile-login-prompt">
                <p>Войдите, чтобы видеть свои заказы и сохранять избранное</p>
                <button 
                  className="profile-login-button"
                  onClick={() => navigate('/')}
                >
                  {isTelegramUser ? 'Авторизация выполнена' : 'На главную'}
                </button>
              </div>
            )}

            <button className="profile-action-button" onClick={handleContactSupport}>
              <MessageCircle size={20} />
              Связаться с поддержкой
            </button>

            <button className="profile-action-button" onClick={() => navigate('/favorites')}>
              <Heart size={20} />
              Избранное ({totalFavorites})
            </button>

            {user && (
              <button 
                className="profile-action-button profile-action-logout" 
                onClick={handleLogout}
              >
                <LogOut size={20} />
                Выйти
              </button>
            )}
          </div>

          {/* Telegram Info */}
          {isTelegramUser && tgUser && (
            <div className="profile-telegram-info">
              <h3>Telegram данные</h3>
              <div className="profile-telegram-details">
                <p><strong>ID:</strong> {tgUser.id}</p>
                <p><strong>Язык:</strong> {tgUser.languageCode || 'ru'}</p>
                {user && (
                  <p><strong>Баллы:</strong> {user.bonusBalance || 0}</p>
                )}
              </div>
            </div>
          )}

          {/* Debug info (только для разработки) */}
          {process.env.NODE_ENV === 'development' && (
            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              background: '#f5f5f5', 
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              <p><strong>Debug Info:</strong></p>
              <p>Is Telegram: {isTelegramUser ? 'Yes' : 'No'}</p>
              <p>Has Auth: {user ? 'Yes' : 'No'}</p>
              <p>TG User: {tgUser ? JSON.stringify(tgUser, null, 2) : 'null'}</p>
              <p>User: {user ? JSON.stringify(user, null, 2) : 'null'}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}