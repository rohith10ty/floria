import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoriesSection = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'Exotic',
      title: 'Spider Lily & Exotics',
      subtitle: 'Lycoris Radiata & Mist Highlands Orchids',
      image: '/images/products/spider-lily.jpg',
      stems: '12–36 Stems',
      tag: 'Signature Specimen',
    },
    {
      id: 'Roses',
      title: 'Black Baccara Roses',
      subtitle: 'Velvet Noir & Deep Burgundy Damask',
      image: '/images/products/black-baccara-rose.jpg',
      stems: '12–48 Stems',
      tag: 'Grasse Harvest',
    },
    {
      id: 'Lilies',
      title: 'Midnight Callas & Amaryllis',
      subtitle: 'Architectural Spathes & Scarlet Trumpets',
      image: '/images/products/midnight-calla.jpg',
      stems: '10–32 Stems',
      tag: 'Sculptural',
    },
    {
      id: 'Bouquets',
      title: 'Imperial Master Bouquets',
      subtitle: 'Layered Ranunculus & Hand-Tied French Spiral',
      image: '/images/products/monochrome-bouquet.jpg',
      stems: '18–60 Stems',
      tag: 'Master Florist',
    },
    {
      id: 'Botanicals',
      title: 'Wild Thorns & Foliage',
      subtitle: 'Smokebush, Metallic Sea Holly & Dark Eucalyptus',
      image: '/images/products/dark-botanicals.jpg',
      stems: '14–44 Stems',
      tag: 'Everlasting Dry',
    },
    {
      id: 'Preserved',
      title: 'Eternal Borosilicate Cloches',
      subtitle: '3+ Year Preserved Sovereign Solitaires',
      image: '/images/products/preserved-rose-dome.jpg',
      stems: 'Museum Display',
      tag: 'Zero Water Needed',
    },
  ];

  return (
    <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#e3131b] uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Curated Taxonomy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-white mt-1">
            BOTANICAL CATEGORIES
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#b6b095] max-w-md font-light">
          Each variety is cultivated in isolated microclimates and assembled under rigorous temperature control.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group relative h-96 rounded-2xl overflow-hidden border border-[#b6b095]/15 hover:border-[#e3131b]/50 transition-all duration-500 cursor-pointer shadow-xl"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

            {/* Top Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/20 text-[#f4efe6] text-[10px] font-mono uppercase tracking-wider backdrop-blur-md">
                {cat.tag}
              </span>
            </div>

            {/* Content Bottom */}
            <div className="absolute inset-x-4 bottom-4 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 group-hover:border-[#e3131b]/40 transition-all">
              <div className="flex items-center justify-between text-[11px] text-[#b6b095]/70 font-mono mb-1">
                <span>{cat.stems}</span>
                <span className="text-[#ff4d56] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white font-serif-heading group-hover:text-[#ff4d56] transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-[#b6b095]/80 mt-1 line-clamp-1">
                {cat.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
