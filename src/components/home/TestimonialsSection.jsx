import React from 'react';
import { Star, Sparkles, Quote, ShieldCheck } from 'lucide-react';

export const TestimonialsSection = () => {
  const pressQuotes = [
    {
      source: 'VOGUE LIVING',
      quote: 'Maison Floria has elevated floral arrangement to haute horlogerie. The Lycoris Spider Lily is a living masterwork.',
      author: 'Editorial Review',
    },
    {
      source: 'ARCHITECTURAL DIGEST',
      quote: 'The dark monochrome floral palette redefines luxury interiors. Their cold-courier delivery sets an untouchable standard.',
      author: 'Design Column',
    },
    {
      source: 'HARPER’S BAZAAR',
      quote: 'Uncompromising rarity. Each crimson stem is an unforgettable sensory statement.',
      author: 'Haute Living Edition',
    },
  ];

  const patronReviews = [
    {
      name: 'Lady Genevieve M.',
      location: 'Place Vendôme, Paris',
      text: 'The Black Baccara roses arrived in immaculate velvet-lined packaging. Ten days later, they remain as radiant as dawn in Grasse.',
      rating: 5,
      item: 'Black Baccara Velvet Roses',
    },
    {
      name: 'Julian Thorne',
      location: 'Tribeca, New York',
      text: 'The 3D procedural spider lily on the site drew me in, but the physical stems in the obsidian vase exceeded all expectations.',
      rating: 5,
      item: 'Lycoris Radiata Noir',
    },
    {
      name: 'Sora Takahashi',
      location: 'Ginza, Tokyo',
      text: 'Flawless stem architecture. The Imperial Peonies bloomed majestically over 72 hours. True botanical poetry.',
      rating: 5,
      item: 'Imperial Crimson Peony',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#b6b095]/15">
      {/* Press Banner */}
      <div className="text-center space-y-2 mb-12">
        <span className="text-xs font-mono tracking-widest text-[#e3131b] uppercase flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Critical Acclaim
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-white">
          THE CRITICS &amp; COLLECTORS
        </h2>
      </div>

      {/* Press Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {pressQuotes.map((item, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-[#b6b095]/20 flex flex-col justify-between space-y-4 hover:border-[#e3131b]/40 transition-colors"
          >
            <Quote className="w-8 h-8 text-[#e3131b]/40" />
            <p className="text-xs sm:text-sm text-[#f4efe6] font-serif-heading italic leading-relaxed">
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="pt-3 border-t border-white/10">
              <span className="font-display tracking-widest text-xs text-white block">
                {item.source}
              </span>
              <span className="text-[10px] text-[#b6b095]/60 uppercase tracking-wider font-mono">
                {item.author}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Patron Reviews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {patronReviews.map((rev, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#080808] border border-[#b6b095]/15 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white">{rev.name}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff4d56]" />
              </div>
              <span className="text-[10px] text-[#b6b095]/60">{rev.location}</span>
            </div>

            <div className="flex items-center text-[#d4af37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>

            <p className="text-xs text-[#b6b095] leading-relaxed">
              &ldquo;{rev.text}&rdquo;
            </p>

            <p className="text-[10px] text-[#ff4d56] font-mono tracking-wider pt-2 border-t border-white/5 uppercase">
              Harvest: {rev.item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
