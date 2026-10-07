import React from 'react';
import LycorisSpecimen from '../components/ui/lycoris-specimen';
import { ArrowLeft, Sparkles, ShoppingBag, Eye } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export const SpecimenPage = ({
  onNavigateBack,
  onSelectProduct,
}) => {
  const { addToCart } = useCart();
  const spiderLily = PRODUCTS.find((p) => p.id === 'lycoris-radiata-noir') || PRODUCTS[0];

  return (
    <div className="space-y-8 min-h-screen pb-16">
      {/* Top Banner Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between">
        <button
          onClick={onNavigateBack}
          className="inline-flex items-center gap-1.5 text-xs text-[#b6b095] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#e3131b]" />
          <span>Return Home</span>
        </button>

        <span className="text-xs font-mono uppercase tracking-widest text-[#ff4d56] flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" /> Raw WebGL Procedural Chrome Lily
        </span>
      </div>

      {/* Main Specimen Component */}
      <div className="w-full">
        <LycorisSpecimen
          name="LYCORIS"
          studio="Maison de Floria"
          year="2026"
          crimson="#e3131b"
          bone="#b6b095"
          ink="#050505"
          height="100svh"
        />
      </div>

      {/* Bottom Purchase Bar */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-[#e3131b]/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={spiderLily.images[0]}
              alt=""
              className="w-16 h-16 rounded-xl object-cover border border-[#e3131b]/50"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-[#ff4d56] bg-[#e3131b]/15 px-2 py-0.5 rounded border border-[#e3131b]/30">
                  Featured Harvest
                </span>
                <span className="text-xs font-mono text-[#d4af37]">Kyoto Highlands</span>
              </div>
              <h3 className="text-base font-semibold text-white font-serif-heading mt-0.5">
                {spiderLily.name}
              </h3>
              <p className="text-xs text-[#b6b095]">
                18 Stems • ${spiderLily.price} • Next-Day Courier Delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onSelectProduct(spiderLily)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect</span>
            </button>

            <button
              onClick={() => addToCart(spiderLily, 1, 'Signature')}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg shadow-[#e3131b]/30 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Acquire Harvest (${spiderLily.price})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
