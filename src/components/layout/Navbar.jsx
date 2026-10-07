import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  LogOut,
  Sparkles,
  Layers,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({
  onNavigate,
  currentPage,
  onOpenSearch,
}) => {
  const { totalItemsCount, subtotal, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const { user, isAuthenticated, logout, setIsAuthModalOpen } = useAuth();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-[#b6b095]/15 py-3 shadow-2xl'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Minimal Monogram / Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 group text-left"
        >
          <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 40 40" aria-hidden className="transition-transform duration-500 group-hover:rotate-90">
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <path
                  key={a}
                  d="M20 20 C 22 12, 30 8, 33 12 C 35 15, 31 17, 29 14"
                  fill="none"
                  stroke="#b6b095"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  transform={`rotate(${a} 20 20)`}
                />
              ))}
              <circle cx="20" cy="20" r="2.8" fill="#e3131b" />
            </svg>
          </div>

          <span className="font-display text-lg sm:text-xl tracking-widest text-white group-hover:text-[#ff4d56] transition-colors">
            FLORIA
          </span>
        </button>

        {/* Center: Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-[11px] font-mono tracking-[0.2em] uppercase">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors ${
              currentPage === 'home'
                ? 'text-[#ff4d56]'
                : 'text-[#b6b095]/70 hover:text-white'
            }`}
          >
            Living Spider Lily
          </button>
          
          <button
            onClick={() => onNavigate('shop')}
            className={`transition-colors ${
              currentPage === 'shop'
                ? 'text-[#ff4d56]'
                : 'text-[#b6b095]/70 hover:text-white'
            }`}
          >
            Treasury
          </button>

          <button
            onClick={() => onNavigate('story')}
            className={`transition-colors ${
              currentPage === 'story'
                ? 'text-[#ff4d56]'
                : 'text-[#b6b095]/70 hover:text-white'
            }`}
          >
            Manifesto
          </button>
        </nav>

        {/* Right: Minimalist Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-lg text-[#b6b095] hover:text-white hover:bg-white/5 transition-colors"
            title="Search Catalog (⌘K)"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Curated Desires / Wishlist */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 rounded-lg text-[#b6b095] hover:text-[#ff4d56] hover:bg-white/5 transition-colors"
            title="Preserved Desires"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#e3131b] ring-2 ring-[#050505]" />
            )}
          </button>

          {/* Harvest Basket / Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
            title="Harvest Basket"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#ff4d56]" />
            <span className="text-[11px] font-mono">{totalItemsCount}</span>
          </button>

          {/* Account Profile */}
          <div className="relative">
            {isAuthenticated ? (
              <div>
                <button
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#e3131b]/20 border border-[#e3131b]/40 text-[#ff4d56] text-xs font-mono font-bold uppercase"
                >
                  {user?.name?.charAt(0) || 'P'}
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#0a0a0a] border border-[#b6b095]/20 shadow-2xl py-1 text-xs z-50 animate-in fade-in zoom-in-95 duration-150 font-mono">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onNavigate('account');
                      }}
                      className="w-full text-left px-3.5 py-2 text-white hover:bg-white/5 flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-[#e3131b]" />
                      <span>Allocations</span>
                    </button>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3.5 py-2 text-[#ff4d56] hover:bg-white/5 flex items-center gap-2 border-t border-white/5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="p-2 rounded-lg text-[#b6b095] hover:text-white hover:bg-white/5 transition-colors"
                title="Patron Sign In"
              >
                <User className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#b6b095] hover:text-white hover:bg-white/5 transition-colors ml-1"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#e3131b]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer / Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#070707]/95 backdrop-blur-2xl border-b border-[#b6b095]/20 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="px-6 py-6 space-y-4 max-w-lg mx-auto">
            
            <div className="flex flex-col space-y-2 font-mono text-xs uppercase tracking-[0.2em]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('home');
                }}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  currentPage === 'home'
                    ? 'bg-[#e3131b]/15 text-[#ff4d56] border border-[#e3131b]/30'
                    : 'text-[#b6b095] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Living Spider Lily</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('shop');
                }}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  currentPage === 'shop'
                    ? 'bg-[#e3131b]/15 text-[#ff4d56] border border-[#e3131b]/30'
                    : 'text-[#b6b095] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Treasury</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('story');
                }}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  currentPage === 'story'
                    ? 'bg-[#e3131b]/15 text-[#ff4d56] border border-[#e3131b]/30'
                    : 'text-[#b6b095] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Manifesto</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="flex items-center gap-2 text-[#b6b095] hover:text-white"
              >
                <Search className="w-4 h-4 text-[#ff4d56]" />
                <span>Search Catalog</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (isAuthenticated) {
                    onNavigate('account');
                  } else {
                    setIsAuthModalOpen(true);
                  }
                }}
                className="flex items-center gap-2 text-[#b6b095] hover:text-white"
              >
                <User className="w-4 h-4 text-[#ff4d56]" />
                <span>{isAuthenticated ? 'My Account' : 'Sign In'}</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
