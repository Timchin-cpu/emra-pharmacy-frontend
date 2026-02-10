import api from './api';

// ============================================
// AUTH API
// ============================================

export const authAPI = {
  // Авторизация через Telegram
  loginWithTelegram: (initData) => 
    api.post('/auth/telegram', { initData }),
  
  // Получить текущего пользователя
  getMe: () => 
    api.get('/auth/me'),
  
  // Проверить токен
  verifyToken: (token) => 
    api.post('/auth/verify', { token }),
};

// ============================================
// PRODUCTS API
// ============================================

export const productsAPI = {
  // Получить все товары
  getAll: (params = {}) => 
    api.get('/products', { params }),
  
  // Получить товар по ID
  getById: (id) => 
    api.get(`/products/${id}`),
  
  // Получить популярные товары
  getFeatured: () => 
    api.get('/products/featured'),
  
  // Поиск товаров
  search: (query) => 
    api.get('/products/search', { params: { q: query } }),
};

// ============================================
// CATEGORIES API
// ============================================

export const categoriesAPI = {
  // Получить все категории
  getAll: () => 
    api.get('/categories'),
  
  // Получить категорию по ID
  getById: (id) => 
    api.get(`/categories/${id}`),
};

// ============================================
// ORDERS API
// ============================================

export const ordersAPI = {
  // Создать заказ
  create: (orderData) => 
    api.post('/orders', orderData),
  
  // Получить мои заказы
  getMy: () => 
    api.get('/orders/my'),
  
  // Получить заказ по ID
  getById: (id) => 
    api.get(`/orders/${id}`),
  
  // Отменить заказ
  cancel: (id) => 
    api.patch(`/orders/${id}/cancel`),
};

// ============================================
// FAVORITES API
// ============================================

export const favoritesAPI = {
  // Получить избранное
  get: () => 
    api.get('/users/favorites'),
  
  // Добавить в избранное
  add: (productId) => 
    api.post(`/users/favorites/${productId}`),
  
  // Удалить из избранного
  remove: (productId) => 
    api.delete(`/users/favorites/${productId}`),
};

// ============================================
// USER API
// ============================================

export const userAPI = {
  // Обновить профиль
  updateProfile: (data) => 
    api.put('/users/profile', data),
  
  // Сгенерировать реферальный код
  generateReferralCode: () => 
    api.post('/users/referral/generate'),
  
  // Получить статистику рефералов
  getReferralStats: () => 
    api.get('/users/referral/stats'),
};

// ============================================
// PROMO CODES API
// ============================================

export const promoCodesAPI = {
  // Проверить промокод
  validate: (code) => 
    api.post('/promo-codes/validate', { code }),
  
  // Применить промокод
  apply: (code, orderData) => 
    api.post('/promo-codes/apply', { code, ...orderData }),
};

// ============================================
// BANNERS API
// ============================================

export const bannersAPI = {
  // Получить активные баннеры
  getActive: () => 
    api.get('/banners'),
  
  // Отследить клик по баннеру
  trackClick: (id) => 
    api.post(`/banners/${id}/click`),
};

// ============================================
// SETTINGS API
// ============================================

export const settingsAPI = {
  // Получить публичные настройки
  getPublic: () => 
    api.get('/settings'),
};

// ============================================
// ANALYTICS API
// ============================================

export const analyticsAPI = {
  // Получить публичную статистику
  getPublicStats: () => 
    api.get('/analytics/stats'),
};

// Экспорт по умолчанию
export default {
  auth: authAPI,
  products: productsAPI,
  categories: categoriesAPI,
  orders: ordersAPI,
  favorites: favoritesAPI,
  user: userAPI,
  promoCodes: promoCodesAPI,
  banners: bannersAPI,
  settings: settingsAPI,
  analytics: analyticsAPI,
};
