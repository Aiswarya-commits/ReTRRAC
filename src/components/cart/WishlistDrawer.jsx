import React from 'react';
import { 
  X, 
  Heart, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Award, 
  Clock 
} from 'lucide-react';
import { useCartWishlist } from '../../context/CartWishlistContext';
import { useCurrency } from '../../context/CurrencyContext';

export default function WishlistDrawer() {
  const { 
    wishlist, 
    isWishlistOpen, 
    closeWishlist, 
    removeFromWishlist, 
    moveToCart 
  } = useCartWishlist();

  const { formatAmount } = useCurrency();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        onClick={closeWishlist}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-pink-300">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h2 className="text-base font-bold">Your Saved Wishlist</h2>
                <p className="text-xs text-slate-300">
                  {wishlist.length} {wishlist.length === 1 ? 'programme' : 'programmes'} saved
                </p>
              </div>
            </div>

            <button 
              onClick={closeWishlist}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Heart className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-800">Your wishlist is empty</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Click the heart icon on any course card or syllabus page to save programmes you wish to review later.
                  </p>
                </div>
                <button
                  onClick={closeWishlist}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-indigo-600 transition-colors"
                >
                  Explore Academy Programs
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {wishlist.map((item) => (
                  <div 
                    key={item.courseId}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-pink-300 transition-all space-y-3 relative group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                            {item.code}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 flex items-center">
                            <Clock className="w-3 h-3 mr-1 text-slate-400" /> {item.duration}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                          {item.title}
                        </h4>
                      </div>

                      <button
                        onClick={() => removeFromWishlist(item.courseId)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                      <span className="font-black text-slate-900 text-sm text-gradient">
                        {formatAmount(item.priceGBP, item.priceINR)}
                      </span>

                      <button
                        onClick={() => moveToCart(item)}
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all flex items-center space-x-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                        <span>Move to Basket</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200">
              <button
                onClick={() => {
                  wishlist.forEach(item => moveToCart(item));
                  closeWishlist();
                }}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-2"
              >
                <span>Move All to Basket</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
