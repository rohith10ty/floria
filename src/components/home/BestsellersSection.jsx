import React, { useState } from 'react';
import { ProductCard } from '../shop/ProductCard';
import { PRODUCTS } from '../../data/products';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BestsellersSection = ({
  onQuickView,
  onSelectProduct,
  onNavigateToShop,
}) => {
  const [filter, setFilter] = useState('all');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (filter === 'rare') return p.rare;
    if (filter === 'roses') return p.category === 'Roses' || p.category === 'Bouquets';
    if (filter === 'exotics') return p.category === 'Exotic' || p.category === 'Lilies';
    return true;
  }).slice(0, 6);

  return (
    <section id="harvests-treasury" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#b6b095]/15 scroll-mt-20">
      {/* Header with Filter Pills */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#e3131b] uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Highly Coveted Allocations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-white mt-1">
            FEATURED HARVESTS
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 p-1 bg-black/60 rounded-xl border border-white/10">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === 'all'
                ? 'bg-[#e3131b] text-white shadow-md'
                : 'text-[#b6b095] hover:text-white'
            }`}
          >
            All Harvests
          </button>
          <button
            onClick={() => setFilter('rare')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === 'rare'
                ? 'bg-[#e3131b] text-white shadow-md'
                : 'text-[#b6b095] hover:text-white'
            }`}
          >
            Rare &amp; Limited
          </button>
          <button
            onClick={() => setFilter('roses')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === 'roses'
                ? 'bg-[#e3131b] text-white shadow-md'
                : 'text-[#b6b095] hover:text-white'
            }`}
          >
            Velvet Roses &amp; Peonies
          </button>
          <button
            onClick={() => setFilter('exotics')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === 'exotics'
                ? 'bg-[#e3131b] text-white shadow-md'
                : 'text-[#b6b095] hover:text-white'
            }`}
          >
            Spider Lilies &amp; Orchids
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>

      {/* Catalog CTA */}
      <div className="mt-14 text-center">
        <button
          onClick={onNavigateToShop}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-widest border border-[#b6b095]/25 hover:border-[#ff4d56] transition-all group"
        >
          <span>Explore Entire Catalog ({PRODUCTS.length} Varieties)</span>
          <ArrowRight className="w-4 h-4 text-[#e3131b] group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
