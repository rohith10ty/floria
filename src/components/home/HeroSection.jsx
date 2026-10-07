import React from 'react';
import LycorisSpecimen from '../ui/lycoris-specimen';
import { ArrowDown, ShoppingBag, Sparkles } from 'lucide-react';

export const HeroSection = ({
  onExploreCatalog,
  onExploreSpecimen,
}) => {
  return (
    <section className="relative w-full bg-[#050505] overflow-hidden">
      {/* Interactive Procedural 3D WebGL Red Spider Lily Hero */}
      <div className="relative w-full">
        <LycorisSpecimen
          name="LYCORIS"
          studio="Maison de Floria"
          year="2026"
          description="Haute floral atelier specializing in sculptural Spider Lilies, velvet crimson roses, and rare nocturnal flora. Ethically harvested in Kyoto and dispatched in temperature-sealed chambers."
          specs={[
            "12 Rare Stems",
            "7-Day Freshness Guarantee",
            "White-Glove Courier",
            "Cold Chain Hydration"
          ]}
          tagline={[
            { text: "Twilight Harvest" },
            { text: "Japanese Spider Lily", small: true },
            { text: "Kyoto Highlands" }
          ]}
          multilingual="Tokyo · Kyoto · Paris · Grasse · New York · London"
          ligatureWord="Floria"
          crimson="#e3131b"
          bone="#b6b095"
          ink="#050505"
          height="100svh"
          links={[
            { label: "EXPLORE HARVESTS ↓", href: "#harvests-treasury" },
            { label: "MAISON PROVENANCE", href: "#provenance" }
          ]}
        />
      </div>

      {/* Floating Bottom Quick Action Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 -mt-10 relative z-20">
        <div className="p-4 sm:p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-[#b6b095]/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e3131b]/20 border border-[#e3131b]/40 flex items-center justify-center text-[#ff4d56]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white font-serif-heading">
                Autumn 2026 Living Flora Treasury
              </h4>
              <p className="text-[11px] text-[#b6b095]">
                Rare Japanese Red Spider Lilies &amp; Luxury Crimson Bouquets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="#harvests-treasury"
              className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg shadow-[#e3131b]/30 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Browse Flower Treasury</span>
            </a>

            <button
              onClick={onExploreCatalog}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Full Catalog</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#ff4d56]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
