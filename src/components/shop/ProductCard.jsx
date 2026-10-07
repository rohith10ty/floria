import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const ProductCard = ({
  product,
  onQuickView,
  onSelectProduct,
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState('Signature');
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const sizeOption = product.sizes?.find(s => s.label === selectedSize) || (product.sizes ? product.sizes[1] : { multiplier: 1, stems: product.stemCount });
  const calculatedPrice = Math.round(product.price * sizeOption.multiplier);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative flex flex-col rounded-xl bg-[#090909] border border-[#b6b095]/15 hover:border-[#e3131b]/40 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery Container */}
      <div 
        className="relative w-full aspect-[4/5] bg-[#0d0d0d] overflow-hidden cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={product.images?.[0]}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/products/spider-lily.jpg';
          }}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#120708]/90 border border-[#e3131b]/40 text-[#ff4d56] text-[9px] font-semibold tracking-wider uppercase backdrop-blur-md">
              <Sparkles className="w-2 h-2" />
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="inline-flex px-1.5 py-0.5 rounded-md bg-[#e3131b] text-white text-[9px] font-bold tracking-wider uppercase">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isFavorited
              ? 'bg-[#e3131b] text-white'
              : 'bg-black/50 text-[#b6b095] hover:text-white hover:bg-black/80 border border-white/10'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button */}
        <div className="absolute inset-x-2.5 bottom-2.5 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-black/85 hover:bg-[#e3131b] text-white text-[11px] font-medium backdrop-blur-md border border-white/20 hover:border-[#e3131b] transition-all"
          >
            <Eye className="w-3 h-3" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Category & Origin */}
          <div className="flex items-center justify-between text-[10px] text-[#b6b095]/60 mb-0.5">
            <span className="uppercase tracking-widest">{product.category}</span>
            <span className="truncate max-w-[100px]">{product.harvestOrigin?.split(',')[0]}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-medium text-xs sm:text-sm text-white hover:text-[#ff4d56] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Botanical Species Name */}
          <p className="text-[11px] text-[#b6b095]/70 italic font-serif-heading line-clamp-1 mt-0.5">
            {product.species}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-[#d4af37]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 ${
                    i < Math.floor(product.rating || 5)
                      ? 'fill-current'
                      : 'text-neutral-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-[#b6b095]">
              {product.rating} ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Size Selector Tabs */}
        {product.sizes && (
          <div className="pt-0.5">
            <div className="flex items-center justify-between text-[9px] text-[#b6b095]/70 mb-1">
              <span>Arrangement:</span>
              <span className="text-white font-mono">{sizeOption.stems} Stems</span>
            </div>
            <div className="grid grid-cols-3 gap-1 p-0.5 bg-black/60 rounded-md border border-white/10">
              {product.sizes.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setSelectedSize(s.label)}
                  className={`py-0.5 text-[9px] rounded font-medium transition-all ${
                    selectedSize === s.label
                      ? 'bg-[#e3131b] text-white shadow-sm'
                      : 'text-[#b6b095]/70 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price & Action Button */}
        <div className="pt-2 border-t border-[#b6b095]/10 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-mono font-semibold text-white">
                ${calculatedPrice}
              </span>
              {product.originalPrice && selectedSize === 'Signature' && (
                <span className="text-[10px] font-mono text-[#b6b095]/50 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[9px] text-[#b6b095]/60 block -mt-0.5">
              Cold-chain sealed
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1, selectedSize)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-[#e3131b] text-white text-xs font-medium transition-all border border-[#b6b095]/20 hover:border-[#e3131b] group/btn"
          >
            <ShoppingBag className="w-3 h-3 group-hover/btn:scale-110 transition-transform" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
