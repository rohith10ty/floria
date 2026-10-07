import React from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';

export const StoryPage = ({
  onNavigateBack,
  onNavigateToShop,
}) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16 min-h-screen">
      
      {/* Back button */}
      <button
        onClick={onNavigateBack}
        className="inline-flex items-center gap-1.5 text-xs text-[#b6b095] hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-[#e3131b]" />
        <span>Return Home</span>
      </button>

      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-[#e3131b] flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> The Maison Manifesto
        </span>
        <h1 className="text-4xl sm:text-6xl font-display text-white">
          WHERE BOTANY MEETS SCULPTURAL POETRY
        </h1>
        <p className="text-sm sm:text-base text-[#b6b095] font-light leading-relaxed">
          Founded on the conviction that flowers are fleeting sculptures of transcendent vitality, Maison de Floria curates the rare, the dark, and the unforgettable bloom.
        </p>
      </div>

      {/* Atmospheric Image */}
      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-[#b6b095]/20 shadow-2xl">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/Lycoris_radiata_Higanbana_in_a_woods.jpg"
          alt="Kyoto Highlands Spider Lilies"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        <div className="absolute bottom-6 left-6 right-6 text-xs text-white/90 font-serif-heading italic">
          Twilight harvest in the terraced slopes of Kyoto Highlands.
        </div>
      </div>

      {/* Editorial Content Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-xs sm:text-sm text-[#b6b095] leading-relaxed font-light">
        <div className="space-y-4">
          <h2 className="text-xl font-display text-white">
            THE OBSESSION WITH THE SPIDER LILY
          </h2>
          <p>
            The Red Spider Lily (<em>Lycoris radiata</em>) represents the pinnacle of botanical geometry. Its six recurved tepals sweep backward like fiery banners, while its elongated stamens arch skyward like delicate fountain arcs.
          </p>
          <p>
            Revered in folklore as the flower of passionate yearning, each bulb sleeps in volcanic earth for eleven months before blooming with explosive crimson intensity for a singular, breathtaking fortnight.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-display text-white">
            SOVEREIGN HARVESTING PROTOCOLS
          </h2>
          <p>
            Our master botanists cut each stem exclusively between 04:00 and 06:00, when cellular water pressure is at its zenith. Stems are immediately plunged into mineral hydration baths calibrated to 4°C.
          </p>
          <p>
            Every bouquet is bound by hand using French spiral binding, wrapped in breathable archival tissue, and transported in temperature-sealed chambers to your console table.
          </p>
        </div>
      </div>

      {/* Core Values 3-Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#b6b095]/15">
        <div className="p-6 rounded-2xl bg-[#090909] border border-[#b6b095]/15 space-y-3">
          <ShieldCheck className="w-6 h-6 text-[#ff4d56]" />
          <h3 className="text-base font-semibold text-white font-serif-heading">Zero Chemical Dyes</h3>
          <p className="text-xs text-[#b6b095]/70">
            Every noir, velvet burgundy, and deep scarlet shade is 100% naturally derived from heritage soil minerals.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#090909] border border-[#b6b095]/15 space-y-3">
          <Heart className="w-6 h-6 text-[#ff4d56]" />
          <h3 className="text-base font-semibold text-white font-serif-heading">Artisan Florists</h3>
          <p className="text-xs text-[#b6b095]/70">
            Each arrangement is individually signed and certified by a Master Floral Designer with care instructions.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#090909] border border-[#b6b095]/15 space-y-3">
          <Award className="w-6 h-6 text-[#ff4d56]" />
          <h3 className="text-base font-semibold text-white font-serif-heading">Ethical Sanctuaries</h3>
          <p className="text-xs text-[#b6b095]/70">
            Our boutique micro-farms in Kyoto, Grasse, and San Remo operate under regenerative organic certifications.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-8">
        <button
          onClick={onNavigateToShop}
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xl shadow-[#e3131b]/30"
        >
          <span>Explore The 2026 Collection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
