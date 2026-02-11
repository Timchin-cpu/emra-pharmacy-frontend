// Telegram WebApp API utilities

/**
 * Инициализация Telegram WebApp
 */
export const initTelegramWebApp = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    
    // Развернуть приложение на весь экран
    tg.expand();
    
    // Включить закрывающее подтверждение
    tg.enableClosingConfirmation();
    
    // Установить цвет фона
    tg.setHeaderColor('#1a1a2e');
    tg.setBackgroundColor('#0f0f1e');
    
    return tg;
  }
  
  return null;
};

/**
 * Получить данные пользователя Telegram
 */
export const getTelegramUser = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    const user = tg.initDataUnsafe?.user;
    
    if (user) {
      return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        photoUrl: user.photo_url,
        languageCode: user.language_code,
      };
    }
  }
  
  return null;
};

/**
 * Получить initData для авторизации на backend
 */
export const getTelegramInitData = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    return window.Telegram.WebApp.initData;
  }
  
  return null;
};

/**
 * Проверить запущено ли приложение в Telegram
 */
export const isTelegramWebApp = () => {
  return typeof window !== 'undefined' && !!window.Telegram?.WebApp;
};

/**
 * Показать главную кнопку Telegram
 */
export const showMainButton = (text, onClick) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.MainButton.text = text;
    tg.MainButton.show();
    tg.MainButton.onClick(onClick);
    return () => {
      tg.MainButton.offClick(onClick);
      tg.MainButton.hide();
    };
  }
  return () => {};
};

/**
 * Скрыть главную кнопку
 */
export const hideMainButton = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.MainButton.hide();
  }
};

/**
 * Показать кнопку "Назад"
 */
export const showBackButton = (onClick) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.BackButton.show();
    tg.BackButton.onClick(onClick);
    return () => {
      tg.BackButton.offClick(onClick);
      tg.BackButton.hide();
    };
  }
  return () => {};
};

/**
 * Показать всплывающее уведомление
 */
export const showAlert = (message) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.showAlert(message);
  } else {
    alert(message);
  }
};

/**
 * Показать подтверждение
 */
export const showConfirm = (message, callback) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.showConfirm(message, callback);
  } else {
    const result = confirm(message);
    callback(result);
  }
};

/**
 * Открыть ссылку
 */
export const openLink = (url) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.openLink(url);
  } else {
    window.open(url, '_blank');
  }
};

/**
 * Открыть Telegram ссылку
 */
export const openTelegramLink = (url) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.openTelegramLink(url);
  } else {
    window.open(url, '_blank');
  }
};

/**
 * Закрыть Mini App
 */
export const close = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.close();
  }
};

/**
 * Получить версию Telegram
 */
export const getTelegramVersion = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    return window.Telegram.WebApp.version;
  }
  return null;
};

/**
 * Вибрация (haptic feedback)
 */
export const hapticFeedback = (type = 'medium') => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.HapticFeedback) {
    const types = {
      light: 'impact',
      medium: 'impact',
      heavy: 'impact',
      success: 'notification',
      warning: 'notification',
      error: 'notification',
    };
    
    const style = types[type] || 'impact';
    
    if (style === 'impact') {
      window.Telegram.WebApp.HapticFeedback.impactOccurred(type);
    } else {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred(type);
    }
  }
};

export default {
  init: initTelegramWebApp,
  getUser: getTelegramUser,
  getInitData: getTelegramInitData,
  isTelegramWebApp,
  showMainButton,
  hideMainButton,
  showBackButton,
  showAlert,
  showConfirm,
  openLink,
  openTelegramLink,
  close,
  getVersion: getTelegramVersion,
  haptic: hapticFeedback,
};