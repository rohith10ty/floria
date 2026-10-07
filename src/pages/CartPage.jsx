import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Gift, 
  Truck, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  ArrowLeft 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage = ({
  onNavigateToShop,
  onNavigateToCheckout,
}) => {
  const {
    cart,
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
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [giftNote, setGiftNote] = useState('');

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

  if (cart.length === 0) {
    return (
      <div className="py-24 px-4 max-w-2xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-white/5 border border-[#b6b095]/20 flex items-center justify-center text-[#b6b095]/50 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-display text-white">Your Harvest Basket is Empty</h1>
          <p className="text-xs sm:text-sm text-[#b6b095] max-w-md mx-auto">
            Explore our curated reserves of rare spider lilies, black baccara roses, and velvet imperial peonies.
          </p>
        </div>
        <button
          onClick={onNavigateToShop}
          className="px-8 py-3.5 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg shadow-[#e3131b]/30"
        >
          Explore Treasury
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#b6b095]/15 pb-6">
        <div>
          <button
            onClick={onNavigateToShop}
            className="inline-flex items-center gap-1.5 text-xs text-[#b6b095] hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#e3131b]" />
            <span>Continue Curating</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-display text-white">
            HARVEST BASKET
          </h1>
        </div>
        <span className="text-xs font-mono text-[#b6b095]">
          {cart.length} unique floral arrangements
        </span>
      </div>

      {/* Free Shipping Meter Banner */}
      <div className="p-4 rounded-2xl bg-[#110809] border border-[#e3131b]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#e3131b]/20 flex items-center justify-center text-[#ff4d56]">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-white">
              {amountForFreeShipping === 0 ? (
                <span className="text-[#ff4d56]">Complimentary White-Glove Courier Unlocked!</span>
              ) : (
                <span>Add <strong className="text-white font-mono">${amountForFreeShipping}</strong> more to receive complimentary cold courier</span>
              )}
            </p>
            <p className="text-[11px] text-[#b6b095]/70">Standard temperature-controlled delivery is $25</p>
          </div>
        </div>
        <div className="w-full sm:w-48">
          <div className="w-full h-2 rounded-full bg-black border border-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#e3131b] to-[#ff4d56] transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Cart Items (Left) + Summary & Config (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="divide-y divide-[#b6b095]/15 border border-[#b6b095]/15 rounded-2xl bg-[#090909] overflow-hidden">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/[0.01] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product?.images?.[0]}
                    alt={item.product?.name}
                    className="w-20 h-24 rounded-xl object-cover border border-[#b6b095]/20 flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff4d56]">
                      {item.product?.category}
                    </span>
                    <h3 className="text-base font-semibold text-white font-serif-heading">
                      {item.product?.name}
                    </h3>
                    <p className="text-xs text-[#b6b095]/80 font-mono mt-0.5">
                      {item.size} Stem Selection
                    </p>
                    {item.includeVase && (
                      <span className="inline-block text-[10px] text-[#ff4d56] bg-[#e3131b]/10 border border-[#e3131b]/30 px-2 py-0.5 rounded mt-1">
                        + Smoked Ceramic Vase ($45)
                      </span>
                    )}
                    {item.giftNote && (
                      <p className="text-[11px] text-[#b6b095]/60 italic mt-1 line-clamp-1">
                        &ldquo;{item.giftNote}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                  {/* Quantity */}
                  <div className="flex items-center border border-white/20 rounded-lg bg-black px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 text-[#b6b095] hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-mono text-xs font-semibold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 text-[#b6b095] hover:text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-mono font-bold text-white block">
                      ${item.price * item.quantity}
                    </span>
                    <span className="text-[10px] text-[#b6b095]/60 font-mono">
                      (${item.price} ea)
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#b6b095]/50 hover:text-[#ff4d56] transition-colors p-2"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery & Gift Card Customizer */}
          <div className="p-6 rounded-2xl bg-[#090909] border border-[#b6b095]/15 space-y-4">
            <h3 className="text-sm font-semibold text-white font-serif-heading flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#e3131b]" />
              Delivery Preferences &amp; Luxury Note
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#b6b095] block mb-1">
                  Scheduled Delivery Date
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#b6b095]/20 text-white text-xs focus:outline-none focus:border-[#e3131b]"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#b6b095] block mb-1">
                  Time Slot Window
                </label>
                <select className="w-full p-2.5 rounded-xl bg-black border border-[#b6b095]/20 text-white text-xs focus:outline-none focus:border-[#e3131b]">
                  <option>Morning (09:00 - 13:00)</option>
                  <option>Evening (14:00 - 18:00)</option>
                  <option>Twilight Express (19:00 - 22:00)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-[#b6b095] block mb-1">
                Hand-Calligraphed Gold Foil Card Note
              </label>
              <textarea
                rows={2}
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="Include a personal dedication for the recipient..."
                className="w-full p-3 rounded-xl bg-black border border-[#b6b095]/20 text-white placeholder-[#b6b095]/40 text-xs focus:outline-none focus:border-[#e3131b]"
              />
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0a0a0a] border border-[#b6b095]/20 space-y-6">
          <h2 className="text-base font-semibold text-white font-serif-heading">
            Harvest Summary
          </h2>

          {/* Promo code */}
          {promoCode ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#e3131b]/15 border border-[#e3131b]/40 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ff4d56]" />
                <div>
                  <span className="font-mono font-bold text-white">{promoCode}</span>
                  <span className="text-[11px] text-[#b6b095] ml-1.5">({promoDiscountPercent}% off)</span>
                </div>
              </div>
              <button
                onClick={removePromoCode}
                className="text-[11px] text-[#ff4d56] hover:underline font-medium"
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
                  placeholder="Privilege Code"
                  className="flex-1 px-3 py-2 rounded-xl bg-black border border-[#b6b095]/20 text-white placeholder-[#b6b095]/40 text-xs focus:outline-none focus:border-[#e3131b]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors border border-white/20"
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

          {/* Breakdown */}
          <div className="space-y-2.5 text-xs text-[#b6b095] pt-2 border-t border-white/10">
            <div className="flex justify-between">
              <span>Botanical Subtotal</span>
              <span className="font-mono text-white">${subtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#ff4d56]">
                <span>Privilege Discount ({promoDiscountPercent}%)</span>
                <span className="font-mono">-${discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>White-Glove Cold Courier</span>
              <span className="font-mono text-white">
                {shippingFee === 0 ? <span className="text-[#ff4d56]">FREE</span> : `$${shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span className="font-mono text-white">${estimatedTax}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/15">
              <span>Sovereign Total</span>
              <span className="font-mono text-xl text-white">${total}</span>
            </div>
          </div>

          <button
            onClick={onNavigateToCheckout}
            className="w-full py-4 px-6 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xl shadow-[#e3131b]/30 flex items-center justify-center gap-2 group"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-[11px] text-[#b6b095]/70 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#ff4d56] flex-shrink-0" />
            <span>Harvest reservation locked for 30 minutes during checkout</span>
          </div>

        </div>
      </div>
    </div>
  );
};
