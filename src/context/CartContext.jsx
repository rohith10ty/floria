import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROMO_CODES } from '../data/products';
import { useToast } from './ToastContext';

const CartContext = createContext();

const VASE_PRICE = 45;
const FREE_SHIPPING_MIN = 120;
const STANDARD_SHIPPING_FEE = 25;
const TAX_RATE = 0.08;

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('floria_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscountPercent, setPromoDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('floria_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  const addToCart = (
    product,
    quantity = 1,
    size = 'Signature',
    includeVase = false,
    giftNote = ''
  ) => {
    const sizeOption = product.sizes?.find(s => s.label === size);
    const sizeMultiplier = sizeOption ? sizeOption.multiplier : 1.0;
    const baseUnitPrice = Math.round(product.price * sizeMultiplier);
    const itemVasePrice = includeVase ? VASE_PRICE : 0;
    const singleItemTotal = baseUnitPrice + itemVasePrice;

    const itemId = `${product.id}-${size}-${includeVase ? 'vase' : 'novase'}`;

    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === itemId);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        const newItem = {
          id: itemId,
          product,
          quantity,
          size,
          price: singleItemTotal,
          includeVase,
          vasePrice: itemVasePrice,
          giftNote,
        };
        return [...prev, newItem];
      }
    });

    addToast({
      type: 'cart',
      title: 'Botanical Added to Order',
      message: `${quantity}x ${product.name} (${size}) placed in your harvest basket.`,
      thumbnail: product.images ? product.images[0] : '',
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (itemId) => {
    const item = cart.find(i => i.id === itemId);
    setCart((prev) => prev.filter((i) => i.id !== itemId));
    if (item) {
      addToast({
        type: 'info',
        title: 'Item Removed',
        message: `${item.product.name} removed from harvest basket.`,
      });
    }
  };

  const updateQuantity = (itemId, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (PROMO_CODES[clean]) {
      setPromoCode(clean);
      setPromoDiscountPercent(PROMO_CODES[clean].discountPercent);
      setPromoError(null);
      addToast({
        type: 'success',
        title: 'Privilege Code Applied',
        message: `${PROMO_CODES[clean].description} (${PROMO_CODES[clean].discountPercent}% off applied)`,
      });
      return true;
    } else {
      setPromoError('Invalid privilege code. Try "FLORIA15" or "LYCORIS20".');
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoDiscountPercent(0);
    setPromoError(null);
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * promoDiscountPercent) / 100);
  const postDiscountSubtotal = Math.max(0, subtotal - discountAmount);
  
  const shippingFee = postDiscountSubtotal === 0 ? 0 : (postDiscountSubtotal >= FREE_SHIPPING_MIN ? 0 : STANDARD_SHIPPING_FEE);
  const estimatedTax = Math.round(postDiscountSubtotal * TAX_RATE);
  const total = postDiscountSubtotal + shippingFee + estimatedTax;

  const freeShippingThreshold = FREE_SHIPPING_MIN;
  const amountForFreeShipping = Math.max(0, FREE_SHIPPING_MIN - postDiscountSubtotal);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        promoCode,
        promoDiscountPercent,
        promoError,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discountAmount,
        shippingFee,
        estimatedTax,
        total,
        freeShippingThreshold,
        amountForFreeShipping,
        totalItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
