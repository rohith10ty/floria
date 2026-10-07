import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles, Star } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export const SearchModal = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === ''
    ? PRODUCTS.slice(0, 4)
    : PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.species.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.scentProfile.some(s => s.toLowerCase().includes(q))
        );
      });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#b6b095]/20 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#b6b095]/15 bg-[#0f0f0f]">
          <Search className="w-5 h-5 text-[#e3131b]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rare spider lilies, velvet roses, midnight orchids..."
            className="flex-1 bg-transparent border-none outline-none text-[#f4efe6] placeholder-[#b6b095]/40 text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#b6b095]/60 hover:text-white px-2 py-1 rounded bg-white/5"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#b6b095] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-[#b6b095]/10">
          <div className="px-2 py-1.5 text-[11px] font-mono tracking-wider text-[#b6b095]/60 uppercase flex items-center justify-between">
            <span>{query.trim() === '' ? 'Curated Signatures' : `Search Results (${filteredProducts.length})`}</span>
            {query.trim() === '' && (
              <span className="flex items-center gap-1 text-[#e3131b]">
                <Sparkles className="w-3 h-3" /> Trending
              </span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-[#b6b095]/60">
              <p className="text-sm font-serif-heading text-[#b6b095]">No rare specimens matched &quot;{query}&quot;</p>
              <p className="text-xs mt-1">Try searching for &quot;Lily&quot;, &quot;Rose&quot;, &quot;Noir&quot;, or &quot;Exotic&quot;</p>
            </div>
          ) : (
            <div className="grid gap-2 pt-2">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-[#b6b095]/20"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover border border-[#b6b095]/20 group-hover:border-[#e3131b] transition-colors"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-white group-hover:text-[#e3131b] transition-colors">
                          {product.name}
                        </h4>
                        {product.badge && (
                          <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#e3131b]/15 text-[#ff4d56] border border-[#e3131b]/30">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#b6b095]/70 italic mt-0.5 font-serif-heading">
                        {product.species}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[#b6b095]/80">
                        <span className="text-white font-mono font-medium">${product.price}</span>
                        <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-[#b6b095]">
                          {product.category}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-[#d4af37]">
                          <Star className="w-3 h-3 fill-current" /> {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-1 text-xs text-[#b6b095] group-hover:text-white group-hover:translate-x-1 transition-all">
                    <span>Inspect</span>
                    <ArrowRight className="w-4 h-4 text-[#e3131b]" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 bg-[#0d0d0d] border-t border-[#b6b095]/10 text-xs text-[#b6b095]/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-black border border-white/10 font-mono text-[10px]">ESC</span>
            <span>to dismiss</span>
          </div>
          <span className="font-serif-heading italic text-[#b6b095]">Maison Floria Botanique</span>
        </div>
      </div>
    </div>
  );
};
