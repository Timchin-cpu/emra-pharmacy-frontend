import React, { createContext, useContext, useState, useEffect } from 'react';
import { productsAPI, categoriesAPI } from '../services/apiService';

const ProductsContext = createContext(undefined);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка товаров и категорий при монтировании
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productsAPI.getAll(params);
      
      if (response.success) {
        setProducts(response.data.products || []);
      }
    } catch (err) {
      console.error('Error loading products:', err);
      setError(err.message || 'Не удалось загрузить товары');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      
      if (response.success) {
        setCategories(response.data || []);
      }
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await productsAPI.getById(id);
      
      if (response.success) {
        return response.data;
      }
      return null;
    } catch (err) {
      console.error('Error loading product:', err);
      return null;
    }
  };

  const searchProducts = async (query) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productsAPI.search(query);
      
      if (response.success) {
        return response.data.products || [];
      }
      return [];
    } catch (err) {
      console.error('Error searching products:', err);
      setError(err.message || 'Ошибка поиска');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedProducts = async () => {
    try {
      const response = await productsAPI.getFeatured();
      
      if (response.success) {
        return response.data || [];
      }
      return [];
    } catch (err) {
      console.error('Error loading featured products:', err);
      return [];
    }
  };

  const value = {
    products,
    categories,
    loading,
    error,
    loadProducts,
    getProductById,
    searchProducts,
    getFeaturedProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }
  return context;
}
