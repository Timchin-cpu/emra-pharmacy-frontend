import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext(undefined);

export function FilterProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <FilterContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within FilterProvider');
  }
  return context;
}
