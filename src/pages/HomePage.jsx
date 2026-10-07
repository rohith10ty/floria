import React, { useState } from 'react';
import LycorisSpecimen from '../components/ui/lycoris-specimen';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/shop/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Award, 
  Filter, 
  SlidersHorizontal,
  ChevronDown,
  Eye
} from 'lucide-react';

export const HomePage = ({
  onNavigate,
  onQuickView,
  onSelectProduct,
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeCategory, setActiveCategory] = useState('All');
  const [priceSort, setPriceSort] = useState('default');
  const [filterRareOnly, setFilterRareOnly] = useState(false);

  const categories = [
    { id: 'All', label: 'All Curations' },
    { id: 'Exotic', label: 'Spider Lilies & Exotics' },
    { id: 'Roses', label: 'Velvet Damask Roses' },
    { id: 'Lilies', label: 'Midnight Callas' },
    { id: 'Bouquets', label: 'Imperial Bouquets' },
    { id: 'Preserved', label: 'Preserved Solitaires' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    if (filterRareOnly && !p.rare) return false;
    return true;
  }).sort((a, b) => {
    if (priceSort === 'low-high') return a.price - b.price;
    if (priceSort === 'high-low') return b.price - a.price;
    if (priceSort === 'rating') return b.rating - a.rating;
    return 0;
  });

  const featuredSpiderLily = PRODUCTS.find((p) => p.id === 'lycoris-radiata-noir') || PRODUCTS[0];

  return (
    <div className="w-full bg-[#050505] text-[#f4efe6]">
      {/* 1. Flagship 3D WebGL Red Spider Lily Hero Section */}
      <LycorisSpecimen
          name="FLORIA"
          studio="Maison de Floria"
          year="2026"
          description="Haute floral house specializing in sculptural Spider Lilies, velvet crimson roses, and rare nocturnal flora. Ethically harvested in Kyoto and dispatched in temperature-sealed chambers."
          specs={[
            "12–36 Rare Stems",
            "7-Day Freshness Guarantee",
            "White-Glove Courier",
            "Cold Chain Hydration"
          ]}
          tagline={[
            { text: "Twilight Harvest" },
            { text: "Japanese Spider Lily", small: true },
            { text: "Kyoto Highlands" }
          ]}
          crimson="#e3131b"
          bone="#b6b095"
          ink="#050505"
          height="100svh"
          sceneScroll={0.8}
          links={[
            { label: "SCROLL TO BOTANICAL CATALOG ↓", href: "#botanical-catalog" },
            { label: "KYOTO HARVEST MANIFESTO", href: "#harvest-manifesto" }
          ]}
        />

      {/* 2. Category Highlights Carousel */}
      <section id="categories" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#b6b095]/15">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#e3131b] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Curated Taxonomies
            </span>
            <h2 className="text-2xl sm:text-4xl font-display text-white mt-1">
              FLORAL SPECIES &amp; CATEGORIES
            </h2>
          </div>
          <p className="text-xs text-[#b6b095] max-w-xs font-mono">
            Hand-selected rare blooms cultivated in volcanic soils across Kyoto and Grasse.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { id: 'Exotic', name: 'Spider Lilies', count: '3 Stems', img: '/images/products/spider-lily.jpg' },
            { id: 'Roses', name: 'Velvet Roses', count: '4 Varieties', img: '/images/products/black-baccara-rose.jpg' },
            { id: 'Lilies', name: 'Midnight Callas', count: '2 Varieties', img: '/images/products/midnight-calla.jpg' },
            { id: 'Bouquets', name: 'Imperial Stems', count: '5 Curations', img: '/images/products/crimson-peony.jpg' },
            { id: 'Preserved', name: 'Eternal Cloches', count: '2 Designs', img: '/images/products/preserved-rose-dome.jpg' },
            { id: 'All', name: 'Full Treasury', count: '8 Total', img: '/images/products/monochrome-bouquet.jpg' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                const el = document.getElementById('botanical-catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`group relative rounded-2xl overflow-hidden aspect-[4/5] p-3 flex flex-col justify-end text-left border transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'border-[#e3131b] ring-2 ring-[#e3131b]/30'
                  : 'border-[#b6b095]/20 hover:border-[#ff4d56]'
              }`}
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="relative z-10">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#ff4d56] block">
                  {cat.count}
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-white font-serif-heading">
                  {cat.name}
                </h4>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Main Botanical Catalog / Product Listing Grid */}
      <section id="botanical-catalog" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#b6b095]/15 scroll-mt-24">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#b6b095]/15">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#e3131b] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Direct From Harvest
            </span>
            <h2 className="text-3xl sm:text-5xl font-display text-white mt-1">
              THE LIVING FLORA TREASURY
            </h2>
          </div>

          {/* Filtering & Sorting Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded-xl border border-white/10 overflow-x-auto">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                    activeCategory === c.id
                      ? 'bg-[#e3131b] text-white shadow-md'
                      : 'text-[#b6b095] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Rare Harvest Toggle */}
            <button
              onClick={() => setFilterRareOnly((prev) => !prev)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider border transition-all ${
                filterRareOnly
                  ? 'bg-[#e3131b]/20 text-[#ff4d56] border-[#e3131b]'
                  : 'bg-black/50 text-[#b6b095] border-white/10 hover:border-white/20'
              }`}
            >
              ★ Rare Only
            </button>

            {/* Price Sort Dropdown */}
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-black/70 border border-white/10 text-xs font-mono text-[#b6b095] focus:outline-none focus:border-[#e3131b]"
            >
              <option value="default">Sort: Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center space-y-3">
            <p className="text-base text-white font-serif-heading">No botanical specimens found in this filter.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setFilterRareOnly(false);
              }}
              className="px-5 py-2 rounded-xl bg-[#e3131b] text-white text-xs font-mono uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 4. Rare Harvest Spotlight — Spider Lily Specimen */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#b6b095]/15">
        <div className="relative rounded-3xl bg-[#090909] border border-[#b6b095]/20 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Image Column */}
            <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-[#b6b095]/30">
              <img
                src={featuredSpiderLily.images[0]}
                alt={featuredSpiderLily.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-[#e3131b] text-white text-[10px] font-mono uppercase font-bold tracking-widest">
                Iconic Living Specimen
              </span>
            </div>

            {/* Details Column */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#ff4d56] uppercase block">
                  Kyoto Highlands Single-Origin Harvest
                </span>
                <h3 className="text-3xl sm:text-4xl font-display text-white mt-1">
                  {featuredSpiderLily.name}
                </h3>
                <p className="text-xs text-[#b6b095]/80 italic font-serif-heading">
                  {featuredSpiderLily.species}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#b6b095] leading-relaxed font-light">
                {featuredSpiderLily.description} Each stem is hand-cut at twilight when hydration pressure is optimal, providing dramatic recurved petals that maintain sculptural poise for up to 14 days.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-[#b6b095]/60 block uppercase">Vase Life</span>
                  <span className="text-white font-semibold">10–14 Days</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-[#b6b095]/60 block uppercase">Dispatch</span>
                  <span className="text-white font-semibold">Cold Chain 4°C</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#b6b095]/60 block uppercase">Pricing</span>
                  <span className="text-[#ff4d56] font-semibold">${featuredSpiderLily.price} / 18 Stems</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => addToCart(featuredSpiderLily, 1, 'Signature')}
                  className="px-6 py-3.5 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xl shadow-[#e3131b]/30 flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire Harvest (${featuredSpiderLily.price})</span>
                </button>

                <button
                  onClick={() => onQuickView(featuredSpiderLily)}
                  className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Quick Inspect</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Master Botanist Provenance & Service Guarantees */}
      <section id="harvest-manifesto" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#b6b095]/15">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#090909] border border-[#b6b095]/15 space-y-3">
            <Clock className="w-6 h-6 text-[#ff4d56]" />
            <h4 className="text-base font-semibold text-white font-serif-heading">Twilight Cut Protocol</h4>
            <p className="text-xs text-[#b6b095]/80 leading-relaxed font-light">
              Stems are cut between 04:00 and 06:00 to maximize cellular water pressure, then immersed in 4°C nutrient solutions within 20 minutes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#090909] border border-[#b6b095]/15 space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#ff4d56]" />
            <h4 className="text-base font-semibold text-white font-serif-heading">7-Day Freshness Pledged</h4>
            <p className="text-xs text-[#b6b095]/80 leading-relaxed font-light">
              Every arrangement is guaranteed to maintain vibrant turgor and scent for at least 7 full days, backed by our replacement harvest policy.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#090909] border border-[#b6b095]/15 space-y-3">
            <Award className="w-6 h-6 text-[#ff4d56]" />
            <h4 className="text-base font-semibold text-white font-serif-heading">French Spiral Bound</h4>
            <p className="text-xs text-[#b6b095]/80 leading-relaxed font-light">
              Master florists hand-tie each bouquet in ergonomic spirals, dressed in breathable archival tissue and custom gold foil cards.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Curated Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#b6b095]/15 text-xs text-[#b6b095] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-display tracking-wider text-white text-base">FLORIA</span>
          <span>© 2026 Maison de Floria Atelier. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6 font-mono text-[11px]">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">
            ↑ Back to 3D Specimen
          </button>
          <span>Kyoto · Grasse · New York</span>
        </div>
      </footer>

    </div>
  );
};
