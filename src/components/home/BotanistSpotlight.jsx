import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Volume2, VolumeX, ShieldCheck, Heart } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const BotanistSpotlight = ({ onSelectProduct }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [ambientAudio, setAmbientAudio] = useState(false);

  const spotlightProduct = PRODUCTS.find((p) => p.id === 'black-baccara-rose') || PRODUCTS[1];
  const isFavorited = isInWishlist(spotlightProduct.id);

  return (
    <section id="provenance" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#b6b095]/15 scroll-mt-20">
      <div className="relative rounded-3xl bg-[#090909] border border-[#b6b095]/20 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-14">
        
        {/* Glow */}
        <div 
          className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #e3131b 0%, transparent 70%)' }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Big Atmospheric Image */}
          <div className="lg:col-span-6 space-y-4">
            <div 
              className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#b6b095]/30 cursor-pointer group"
              onClick={() => onSelectProduct(spotlightProduct)}
            >
              <img
                src={spotlightProduct.images?.[0]}
                alt={spotlightProduct.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/15">
                <p className="text-[10px] font-mono tracking-widest text-[#ff4d56] uppercase">
                  Botanist Field Notes • Vol. IV
                </p>
                <p className="text-xs text-[#f4efe6] font-serif-heading italic mt-1">
                  &ldquo;In the cool dawn of Grasse, the Black Baccara unfurls its outer velvet folds—absorbing all light, reflecting pure mystery.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right: Editorial Story & Purchase */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-[#e3131b] uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Curators Selection
                </span>
                
                {/* Audio ambiance button */}
                <button
                  onClick={() => setAmbientAudio(!ambientAudio)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[10px] font-mono text-[#b6b095] border border-white/10 transition-colors"
                >
                  {ambientAudio ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#ff4d56] animate-pulse" />
                      <span>Soundscape: Mist &amp; Rain</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Audio Ambiance</span>
                    </>
                  )}
                </button>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-white">
                BLACK BACCARA VELVET
              </h2>
              <p className="text-sm text-[#b6b095] italic font-serif-heading">
                Rosa damascena &bull; Grasse, Southern France
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#b6b095]/90 leading-relaxed font-light">
              Unlike artificially dyed noir blooms, the Black Baccara develops its natural crimson-black tincture through high-altitude volcanic minerals and dramatic diurnal temperature shifts. Cut at twilight to guarantee a 12-day vase life.
            </p>

            {/* Scent & Care specs */}
            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono tracking-wider text-[#ff4d56] uppercase block">
                  Olfactory Notes
                </span>
                <p className="text-xs text-white mt-1">Dark Damask, Bourbon Vanilla, Smoked Amber</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] font-mono tracking-wider text-[#d4af37] uppercase block">
                  Stem Architecture
                </span>
                <p className="text-xs text-white mt-1">24 Signature Stems in Silk Wrap</p>
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-4 border-t border-[#b6b095]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-mono font-bold text-white">
                    ${spotlightProduct.price}
                  </span>
                  <span className="text-sm font-mono text-[#b6b095]/50 line-through">
                    ${spotlightProduct.originalPrice}
                  </span>
                </div>
                <span className="text-[11px] text-[#b6b095] flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ff4d56]" />
                  Complimentary White-Glove Courier Included
                </span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => addToCart(spotlightProduct, 1, 'Signature')}
                  className="flex-1 sm:flex-none px-6 py-3.5 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg shadow-[#e3131b]/30 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Secure Harvest</span>
                </button>

                <button
                  onClick={() => toggleWishlist(spotlightProduct)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isFavorited
                      ? 'bg-[#e3131b] text-white border-[#e3131b]'
                      : 'bg-white/5 border-white/20 text-[#b6b095] hover:text-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
