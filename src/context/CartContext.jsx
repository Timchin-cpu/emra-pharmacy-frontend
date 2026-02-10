import React, { createContext, useContext, useState, useEffect } from 'react';
import { ordersAPI } from '../services/apiService';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Загрузка корзины из localStorage при монтировании
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Error loading cart:', err);
      }
    }
  }, []);

  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.variant === item.variant);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.variant === item.variant
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  // Оформление заказа через API
  const checkout = async (orderData) => {
    try {
      setLoading(true);
      
      // Подготовка данных заказа
      const orderPayload = {
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          variant: item.variant || null,
        })),
        deliveryAddress: orderData.deliveryAddress,
        deliveryType: orderData.deliveryType || 'delivery',
        customerPhone: orderData.customerPhone,
        customerName: orderData.customerName,
        customerNote: orderData.customerNote || null,
        promoCode: orderData.promoCode || null,
      };

      const response = await ordersAPI.create(orderPayload);
      
      if (response.success) {
        clearCart(); // Очищаем корзину после успешного заказа
        return { success: true, order: response.data };
      } else {
        throw new Error(response.message || 'Ошибка при оформлении заказа');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      return { 
        success: false, 
        error: error.message || 'Не удалось оформить заказ' 
      };
    } finally {
      setLoading(false);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        checkout,
        totalItems,
        subtotal,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
