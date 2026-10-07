import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/shop/ProductCard';
import { PRODUCTS } from '../data/products';
import { 
  Filter, 
  Sparkles, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown, 
  Search,
  LayoutGrid,
  Grid3X3
} from 'lucide-react';

export const ShopPage = ({
  initialCategory = 'All',
  onQuickView,
  onSelectProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(300);
  const [onlyRare, setOnlyRare] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [columns, setColumns] = useState(3);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = [
    'All',
    'Exotic',
    'Roses',
    'Lilies',
    'Botanicals',
    'Bouquets',
    'Preserved',
  ];

  const occasions = [
    'All',
    'Romance & Passion',
    'Grand Gala & Prestige',
    'Noir Elegance',
    'Sympathy & Solace',
    'Anniversary & Milestones',
    'Bespoke Curations',
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          product.name.toLowerCase().includes(q) ||
          product.species.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.scentProfile?.some(s => s.toLowerCase().includes(q));
        if (!matches) return false;
      }
      if (product.price > maxPrice) {
        return false;
      }
      if (onlyRare && !product.rare) {
        return false;
      }
      if (selectedOccasion !== 'All' && !product.occasions?.includes(selectedOccasion)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'stems') return b.stemCount - a.stemCount;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, maxPrice, onlyRare, selectedOccasion, sortBy]);

  const hasActiveFilters = 
    selectedCategory !== 'All' || 
    selectedOccasion !== 'All' || 
    maxPrice < 300 || 
    onlyRare || 
    searchQuery !== '';

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedOccasion('All');
    setMaxPrice(300);
    setOnlyRare(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      
      {/* Header Banner */}
      <div className="border-b border-[#b6b095]/15 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e3131b]/15 border border-[#e3131b]/30 text-[#ff4d56] text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3 h-3" /> Complete Botanical Treasury
        </div>
        <h1 className="text-3xl sm:text-5xl font-display text-white">
          THE CATALOG &amp; VARIETIES
        </h1>
        <p className="text-xs sm:text-sm text-[#b6b095] max-w-2xl font-light">
          Filter by botanical taxonomy, rare harvest status, or curated sentiment. Each order is prepared by our master florists and cold-couriered at peak hydration.
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#090909] border border-[#b6b095]/15">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#b6b095]/50 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter catalog by name, species or scent..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#b6b095]/40 text-xs focus:outline-none focus:border-[#e3131b]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-[#b6b095]/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & View Options */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          
          {/* Mobile filter button */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-[#f4efe6]"
          >
            <Filter className="w-3.5 h-3.5 text-[#e3131b]" />
            <span>Filters {hasActiveFilters && '(Active)'}</span>
          </button>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#b6b095] hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-black border border-[#b6b095]/20 text-xs text-[#f4efe6] focus:outline-none focus:border-[#e3131b]"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Collector Rating</option>
              <option value="stems">Stem Volume</option>
            </select>
          </div>

          {/* Column grid switcher (desktop) */}
          <div className="hidden sm:flex items-center border border-white/10 rounded-xl bg-black p-1">
            <button
              onClick={() => setColumns(3)}
              className={`p-1.5 rounded-lg ${columns === 3 ? 'bg-white/10 text-white' : 'text-[#b6b095]/60'}`}
              aria-label="3 columns"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setColumns(4)}
              className={`p-1.5 rounded-lg ${columns === 4 ? 'bg-white/10 text-white' : 'text-[#b6b095]/60'}`}
              aria-label="4 columns"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Filters (Desktop Sticky) */}
        <div className={`lg:col-span-3 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto space-y-6 bg-[#080808] p-5 rounded-2xl border border-[#b6b095]/15 shadow-2xl backdrop-blur-md ${
          mobileFiltersOpen ? 'block' : 'hidden lg:block'
        }`}>
          
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#e3131b]" />
              Refine Treasury
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-[#ff4d56] hover:underline"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#b6b095]/70 block">
              Botanical Family
            </span>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors text-left ${
                    selectedCategory === cat
                      ? 'bg-[#e3131b]/15 text-white font-medium border border-[#e3131b]/40'
                      : 'text-[#b6b095] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{cat === 'All' ? 'All Botanical Families' : cat}</span>
                  <span className="text-[10px] font-mono text-[#b6b095]/50">
                    {cat === 'All' 
                      ? PRODUCTS.length 
                      : PRODUCTS.filter(p => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#b6b095]/70">
                Max Price Ceiling
              </span>
              <span className="font-mono text-white font-semibold">${maxPrice}</span>
            </div>
            <input
              type="range"
              min={120}
              max={300}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#e3131b] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#b6b095]/50 font-mono">
              <span>$120</span>
              <span>$300+</span>
            </div>
          </div>

          {/* Occasion Filter */}
          <div className="space-y-2 pt-3 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#b6b095]/70 block">
              Curated Mood &amp; Occasion
            </span>
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-black border border-[#b6b095]/20 text-xs text-white focus:outline-none focus:border-[#e3131b]"
            >
              {occasions.map((occ) => (
                <option key={occ} value={occ}>
                  {occ}
                </option>
              ))}
            </select>
          </div>

          {/* Rare Only Toggle */}
          <div className="pt-3 border-t border-white/10">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs text-white">Rare Allocations Only</span>
              <input
                type="checkbox"
                checked={onlyRare}
                onChange={(e) => setOnlyRare(e.target.checked)}
                className="w-4 h-4 accent-[#e3131b] rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Right Products Grid */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Active filter pills */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#b6b095]/60 text-[11px]">Active Filters:</span>
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#e3131b]/15 border border-[#e3131b]/30 text-white text-[11px]">
                  {selectedCategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('All')} />
                </span>
              )}
              {selectedOccasion !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-white text-[11px]">
                  {selectedOccasion}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedOccasion('All')} />
                </span>
              )}
              {onlyRare && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#e3131b]/15 border border-[#e3131b]/30 text-white text-[11px]">
                  Rare Only
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setOnlyRare(false)} />
                </span>
              )}
              {maxPrice < 300 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-white text-[11px]">
                  Under ${maxPrice}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setMaxPrice(300)} />
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-[#ff4d56] hover:underline ml-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between text-xs text-[#b6b095]/70 font-mono">
            <span>Showing {filteredProducts.length} sovereign floral varieties</span>
            <span>Harvested in Kyoto, Grasse &amp; San Remo</span>
          </div>

          {/* Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center rounded-2xl bg-[#080808] border border-[#b6b095]/15 space-y-4">
              <p className="text-base font-serif-heading text-white">No botanical specimens matched your criteria</p>
              <p className="text-xs text-[#b6b095]/70 max-w-sm mx-auto">
                Adjust your category, occasion, or price parameters to reveal available harvests.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${
              columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            } gap-6`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
