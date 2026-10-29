import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  // Default to GBP for UK Institution, with instant toggle to INR for India
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('retrrac_currency') || 'GBP';
  });

  useEffect(() => {
    localStorage.setItem('retrrac_currency', currency);
  }, [currency]);

  // Conversion rate reference (approx 1 GBP = ~105 INR)
  const formatAmount = (gbpAmount, inrAmount) => {
    if (currency === 'INR') {
      const val = inrAmount !== undefined ? inrAmount : Math.round(gbpAmount * 105);
      return `₹${val.toLocaleString('en-IN')}`;
    }
    return `£${gbpAmount.toLocaleString('en-GB')}`;
  };

  const currencySymbol = currency === 'INR' ? '₹' : '£';

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatAmount, currencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
