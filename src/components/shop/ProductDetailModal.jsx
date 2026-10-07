import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  Sparkles, 
  Droplets, 
  Sun, 
  Clock, 
  Thermometer, 
  ShieldCheck, 
  Check, 
  Truck,
  Plus,
  Minus
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const ProductDetailModal = ({
  product,
  isOpen,
  onClose,
  onNavigateToCheckout,
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Signature');
  const [includeVase, setIncludeVase] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [giftNote, setGiftNote] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !product) return null;

  const isFavorited = isInWishlist(product.id);
  const currentSizeOption = product.sizes?.find(s => s.label === selectedSize) || (product.sizes ? product.sizes[1] : { multiplier: 1, stems: product.stemCount });
  const stemBasePrice = Math.round(product.price * currentSizeOption.multiplier);
  const vasePrice = includeVase ? 45 : 0;
  const singleItemTotal = stemBasePrice + vasePrice;
  const grandTotal = singleItemTotal * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, includeVase, giftNote);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, includeVase, giftNote);
    onClose();
    if (onNavigateToCheckout) {
      onNavigateToCheckout();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-[#0a0a0a] border border-[#b6b095]/25 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-[#e3131b] text-white border border-white/20 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Gallery */}
        <div className="w-full md:w-1/2 p-5 sm:p-6 flex flex-col justify-between bg-[#060606] border-b md:border-b-0 md:border-r border-[#b6b095]/15">
          <div>
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-[#b6b095]/20 bg-black">
              <img
                src={product.images?.[activeImageIdx] || product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#120708]/90 border border-[#e3131b]/50 text-[#ff4d56] text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
                    <Sparkles className="w-3 h-3" />
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImageIdx === idx
                        ? 'border-[#e3131b] scale-105'
                        : 'border-[#b6b095]/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Scent notes & origin */}
          <div className="mt-6 pt-4 border-t border-[#b6b095]/15 hidden md:block">
            <span className="text-[10px] font-mono tracking-widest text-[#b6b095]/70 uppercase block mb-2">
              Aroma Signature & Notes
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.scentProfile?.map((scent) => (
                <span
                  key={scent}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-[#f4efe6]"
                >
                  {scent}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#b6b095]/60 mt-3 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#e3131b]" />
              Harvest Origin: <span className="text-white">{product.harvestOrigin}</span>
            </p>
          </div>
        </div>

        {/* Right: Product Details & Configurator */}
        <div className="w-full md:w-1/2 p-5 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[80vh] md:max-h-[90vh]">
          <div className="space-y-5">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#b6b095]/70 mb-1">
                <span className="uppercase tracking-widest font-mono text-[#e3131b]">{product.category} Botanical</span>
                <span className="flex items-center gap-1 text-[#d4af37]">
                  <Star className="w-3.5 h-3.5 fill-current" /> {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display text-white">
                {product.name}
              </h2>
              <p className="text-sm text-[#b6b095] italic font-serif-heading mt-0.5">
                {product.species}
              </p>
            </div>

            {/* Price banner */}
            <div className="flex items-baseline gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-[#b6b095]/20">
              <span className="text-3xl font-mono font-bold text-white">
                ${grandTotal}
              </span>
              <span className="text-xs text-[#b6b095]/70">
                (${singleItemTotal} / arrangement)
              </span>
              {includeVase && (
                <span className="text-xs text-[#ff4d56] ml-auto">
                  Includes Artisanal Vase (+$45)
                </span>
              )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#b6b095]/20 gap-4 text-xs font-mono tracking-wider uppercase">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'details' ? 'border-[#e3131b] text-white' : 'border-transparent text-[#b6b095]/60 hover:text-white'
                }`}
              >
                Configuration
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'care' ? 'border-[#e3131b] text-white' : 'border-transparent text-[#b6b095]/60 hover:text-white'
                }`}
              >
                Care & Life
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'reviews' ? 'border-[#e3131b] text-white' : 'border-transparent text-[#b6b095]/60 hover:text-white'
                }`}
              >
                Collector Reviews
              </button>
            </div>

            {/* Tab 1: Configuration */}
            {activeTab === 'details' && (
              <div className="space-y-4 text-xs">
                <p className="text-sm text-[#b6b095] leading-relaxed">
                  {product.description}
                </p>

                {/* Size selection */}
                {product.sizes && (
                  <div>
                    <label className="font-mono text-[11px] tracking-wider text-white uppercase block mb-2">
                      Select Stem Architecture
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s.label}
                          type="button"
                          onClick={() => setSelectedSize(s.label)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedSize === s.label
                              ? 'bg-[#e3131b]/15 border-[#e3131b] text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-[#b6b095] hover:border-white/30'
                          }`}
                        >
                          <div className="flex items-center justify-between font-semibold text-xs">
                            <span>{s.label}</span>
                            {selectedSize === s.label && <Check className="w-3.5 h-3.5 text-[#ff4d56]" />}
                          </div>
                          <p className="text-[11px] text-[#b6b095]/80 mt-1 font-mono">{s.stems} Stems</p>
                          <p className="text-xs font-mono font-medium text-white mt-2">
                            ${Math.round(product.price * s.multiplier)}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vase add-on */}
                <div 
                  onClick={() => setIncludeVase(!includeVase)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    includeVase
                      ? 'bg-[#e3131b]/10 border-[#e3131b]/50 text-white'
                      : 'bg-white/5 border-white/10 text-[#b6b095] hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                      includeVase ? 'bg-[#e3131b] border-[#e3131b] text-white' : 'border-white/30'
                    }`}>
                      {includeVase && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">Add Smoked Obsidian Ceramic Vase</p>
                      <p className="text-[11px] text-[#b6b095]/70">Custom weighted artisanal vessel fitted to stem gauge</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-medium text-white">+$45</span>
                </div>

                {/* Gift card message */}
                <div>
                  <label className="font-mono text-[11px] tracking-wider text-white uppercase block mb-1.5">
                    Embossed Gold Foil Gift Card (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Write a heartfelt sentiment to be hand-written on luxury cream cardstock..."
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#b6b095]/40 text-xs focus:outline-none focus:border-[#e3131b]"
                  />
                </div>
              </div>
            )}

            {/* Tab 2: Care Guide */}
            {activeTab === 'care' && product.careGuide && (
              <div className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 text-[#ff4d56] mb-1">
                      <Droplets className="w-4 h-4" />
                      <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">Hydration</span>
                    </div>
                    <p className="text-xs text-[#b6b095] leading-relaxed">{product.careGuide.watering}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 text-[#d4af37] mb-1">
                      <Sun className="w-4 h-4" />
                      <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">Sunlight</span>
                    </div>
                    <p className="text-xs text-[#b6b095] leading-relaxed">{product.careGuide.sunlight}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 text-[#ff4d56] mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">Longevity</span>
                    </div>
                    <p className="text-xs text-[#b6b095] leading-relaxed">{product.careGuide.longevity}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 text-[#b6b095] mb-1">
                      <Thermometer className="w-4 h-4" />
                      <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">Temperature</span>
                    </div>
                    <p className="text-xs text-[#b6b095] leading-relaxed">{product.careGuide.temperature}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#e3131b]/10 border border-[#e3131b]/30">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4d56] block mb-1">
                    Master Botanist Protocol
                  </span>
                  <p className="text-xs text-[#f4efe6] leading-relaxed">
                    {product.careGuide.botanistTip}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-3">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((r) => (
                    <div key={r.id} className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white">{r.author}</span>
                          {r.verified && (
                            <span className="text-[10px] text-[#ff4d56] flex items-center gap-0.5">
                              <ShieldCheck className="w-3 h-3" /> Verified Patron
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#b6b095]/60">{r.date}</span>
                      </div>
                      <div className="flex items-center text-[#d4af37]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <h4 className="text-xs font-medium text-white">{r.headline}</h4>
                      <p className="text-xs text-[#b6b095] leading-relaxed">{r.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-[#b6b095]/70">
                    <p className="text-xs">This rare harvest has 5-star ratings across our Paris and Kyoto boutiques.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-6 mt-6 border-t border-[#b6b095]/20 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-white/20 rounded-xl bg-black px-2 py-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-[#b6b095] hover:text-white"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-mono text-xs font-semibold text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-[#b6b095] hover:text-white"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Basket */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg shadow-[#e3131b]/30"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Basket (${grandTotal})</span>
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border transition-all ${
                  isFavorited
                    ? 'bg-[#e3131b] text-white border-[#e3131b]'
                    : 'bg-white/5 border-white/15 text-[#b6b095] hover:text-white'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors border border-white/20"
            >
              Express Sovereign Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
