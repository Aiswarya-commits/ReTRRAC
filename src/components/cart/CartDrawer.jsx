import React, { useState } from 'react';
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Award,
  CreditCard,
  Lock,
  Calendar
} from 'lucide-react';
import { useCartWishlist } from '../../context/CartWishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';

export default function CartDrawer({ onProceedToCheckout }) {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    clearCart,
    subtotalGBP,
    subtotalINR,
    discountCode,
    discountPercent,
    discountAmountGBP,
    discountAmountINR,
    totalGBP,
    totalINR,
    applyPromoCode,
    removeDiscount
  } = useCartWishlist();

  const { currency, formatAmount } = useCurrency();
  const { currentUser, openAuthModal } = useAuth();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const currentSubtotal = currency === 'INR' ? subtotalINR : subtotalGBP;
  const currentDiscount = currency === 'INR' ? discountAmountINR : discountAmountGBP;
  const currentTotal = currency === 'INR' ? totalINR : totalGBP;

  const handleApplyPromo = async (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = await applyPromoCode(promoInput);
    if (ok) {
      setPromoInput('');
      setPromoError('');
    } else {
      setPromoError('That voucher code is not valid.');
    }
  };

  const handleCheckoutClick = () => {
    if (!currentUser) {
      openAuthModal('signin', () => {
        closeCart();
        if (onProceedToCheckout) {
          onProceedToCheckout(cart);
        }
      }, 'Please sign in or create an account to proceed with basket checkout.');
      return;
    }
    closeCart();
    if (onProceedToCheckout) {
      onProceedToCheckout(cart);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">

          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold">Your Academy Basket</h2>
                <p className="text-xs text-slate-300">
                  {cart.length} {cart.length === 1 ? 'programme' : 'programmes'} selected
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-800">Your basket is empty</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Explore our CPD UK Accredited certifications and add courses to your cart to begin enrollment.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-indigo-600 transition-colors"
                >
                  Browse Academy Courses
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                  <span>Selected Programs</span>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 transition-all space-y-3 relative group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                              {item.code}
                            </span>
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              {item.duration}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                            {item.title}
                          </h4>
                          <div className="flex items-center text-[11px] text-slate-500 mt-1">
                            <Calendar className="w-3 h-3 mr-1 text-slate-400" />
                            <span>{item.cohort}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.courseId)}
                          className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                        <span className="text-slate-500 flex items-center">
                          <Award className="w-3.5 h-3.5 text-purple-600 mr-1" />
                          <span>{item.cpdPoints} CPD Points</span>
                        </span>
                        <span className="font-black text-slate-900 text-sm text-gradient">
                          {formatAmount(item.priceGBP, item.priceINR)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Voucher Code Form */}
                <div className="pt-2">
                  {discountPercent > 0 ? (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800 font-semibold">
                      <div className="flex items-center space-x-1.5">
                        <Tag className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Code <strong className="font-mono">{discountCode}</strong> applied ({discountPercent}% off)</span>
                      </div>
                      <button
                        onClick={removeDiscount}
                        className="text-emerald-700 hover:text-red-600 text-xs underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="space-y-1">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Promo code (e.g. UKCPD10)"
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase font-mono"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-[11px] text-red-600 pl-1">{promoError}</p>
                      )}
                    </form>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Box */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-900">
                    {formatAmount(subtotalGBP, subtotalINR)}
                  </span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Voucher Discount ({discountPercent}%):</span>
                    <span>-{formatAmount(discountAmountGBP, discountAmountINR)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>UK VAT & CPD Assessment:</span>
                  <span className="text-emerald-600 font-bold">Included</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">Total Investment:</span>
                  <span className="text-2xl font-black text-slate-900 text-gradient">
                    {formatAmount(totalGBP, totalINR)}
                  </span>
                </div>
              </div>

              {/* PayPal Primary Checkout Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-4 px-6 rounded-2xl bg-[#FFC439] hover:bg-[#F4B400] text-slate-900 font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 border border-amber-400 group"
              >
                {currency === 'INR' ? (
                  <span className="font-black text-[#6933D3]">UPI / Cards / Net Banking</span>
                ) : (
                  <span className="italic font-black text-blue-900 text-base tracking-tighter">Pay<span className="text-blue-600">Pal</span></span>
                )}
                <span className="text-slate-800 font-bold">Proceed to Payment</span>                <ArrowRight className="w-4 h-4 text-blue-900 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 text-center">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>256-Bit SSL Encrypted • Official {currency === 'INR' ? 'Cashfree' : 'PayPal'} Gateway</span>              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
