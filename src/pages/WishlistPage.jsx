import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const WishlistPage = ({
  onNavigateToShop,
  onSelectProduct,
}) => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product, 1, 'Signature');
    });
    clearWishlist();
  };

  if (wishlist.length === 0) {
    return (
      <div className="py-24 px-4 max-w-2xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-white/5 border border-[#b6b095]/20 flex items-center justify-center text-[#b6b095]/50 mx-auto">
          <Heart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-display text-white">No Preserved Desires</h1>
          <p className="text-xs sm:text-sm text-[#b6b095] max-w-md mx-auto">
            Your personal collection of coveted botanicals is empty. Tap the heart icon on any rare bloom to preserve it.
          </p>
        </div>
        <button
          onClick={onNavigateToShop}
          className="px-8 py-3.5 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg shadow-[#e3131b]/30"
        >
          Explore Botanical Treasury
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
            <span>Return to Catalog</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-display text-white">
            CURATED DESIRES &amp; WISHLIST
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMoveAllToCart}
            className="px-5 py-2.5 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Move All to Basket ({wishlist.length})</span>
          </button>

          <button
            onClick={clearWishlist}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#b6b095] hover:text-white transition-colors border border-white/10"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col rounded-2xl bg-[#090909] border border-[#b6b095]/15 hover:border-[#e3131b]/40 transition-all duration-300 overflow-hidden shadow-xl"
          >
            <div 
              className="relative aspect-[4/5] bg-black overflow-hidden cursor-pointer"
              onClick={() => onSelectProduct(product)}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(product.id);
                }}
                className="absolute top-3 right-3 p-2.5 rounded-full bg-black/60 text-[#ff4d56] hover:bg-[#e3131b] hover:text-white transition-colors z-10 border border-white/10"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4d56]">
                  {product.category}
                </span>
                <h3 
                  onClick={() => onSelectProduct(product)}
                  className="font-medium text-base text-white hover:text-[#ff4d56] transition-colors cursor-pointer mt-0.5 line-clamp-1"
                >
                  {product.name}
                </h3>
                <p className="text-xs text-[#b6b095]/70 italic font-serif-heading line-clamp-1">
                  {product.species}
                </p>
              </div>

              <div className="pt-2 border-t border-[#b6b095]/10 flex items-center justify-between">
                <span className="text-lg font-mono font-semibold text-white">
                  ${product.price}
                </span>

                <button
                  onClick={() => {
                    addToCart(product, 1, 'Signature');
                    removeFromWishlist(product.id);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-medium transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Basket</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
