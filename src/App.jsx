import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/wishlist/WishlistDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { ProductDetailModal } from './components/shop/ProductDetailModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { StoryPage } from './pages/StoryPage';
import { SpecimenPage } from './pages/SpecimenPage';
import Lenis from 'lenis';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Initialize Lenis smooth scroll across the entire application
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Global Keyboard Shortcut: Cmd/Ctrl + K to open search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    navigateTo('product');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f4efe6] flex flex-col selection:bg-[#e3131b] selection:text-white">
      {/* Main Luxury Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Page Routing */}
      <main className={`flex-1 ${currentPage === 'home' ? '' : 'pt-20'}`}>
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            initialCategory={pageParams.category || 'All'}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'product' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onNavigateBack={() => navigateTo('shop')}
            onSelectProduct={handleSelectProduct}
            onNavigateToCheckout={() => navigateTo('checkout')}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage
            onNavigateToShop={() => navigateTo('shop')}
            onNavigateToCheckout={() => navigateTo('checkout')}
          />
        )}

        {currentPage === 'wishlist' && (
          <WishlistPage
            onNavigateToShop={() => navigateTo('shop')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            onNavigateHome={() => navigateTo('home')}
            onNavigateToCart={() => navigateTo('cart')}
          />
        )}

        {currentPage === 'account' && (
          <AccountPage onNavigateToShop={() => navigateTo('shop')} />
        )}

        {currentPage === 'story' && (
          <StoryPage
            onNavigateBack={() => navigateTo('home')}
            onNavigateToShop={() => navigateTo('shop')}
          />
        )}

        {currentPage === 'specimen' && (
          <SpecimenPage
            onNavigateBack={() => navigateTo('home')}
            onSelectProduct={handleSelectProduct}
          />
        )}
      </main>

      {/* Luxury Footer (Shown on secondary pages) */}
      {currentPage !== 'home' && <Footer onNavigate={navigateTo} />}

      {/* Slide-over & Modal Overlays */}
      <CartDrawer
        onNavigateToCheckout={() => navigateTo('checkout')}
        onNavigateToCartPage={() => navigateTo('cart')}
        onNavigateToShop={() => navigateTo('shop')}
      />

      <WishlistDrawer
        onSelectProduct={handleSelectProduct}
        onNavigateToShop={() => navigateTo('shop')}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      <AuthModal />

      <ProductDetailModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onNavigateToCheckout={() => navigateTo('checkout')}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
