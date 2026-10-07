import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Gift, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  Lock, 
  Calendar, 
  Clock,
  Printer
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const CheckoutPage = ({
  onNavigateHome,
  onNavigateToCart,
}) => {
  const { cart, subtotal, discountAmount, shippingFee, estimatedTax, total, promoCode, clearCart } = useCart();
  const { user, addOrder } = useAuth();

  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Camille de Montparnasse',
    email: user?.email || 'camille.montparnasse@haute-floria.com',
    phone: '+1 (555) 234-8901',
    street: '740 Park Avenue, Apt 14B',
    apartment: 'Penthouse Suite',
    city: 'New York',
    state: 'NY',
    zipCode: '10021',
    deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    deliverySlot: 'Morning (09:00 - 13:00)',
    isGift: false,
    recipientName: '',
    giftMessage: '',
    cardNumber: '4242 •••• •••• 9281',
    cardExpiry: '10/28',
    cardCvc: '891',
    paymentMethod: 'credit_card',
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = e.target.checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const orderId = 'FLO-' + Math.floor(10000 + Math.random() * 90000);
      const trackingNumber = 'TRK-HAUTE-' + Math.floor(100000 + Math.random() * 900000);

      const address = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        deliveryDate: formData.deliveryDate,
        deliverySlot: formData.deliverySlot,
        giftMessage: formData.giftMessage,
        isGift: formData.isGift,
        recipientName: formData.recipientName,
      };

      const newOrder = {
        id: orderId,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [...cart],
        subtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total,
        status: 'Harvesting',
        shippingAddress: address,
        paymentMethod: formData.paymentMethod,
        trackingNumber,
      };

      addOrder(newOrder);
      setCompletedOrder(newOrder);
      clearCart();
      setLoading(false);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e3131b', '#ff4d56', '#b6b095', '#ffffff'],
        });
      } catch (err) {
        console.error(err);
      }
    }, 1500);
  };

  // If order was just placed, display Sovereign Order Confirmation
  if (completedOrder) {
    return (
      <div className="py-16 px-4 max-w-3xl mx-auto space-y-8 animate-in zoom-in-95 duration-300">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#e3131b]/20 border-2 border-[#e3131b] flex items-center justify-center text-[#ff4d56] mx-auto shadow-2xl shadow-[#e3131b]/30 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d56] block">
            Harvest Reservation Confirmed
          </span>
          <h1 className="text-3xl sm:text-5xl font-display text-white">
            THANK YOU FOR YOUR PATRONAGE
          </h1>
          <p className="text-xs sm:text-sm text-[#b6b095] max-w-md mx-auto">
            Order <strong className="text-white font-mono">{completedOrder.id}</strong> has been transmitted to our Kyoto &amp; Grasse Master Florists.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#090909] border border-[#b6b095]/20 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pb-6 border-b border-white/10 font-mono">
            <div>
              <span className="text-[10px] text-[#b6b095]/60 block uppercase">Order ID</span>
              <span className="text-white font-semibold">{completedOrder.id}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#b6b095]/60 block uppercase">Courier Tracking</span>
              <span className="text-[#ff4d56] font-semibold">{completedOrder.trackingNumber}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#b6b095]/60 block uppercase">Delivery Date</span>
              <span className="text-white font-semibold">{completedOrder.shippingAddress.deliveryDate}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#b6b095]/60 block uppercase">Sovereign Total</span>
              <span className="text-white font-semibold">${completedOrder.total}</span>
            </div>
          </div>

          {/* Reserved Stems */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">
              Allocated Living Specimens ({completedOrder.items.length})
            </h4>
            <div className="divide-y divide-white/5">
              {completedOrder.items.map((item, i) => (
                <div key={i} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover border border-[#b6b095]/20"
                    />
                    <div>
                      <h5 className="font-semibold text-white">{item.product.name}</h5>
                      <p className="text-[11px] text-[#b6b095]/70 font-mono">
                        {item.quantity}x {item.size} {item.includeVase ? '(+ Vase)' : ''}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono font-semibold text-white">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery destination */}
          <div className="pt-4 border-t border-white/10 text-xs text-[#b6b095] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff4d56] block">
              Temperature-Controlled Dispatch Address
            </span>
            <p className="text-white font-medium">{completedOrder.shippingAddress.fullName}</p>
            <p>{completedOrder.shippingAddress.street}, {completedOrder.shippingAddress.apartment}</p>
            <p>{completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state} {completedOrder.shippingAddress.zipCode}</p>
            <p className="text-[11px] text-[#b6b095]/60 mt-1">Window: {completedOrder.shippingAddress.deliverySlot}</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt &amp; Care Certificate</span>
          </button>

          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg shadow-[#e3131b]/30"
          >
            Return to Maison Floria
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="py-24 px-4 max-w-md mx-auto text-center space-y-4">
        <h2 className="text-2xl font-display text-white">No Items to Checkout</h2>
        <p className="text-xs text-[#b6b095]">Add botanical specimens to your harvest basket first.</p>
        <button
          onClick={onNavigateHome}
          className="px-6 py-2.5 rounded-xl bg-[#e3131b] text-white text-xs font-semibold uppercase"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      
      {/* Header */}
      <div>
        <button
          onClick={onNavigateToCart}
          className="inline-flex items-center gap-1.5 text-xs text-[#b6b095] hover:text-white transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#e3131b]" />
          <span>Return to Basket</span>
        </button>
        <h1 className="text-3xl sm:text-4xl font-display text-white">
          SOVEREIGN CHECKOUT
        </h1>
        <p className="text-xs text-[#b6b095] mt-1 font-mono">
          256-Bit Encrypted Courier Dispatch Protocol
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Input Details Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Recipient & Contact */}
          <div className="p-6 rounded-2xl bg-[#090909] border border-[#b6b095]/15 space-y-4">
            <h3 className="text-sm font-semibold text-white font-serif-heading flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#e3131b]" />
              1. White-Glove Courier Destination
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#b6b095] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#b6b095]/20 text-white text-xs focus:outline-none focus:border-[#e3131b]"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#b6b095] block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#b6b095]/20 text-white text-xs focus:outline-none focus:border-[#e3131b]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#b6b095] block mb-1">
                  Street Address &amp; Penthouse / Suite *
                </label>
                <input
                  type="text"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#b6b095]/20 text-white text-xs focus:outline-none focus:border-[#e3131b]"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#b6b095] block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#b6b095]/20 text-white text-xs focus:outline-none focus:border-[#e3131b]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#b6b095] block mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full p-2.5 rounded-xl bg-black border border-[#b6b095]/20 text-white text-xs focus:outline-none focus:border-[#e3131b]"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#b6b095] block mb-1">
                    Zip Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full p-2.5 rounded-xl bg-black border border-[#b6b095]/20 text-white text-xs focus:outline-none focus:border-[#e3131b]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#b6b095] block mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#ff4d56]" />
                  Scheduled Delivery Date
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#b6b095]/20 text-white text-xs focus:outline-none focus:border-[#e3131b]"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#b6b095] block mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#ff4d56]" />
                  Temperature Courier Slot
                </label>
                <select
                  name="deliverySlot"
                  value={formData.deliverySlot}
                  onChange={handleInputChange}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#b6b095]/20 text-white text-xs focus:outline-none focus:border-[#e3131b]"
                >
                  <option value="Morning (09:00 - 13:00)">Morning (09:00 - 13:00)</option>
                  <option value="Evening (14:00 - 18:00)">Evening (14:00 - 18:00)</option>
                  <option value="Twilight Express (19:00 - 22:00)">Twilight Express (19:00 - 22:00)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Gift Message Option */}
          <div className="p-6 rounded-2xl bg-[#090909] border border-[#b6b095]/15 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white font-serif-heading flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#e3131b]" />
                2. Luxury Gift Presentation
              </h3>
              <label className="flex items-center gap-2 text-xs text-[#b6b095] cursor-pointer">
                <span>Send as Gift</span>
                <input
                  type="checkbox"
                  name="isGift"
                  checked={formData.isGift}
                  onChange={handleInputChange}
                  className="w-4 h-4 accent-[#e3131b] rounded"
                />
              </label>
            </div>

            {formData.isGift && (
              <div className="space-y-3 pt-2 text-xs animate-in fade-in duration-200">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#b6b095] block mb-1">
                    Recipient Full Name
                  </label>
                  <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    placeholder="Lady Eleanor Sterling"
                    className="w-full p-2.5 rounded-xl bg-black border border-[#b6b095]/20 text-white text-xs focus:outline-none focus:border-[#e3131b]"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[#b6b095] block mb-1">
                    Hand-Calligraphed Gold Foil Card Inscription
                  </label>
                  <textarea
                    rows={3}
                    name="giftMessage"
                    value={formData.giftMessage}
                    onChange={handleInputChange}
                    placeholder="Write a personal poetic sentiment..."
                    className="w-full p-3 rounded-xl bg-black border border-[#b6b095]/20 text-white placeholder-[#b6b095]/40 text-xs focus:outline-none focus:border-[#e3131b]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Payment */}
          <div className="p-6 rounded-2xl bg-[#090909] border border-[#b6b095]/15 space-y-4">
            <h3 className="text-sm font-semibold text-white font-serif-heading flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#e3131b]" />
              3. Secure Vault Payment
            </h3>

            {/* Visual Credit Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1c0a0c] via-[#0e0e0e] to-black border border-[#e3131b]/30 shadow-2xl relative overflow-hidden text-white">
              <div className="flex justify-between items-start">
                <span className="font-display tracking-wider text-base text-[#ff4d56]">FLORIA SOVEREIGN</span>
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
              </div>

              <div className="my-6">
                <span className="font-mono text-lg tracking-widest block text-white/90">
                  {formData.cardNumber}
                </span>
              </div>

              <div className="flex justify-between items-end text-xs font-mono">
                <div>
                  <span className="text-[9px] text-[#b6b095]/60 uppercase block">Cardholder</span>
                  <span className="text-white uppercase">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#b6b095]/60 uppercase block">Expires</span>
                  <span className="text-white">{formData.cardExpiry}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="col-span-2">
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#b6b095] block mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  required
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#b6b095]/20 text-white text-xs focus:outline-none focus:border-[#e3131b]"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#b6b095] block mb-1">
                  CVC Code
                </label>
                <input
                  type="text"
                  name="cardCvc"
                  required
                  value={formData.cardCvc}
                  onChange={handleInputChange}
                  className="w-full p-2.5 rounded-xl bg-black border border-[#b6b095]/20 text-white text-xs focus:outline-none focus:border-[#e3131b]"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right: Order Summary Breakdown */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0a0a0a] border border-[#b6b095]/20 space-y-6">
          <h2 className="text-base font-semibold text-white font-serif-heading">
            Order Review ({cart.length} Arrangements)
          </h2>

          <div className="divide-y divide-white/5 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-12 h-14 rounded-lg object-cover border border-[#b6b095]/20 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-semibold text-white truncate max-w-[150px]">{item.product.name}</h4>
                    <p className="text-[11px] text-[#b6b095]/70 font-mono">
                      Qty: {item.quantity} • {item.size}
                    </p>
                    {item.includeVase && (
                      <span className="text-[9px] text-[#ff4d56] block">+ Ceramic Vase</span>
                    )}
                  </div>
                </div>
                <span className="font-mono font-semibold text-white">
                  ${item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing breakdown */}
          <div className="space-y-2 text-xs text-[#b6b095] pt-4 border-t border-white/10">
            <div className="flex justify-between">
              <span>Botanical Subtotal</span>
              <span className="font-mono text-white">${subtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#ff4d56]">
                <span>Privilege Discount ({promoCode})</span>
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
            <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/15">
              <span>Final Total</span>
              <span className="font-mono text-2xl text-white">${total}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xl shadow-[#e3131b]/30 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authorizing Sovereign Order...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Authorize Sovereign Order (${total})</span>
              </span>
            )}
          </button>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-[11px] text-[#b6b095]/70 space-y-1">
            <div className="flex items-center gap-2 text-white font-medium">
              <ShieldCheck className="w-4 h-4 text-[#ff4d56]" />
              <span>Maison Floria Guarantee</span>
            </div>
            <p>If blooms do not maintain pristine turgor for 7 full days, a replacement harvest is dispatched immediately without surcharge.</p>
          </div>
        </div>

      </form>
    </div>
  );
};
