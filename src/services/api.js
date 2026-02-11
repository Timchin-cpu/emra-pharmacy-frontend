import axios from 'axios';

// API Base URL из переменных окружения
const API_BASE_URL = 'https://api.programsa.ru/api';

// Создаём instance axios с базовыми настройками
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 секунд
});

// Request Interceptor - добавляем токен к каждому запросу
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - обработка ошибок
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Сервер ответил с ошибкой
      const { status, data } = error.response;
      
      if (status === 401) {
        // Unauthorized - удаляем токен
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
      
      return Promise.reject(data || { message: 'Произошла ошибка' });
    } else if (error.request) {
      // Запрос был отправлен, но ответа не получено
      return Promise.reject({ message: 'Сервер не отвечает' });
    } else {
      // Ошибка при настройке запроса
      return Promise.reject({ message: error.message });
    }
  }
);

export default api;
