import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Truck, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer = ({
  onNavigateToCheckout,
  onNavigateToCartPage,
  onNavigateToShop,
}) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    estimatedTax,
    total,
    promoCode,
    promoDiscountPercent,
    promoError,
    applyPromoCode,
    removePromoCode,
    freeShippingThreshold,
    amountForFreeShipping,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(
    100,
    Math.round(((freeShippingThreshold - amountForFreeShipping) / freeShippingThreshold) * 100)
  );

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      const success = applyPromoCode(inputCode);
      if (success) setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#080808] border-l border-[#b6b095]/20 flex flex-col shadow-2xl shadow-black text-[#f4efe6] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#b6b095]/15 flex items-center justify-between bg-[#0b0b0b]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#e3131b]" />
              <h2 className="text-base font-medium text-white font-serif-heading">
                Harvest Basket ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-[#b6b095] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-[#110809] border-b border-[#e3131b]/20">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#b6b095] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#ff4d56]" />
                {amountForFreeShipping === 0 ? (
                  <span className="text-[#ff4d56] font-semibold">Complimentary Courier Unlocked</span>
                ) : (
                  <span>Add <strong className="text-white font-mono">${amountForFreeShipping}</strong> for Free Courier</span>
                )}
              </span>
              <span className="font-mono text-[11px] text-[#ff4d56] font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#e3131b] to-[#ff4d56] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Body / Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-[#b6b095]/20 flex items-center justify-center text-[#b6b095]/50">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-white font-serif-heading">Your harvest basket is empty</h3>
                  <p className="text-xs text-[#b6b095]/70 max-w-xs mt-1">
                    Explore our private botanical reserves of rare spider lilies and velvet crimson blooms.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigateToShop();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Explore The Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-[#b6b095]/15 hover:border-[#b6b095]/30 transition-all"
                >
                  <img
                    src={item.product?.images?.[0]}
                    alt={item.product?.name}
                    className="w-18 h-20 rounded-lg object-cover border border-[#b6b095]/20 flex-shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-medium text-white truncate">
                          {item.product?.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#b6b095]/50 hover:text-[#ff4d56] transition-colors p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#b6b095]/70 mt-0.5 font-mono">
                        {item.size} • ${item.price} ea
                      </p>

                      {item.includeVase && (
                        <span className="inline-block text-[10px] text-[#ff4d56] bg-[#e3131b]/10 border border-[#e3131b]/30 px-1.5 py-0.5 rounded mt-1">
                          + Smoked Ceramic Vase
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-white/20 rounded-lg bg-black/60 px-1.5 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-[#b6b095] hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-mono text-xs font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-[#b6b095] hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-sm font-semibold text-white">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#b6b095]/15 bg-[#0b0b0b] space-y-4">
              {/* Promo code */}
              {promoCode ? (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#e3131b]/15 border border-[#e3131b]/40 text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#ff4d56]" />
                    <div>
                      <span className="font-mono font-bold text-white">{promoCode}</span>
                      <span className="text-[10px] text-[#b6b095] ml-1.5">({promoDiscountPercent}% off)</span>
                    </div>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-[11px] text-[#ff4d56] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Privilege code (e.g. FLORIA15)"
                      className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-[#b6b095]/20 text-white placeholder-[#b6b095]/40 text-xs focus:outline-none focus:border-[#e3131b]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-[#ff4d56] flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {promoError}
                    </p>
                  )}
                </form>
              )}

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-[#b6b095]/80 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#ff4d56]">
                    <span>Privilege Discount</span>
                    <span className="font-mono">-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Courier</span>
                  <span className="font-mono text-white">
                    {shippingFee === 0 ? <span className="text-[#ff4d56]">FREE</span> : `$${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-mono text-white">${estimatedTax}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-white/10">
                  <span>Estimated Sovereign Total</span>
                  <span className="font-mono text-lg text-white">${total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigateToCheckout();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg shadow-[#e3131b]/30 flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Haute Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigateToCartPage();
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#b6b095] hover:text-white text-xs transition-colors border border-white/10 text-center"
                >
                  View Full Cart &amp; Gift Customization
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
