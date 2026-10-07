import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Sparkles, 
  Check, 
  Truck,
  Plus,
  Minus,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/shop/ProductCard';

export const ProductDetailPage = ({
  product,
  onNavigateBack,
  onSelectProduct,
  onNavigateToCheckout,
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Signature');
  const [includeVase, setIncludeVase] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [giftNote, setGiftNote] = useState('');

  const isFavorited = isInWishlist(product.id);
  const currentSizeOption = product.sizes?.find(s => s.label === selectedSize) || (product.sizes ? product.sizes[1] : { multiplier: 1, stems: product.stemCount });
  const stemBasePrice = Math.round(product.price * currentSizeOption.multiplier);
  const vasePrice = includeVase ? 45 : 0;
  const singleItemTotal = stemBasePrice + vasePrice;
  const grandTotal = singleItemTotal * quantity;

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, includeVase, giftNote);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, includeVase, giftNote);
    onNavigateToCheckout();
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Back button */}
      <button
        onClick={onNavigateBack}
        className="inline-flex items-center gap-2 text-xs text-[#b6b095] hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-[#e3131b]" />
        <span>Return to Catalog Treasury</span>
      </button>

      {/* Main Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Left: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#b6b095]/20 bg-black shadow-2xl">
            <img
              src={product.images?.[activeImageIdx] || product.images?.[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <div className="absolute top-5 left-5 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#120708]/90 border border-[#e3131b]/50 text-[#ff4d56] text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  {product.badge}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    activeImageIdx === idx
                      ? 'border-[#e3131b] scale-105 shadow-lg'
                      : 'border-[#b6b095]/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Origin & Story Callout */}
          <div className="p-6 rounded-2xl bg-[#090909] border border-[#b6b095]/15 space-y-2 mt-6">
            <span className="text-[10px] font-mono tracking-widest text-[#ff4d56] uppercase">
              The Botanical Lore
            </span>
            <p className="text-xs text-[#b6b095] leading-relaxed">
              {product.story}
            </p>
          </div>
        </div>

        {/* Right: Configurator & Order Actions */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="space-y-2 border-b border-[#b6b095]/15 pb-5">
            <div className="flex items-center justify-between text-xs text-[#b6b095]/70">
              <span className="uppercase tracking-widest font-mono text-[#e3131b]">{product.category} Specimen</span>
              <span className="flex items-center gap-1 text-[#d4af37]">
                <Star className="w-3.5 h-3.5 fill-current" /> {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display text-white">
              {product.name}
            </h1>
            <p className="text-sm text-[#b6b095] italic font-serif-heading">
              {product.species} &bull; {product.harvestOrigin}
            </p>
          </div>

          {/* Price */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-[#b6b095]/20 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-mono font-bold text-white">
                ${grandTotal}
              </span>
              <span className="text-xs text-[#b6b095]/70 ml-2">
                (${singleItemTotal} / unit)
              </span>
            </div>
            {includeVase && (
              <span className="text-xs text-[#ff4d56]">
                Vase Added (+$45)
              </span>
            )}
          </div>

          <p className="text-xs text-[#b6b095] leading-relaxed">
            {product.description}
          </p>

          {/* Size picker */}
          {product.sizes && (
            <div className="space-y-2">
              <label className="font-mono text-[11px] tracking-wider text-white uppercase block">
                Stem Arrangement
              </label>
              <div className="grid grid-cols-3 gap-2">
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
                    <p className="text-xs font-mono font-medium text-white mt-1">
                      ${Math.round(product.price * s.multiplier)}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Vase option */}
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
                <p className="text-[11px] text-[#b6b095]/70">Fitted to stem gauge</p>
              </div>
            </div>
            <span className="font-mono text-xs font-medium text-white">+$45</span>
          </div>

          {/* Gift Message */}
          <div>
            <label className="font-mono text-[11px] tracking-wider text-white uppercase block mb-1">
              Embossed Gold Foil Gift Note (Optional)
            </label>
            <textarea
              rows={2}
              value={giftNote}
              onChange={(e) => setGiftNote(e.target.value)}
              placeholder="Sentiment to be penned onto luxury cardstock..."
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#b6b095]/40 text-xs focus:outline-none focus:border-[#e3131b]"
            />
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#b6b095]/20 space-y-3">
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

              {/* Add to basket */}
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
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors border border-white/20"
            >
              Instant Sovereign Checkout
            </button>
          </div>

          {/* Care specs mini-grid */}
          {product.careGuide && (
            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff4d56] block">Hydration</span>
                <p className="text-[#b6b095] mt-0.5">{product.careGuide.watering}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] block">Vase Life</span>
                <p className="text-[#b6b095] mt-0.5">{product.careGuide.longevity}</p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Related Products Carousel/Grid */}
      <div className="pt-16 border-t border-[#b6b095]/15 space-y-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#e3131b] uppercase">
            Harmonious Pairings
          </span>
          <h3 className="text-2xl font-display text-white mt-1">
            YOU MAY ALSO CHERISH
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard
              key={rel.id}
              product={rel}
              onQuickView={onSelectProduct}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>

    </div>
  );
};
