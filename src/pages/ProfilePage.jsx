import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import './ProfilePage.css';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Иван Петров',
    email: 'ivan.petrov@example.com',
    phone: '+7 (999) 123-45-67',
    address: 'г. Москва, ул. Ленина, д. 10, кв. 25',
    birthdate: '15.03.1990',
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const orderHistory = [
    {
      id: '12345',
      date: '15.12.2024',
      total: 45.99,
      status: 'Доставлен',
      items: 3,
    },
    {
      id: '12344',
      date: '10.12.2024',
      total: 28.50,
      status: 'Доставлен',
      items: 2,
    },
    {
      id: '12343',
      date: '05.12.2024',
      total: 67.20,
      status: 'В пути',
      items: 5,
    },
  ];

  return (
    <div className="profile-page">
      <Header />
      <main className="profile-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="profile-title">Профиль</h1>
          <p className="profile-subtitle">Управляйте своими данными и заказами</p>
        </motion.div>

        <div className="profile-layout">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="profile-info-section"
          >
            <div className="profile-card">
              <div className="profile-card-header">
                <h2>Личные данные</h2>
                {!isEditing ? (
                  <button onClick={handleEdit} className="btn-edit">
                    <Edit2 size={16} />
                    Редактировать
                  </button>
                ) : (
                  <div className="profile-edit-actions">
                    <button onClick={handleSave} className="btn-save">
                      <Save size={16} />
                      Сохранить
                    </button>
                    <button onClick={handleCancel} className="btn-cancel">
                      <X size={16} />
                      Отмена
                    </button>
                  </div>
                )}
              </div>

              <div className="profile-fields">
                <div className="profile-field">
                  <div className="profile-field-icon">
                    <User size={24} />
                  </div>
                  <div className="profile-field-content">
                    <label>Имя</label>
                    {isEditing ? (
                      <input
                        value={editedProfile.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="profile-input"
                      />
                    ) : (
                      <p>{profile.name}</p>
                    )}
                  </div>
                </div>

                <div className="profile-separator"></div>

                <div className="profile-field">
                  <div className="profile-field-icon">
                    <Mail size={24} />
                  </div>
                  <div className="profile-field-content">
                    <label>Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="profile-input"
                      />
                    ) : (
                      <p>{profile.email}</p>
                    )}
                  </div>
                </div>

                <div className="profile-separator"></div>

                <div className="profile-field">
                  <div className="profile-field-icon">
                    <Phone size={24} />
                  </div>
                  <div className="profile-field-content">
                    <label>Телефон</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="profile-input"
                      />
                    ) : (
                      <p>{profile.phone}</p>
                    )}
                  </div>
                </div>

                <div className="profile-separator"></div>

                <div className="profile-field">
                  <div className="profile-field-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="profile-field-content">
                    <label>Адрес доставки</label>
                    {isEditing ? (
                      <input
                        value={editedProfile.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        className="profile-input"
                      />
                    ) : (
                      <p>{profile.address}</p>
                    )}
                  </div>
                </div>

                <div className="profile-separator"></div>

                <div className="profile-field">
                  <div className="profile-field-icon">
                    <Calendar size={24} />
                  </div>
                  <div className="profile-field-content">
                    <label>Дата рождения</label>
                    {isEditing ? (
                      <input
                        value={editedProfile.birthdate}
                        onChange={(e) => handleChange('birthdate', e.target.value)}
                        className="profile-input"
                      />
                    ) : (
                      <p>{profile.birthdate}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="profile-stats-section"
          >
            <div className="profile-stats-card">
              <h3>Статистика</h3>
              <div className="profile-stats">
                <div className="profile-stat">
                  <span>Всего заказов</span>
                  <span className="profile-stat-value primary">12</span>
                </div>
                <div className="profile-separator"></div>
                <div className="profile-stat">
                  <span>Потрачено</span>
                  <span className="profile-stat-value">$456.80</span>
                </div>
                <div className="profile-separator"></div>
                <div className="profile-stat">
                  <span>Бонусы</span>
                  <span className="profile-stat-value success">250</span>
                </div>
              </div>
            </div>

            <div className="profile-premium-card">
              <h3>Премиум подписка</h3>
              <p>Получите скидку 15% на все товары</p>
              <button className="btn-premium">Оформить</button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="profile-orders-section"
        >
          <h2>История заказов</h2>
          <div className="profile-orders">
            {orderHistory.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="profile-order-card"
              >
                <div className="profile-order-info">
                  <div className="profile-order-header">
                    <h3>Заказ #{order.id}</h3>
                    <span className={`profile-order-status ${order.status === 'Доставлен' ? 'delivered' : 'in-transit'}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="profile-order-meta">
                    <span>{order.date}</span>
                    <span>•</span>
                    <span>{order.items} товаров</span>
                  </div>
                </div>
                <div className="profile-order-actions">
                  <p className="profile-order-total">${order.total.toFixed(2)}</p>
                  <button className="btn-order-details">Подробнее</button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
