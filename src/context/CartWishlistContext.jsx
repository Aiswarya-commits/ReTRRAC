import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

const CartWishlistContext = createContext();

export function CartWishlistProvider({ children }) {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('retrrac_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('retrrac_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Drawers open/close states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Discount code state
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    try {
      localStorage.setItem('retrrac_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not save cart to localStorage", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('retrrac_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Could not save wishlist to localStorage", e);
    }
  }, [wishlist]);

  // Cart operations
  const addToCart = (course, cohort = null, openDrawer = true) => {
    if (!course) return;

    const chosenCohort = cohort || (course.cohorts && course.cohorts[0] ? course.cohorts[0].date : (course.cohort || 'July 01, 2026 Cohort'));

    const existingIndex = cart.findIndex(item => item.courseId === course.id);
    if (existingIndex > -1) {
      addToast(`"${course.title}" is already in your basket.`, 'info');
      if (openDrawer) setIsCartOpen(true);
      return;
    }

    const newItem = {
      id: `cart-${course.id}-${Date.now()}`,
      courseId: course.id,
      title: course.title,
      code: course.code,
      priceGBP: course.priceGBP,
      priceINR: course.priceINR,
      cohort: chosenCohort,
      image: course.image,
      duration: course.duration,
      cpdPoints: course.cpdPoints,
      slug: course.slug || course.id
    };

    setCart(prev => [newItem, ...prev]);
    addToast(`"${course.title}" added to your basket!`, 'success');
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (courseId) => {
    const removedItem = cart.find(item => item.courseId === courseId || item.id === courseId);
    setCart(prev => prev.filter(item => item.courseId !== courseId && item.id !== courseId));
    if (removedItem) {
      addToast(`Removed "${removedItem.title}" from basket.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (courseId) => {
    return cart.some(item => item.courseId === courseId);
  };

  // Wishlist operations
  const toggleWishlist = (course) => {
    if (!course) return;
    const exists = wishlist.some(item => item.courseId === course.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.courseId !== course.id));
      addToast(`Removed "${course.title}" from wishlist.`, 'info');
    } else {
      const item = {
        courseId: course.id,
        title: course.title,
        code: course.code,
        priceGBP: course.priceGBP,
        priceINR: course.priceINR,
        image: course.image,
        duration: course.duration,
        cpdPoints: course.cpdPoints,
        slug: course.slug || course.id
      };
      setWishlist(prev => [item, ...prev]);
      addToast(`"${course.title}" saved to your wishlist!`, 'success');
    }
  };

  const removeFromWishlist = (courseId) => {
    setWishlist(prev => prev.filter(item => item.courseId !== courseId));
  };

  const isInWishlist = (courseId) => {
    return wishlist.some(item => item.courseId === courseId);
  };

  const moveToCart = (course) => {
    removeFromWishlist(course.courseId || course.id);
    addToCart(course, null, true);
  };

  // Discount logic
  // Voucher codes are checked by the server (the server also decides the real price).
  const applyPromoCode = async (code) => {
    const normalized = (code || '').trim().toUpperCase();
    if (!normalized || cart.length === 0) return false;
    try {
      const { quote } = await api('/api/paypal/quote', {
        method: 'POST',
        body: { items: cart.map((i) => ({ courseId: i.courseId, cohort: i.cohort })), currency: 'GBP', promoCode: normalized }
      });
      if (quote?.promoCode) {
        setDiscountCode(quote.promoCode);
        setDiscountPercent(quote.discountPercent);
        addToast(`Voucher ${quote.promoCode} applied (${quote.discountPercent}% off).`, 'success');
        return true;
      }
    } catch {
      /* invalid code or server unreachable */
    }
    addToast('Invalid promotional voucher code.', 'error');
    return false;
  };
  const removeDiscount = () => {
    setDiscountCode('');
    setDiscountPercent(0);
  };

  // Calculated totals
  const subtotalGBP = cart.reduce((sum, item) => sum + (Number(item.priceGBP) || 0), 0);
  const subtotalINR = cart.reduce((sum, item) => sum + (Number(item.priceINR) || 0), 0);

  const discountAmountGBP = Math.round((subtotalGBP * discountPercent) / 100);
  const discountAmountINR = Math.round((subtotalINR * discountPercent) / 100);

  const totalGBP = Math.max(0, subtotalGBP - discountAmountGBP);
  const totalINR = Math.max(0, subtotalINR - discountAmountINR);

  return (
    <CartWishlistContext.Provider value={{
      cart,
      wishlist,
      cartCount: cart.length,
      wishlistCount: wishlist.length,
      subtotalGBP,
      subtotalINR,
      discountCode,
      discountPercent,
      discountAmountGBP,
      discountAmountINR,
      totalGBP,
      totalINR,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist,
      moveToCart,
      applyPromoCode,
      removeDiscount,
      isCartOpen,
      setIsCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      isWishlistOpen,
      setIsWishlistOpen,
      openWishlist: () => setIsWishlistOpen(true),
      closeWishlist: () => setIsWishlistOpen(false),
      toasts,
      removeToast
    }}>
      {children}

      {/* Floating Global Toasts */}
      <div className="fixed bottom-20 left-6 z-50 flex flex-col space-y-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-xl text-xs font-bold transition-all transform animate-fade-in ${toast.type === 'success'
                ? 'bg-slate-950 text-white border border-emerald-500/40 shadow-emerald-500/10'
                : toast.type === 'error'
                  ? 'bg-red-950 text-white border border-red-500/40'
                  : 'bg-indigo-950 text-white border border-indigo-500/40'
              }`}
          >
            <span className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-emerald-400' : toast.type === 'error' ? 'bg-red-400' : 'bg-cyan-400'
              }`} />
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white ml-2 text-sm leading-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </CartWishlistContext.Provider>
  );
}

export function useCartWishlist() {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
}
