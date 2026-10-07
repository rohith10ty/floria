import React from 'react';
import LycorisSpecimen from '../ui/lycoris-specimen';
import { Sparkles, ShoppingBag, Eye, Award } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';

export const SpecimenShowcaseSection = ({ onSelectProduct }) => {
  const { addToCart } = useCart();
  const spiderLilyProduct = PRODUCTS.find((p) => p.id === 'lycoris-radiata-noir') || PRODUCTS[0];

  return (
    <section className="relative w-full bg-[#050505] border-y border-[#b6b095]/15 py-12 overflow-hidden">
      {/* Editorial Title Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e3131b]/15 border border-[#e3131b]/30 text-[#ff4d56] text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" /> Living 3D Procedural Anatomy
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-white">
          THE LYCORIS TYPE &amp; SPECIMEN
        </h2>
        <p className="text-xs sm:text-sm text-[#b6b095] max-w-xl mx-auto font-light">
          Scroll down through the six stages to scrub the camera timeline, inspect procedural chrome curves, and explore the Art Nouveau typography.
        </p>
      </div>

      {/* Embedded 3D Lycoris Specimen Canvas Container */}
      <div className="w-full relative shadow-2xl rounded-3xl overflow-hidden border border-[#b6b095]/20 max-w-7xl mx-auto">
        <LycorisSpecimen
          name="FLORIA"
          studio="Maison de Floria"
          year="2026"
          description="A living botanical specimen and vintage display font inspired by the recurved recurvature of Lycoris radiata."
          fontFamily='"Federant", "Cinzel", Georgia, serif'
          crimson="#e3131b"
          bone="#b6b095"
          ink="#070707"
          height="85svh"
        />
      </div>

      {/* Floating Action Strip for the Spider Lily Product */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="p-4 sm:p-6 rounded-2xl bg-[#0c0c0c] border border-[#e3131b]/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-left">
            <img
              src={spiderLilyProduct.images?.[0]}
              alt={spiderLilyProduct.name}
              className="w-16 h-16 rounded-xl object-cover border border-[#e3131b]/50"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4d56] bg-[#e3131b]/15 px-2 py-0.5 rounded border border-[#e3131b]/30">
                  Living Specimen
                </span>
                <span className="text-xs font-mono text-[#d4af37] flex items-center gap-1">
                  <Award className="w-3 h-3" /> Kyoto Sovereign
                </span>
              </div>
              <h3 className="text-base font-semibold text-white font-serif-heading mt-0.5">
                {spiderLilyProduct.name}
              </h3>
              <p className="text-xs text-[#b6b095]">
                18 Sovereign Stems • ${spiderLilyProduct.price} • Cold Courier Delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onSelectProduct(spiderLilyProduct)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors border border-white/20 flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect</span>
            </button>

            <button
              onClick={() => addToCart(spiderLilyProduct, 1, 'Signature')}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg shadow-[#e3131b]/30 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order Harvest (${spiderLilyProduct.price})</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
