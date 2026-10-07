import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export const WishlistDrawer = ({
  onSelectProduct,
  onNavigateToShop,
}) => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product, 1, 'Signature');
    });
    clearWishlist();
    setIsWishlistOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#080808] border-l border-[#b6b095]/20 flex flex-col shadow-2xl shadow-black text-[#f4efe6] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#b6b095]/15 flex items-center justify-between bg-[#0b0b0b]">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-[#e3131b] fill-current" />
              <h2 className="text-base font-medium text-white font-serif-heading">
                Curated Desires ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-lg text-[#b6b095] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close wishlist drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-[#b6b095]/20 flex items-center justify-center text-[#b6b095]/50">
                  <Heart className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-white font-serif-heading">No preserved favorites yet</h3>
                  <p className="text-xs text-[#b6b095]/70 max-w-xs mt-1">
                    Tap the heart icon on any rare bloom to preserve it in your personal collection.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    onNavigateToShop();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3.5 rounded-xl bg-white/[0.02] border border-[#b6b095]/15 hover:border-[#b6b095]/30 transition-all"
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-18 h-20 rounded-lg object-cover border border-[#b6b095]/20 flex-shrink-0 cursor-pointer"
                    onClick={() => {
                      onSelectProduct(product);
                      setIsWishlistOpen(false);
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 
                          onClick={() => {
                            onSelectProduct(product);
                            setIsWishlistOpen(false);
                          }}
                          className="text-xs font-medium text-white hover:text-[#ff4d56] transition-colors cursor-pointer truncate"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="text-[#b6b095]/50 hover:text-[#ff4d56] transition-colors p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#b6b095]/70 mt-0.5 italic font-serif-heading truncate">
                        {product.species}
                      </p>

                      <p className="text-xs font-mono font-semibold text-white mt-1">
                        ${product.price}
                      </p>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => {
                          addToCart(product, 1, 'Signature');
                          removeFromWishlist(product.id);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-medium transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Basket</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-5 border-t border-[#b6b095]/15 bg-[#0b0b0b] space-y-3">
              <button
                onClick={handleMoveAllToCart}
                className="w-full py-3 px-4 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg shadow-[#e3131b]/30 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Basket ({wishlist.length})</span>
              </button>

              <button
                onClick={clearWishlist}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#b6b095] hover:text-white transition-colors"
              >
                Clear Wishlist
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
