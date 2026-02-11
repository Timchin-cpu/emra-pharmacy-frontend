import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initTelegramWebApp } from './utils/telegram';

// Инициализировать Telegram WebApp
const tg = initTelegramWebApp();

if (tg) {
  console.log('✅ Telegram WebApp initialized');
  console.log('User:', tg.initDataUnsafe?.user);
} else {
  console.log('⚠️ Not running in Telegram');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);