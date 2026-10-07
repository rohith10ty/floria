import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#030303] border-t border-[#b6b095]/15 text-[#b6b095] pt-16 pb-12 relative overflow-hidden">
      {/* Background ambient crimson glow */}
      <div 
        className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #e3131b 0%, transparent 70%)' }}
      />

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl bg-white/[0.02] border border-[#b6b095]/10">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#e3131b]/15 border border-[#e3131b]/30 flex items-center justify-center text-[#ff4d56]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">White-Glove Cold Courier</h4>
              <p className="text-xs text-[#b6b095]/60 mt-0.5">Hydration sealed & temperature controlled</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#e3131b]/15 border border-[#e3131b]/30 flex items-center justify-center text-[#ff4d56]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">7-Day Freshness Oath</h4>
              <p className="text-xs text-[#b6b095]/60 mt-0.5">Harvested 12h prior to dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#e3131b]/15 border border-[#e3131b]/30 flex items-center justify-center text-[#ff4d56]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Sovereign Eco-Farms</h4>
              <p className="text-xs text-[#b6b095]/60 mt-0.5">100% sustainably cultivated botanicals</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#e3131b]/15 border border-[#e3131b]/30 flex items-center justify-center text-[#ff4d56]">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Artisanal Curation</h4>
              <p className="text-xs text-[#b6b095]/60 mt-0.5">Bound by master floral artists</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#b6b095]/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 40 40" aria-hidden>
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
              <span className="font-display text-2xl tracking-wider text-white">FLORIA</span>
            </div>

            <p className="text-xs leading-relaxed text-[#b6b095]/80 max-w-sm">
              Maison de Floria translates raw botanical vitality into living sculptural poetry. Dedicated to the rare, the dark, and the transcendent flower.
            </p>

            <div className="pt-2">
              <span className="text-[10px] font-mono tracking-widest text-[#e3131b] uppercase block">
                Boutique Salons
              </span>
              <p className="text-xs text-[#b6b095]/60 mt-1">
                Paris • Kyoto • New York • Milan • London
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white">
              The Varieties
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('shop', { category: 'Exotic' })}
                  className="hover:text-white transition-colors text-left"
                >
                  Spider Lilies (Lycoris)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('shop', { category: 'Roses' })}
                  className="hover:text-white transition-colors text-left"
                >
                  Black Baccara Velvet
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('shop', { category: 'Lilies' })}
                  className="hover:text-white transition-colors text-left"
                >
                  Midnight Callas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('shop', { category: 'Bouquets' })}
                  className="hover:text-white transition-colors text-left"
                >
                  Imperial Peonies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('shop', { category: 'Preserved' })}
                  className="hover:text-white transition-colors text-left"
                >
                  Eternal Glass Cloches
                </button>
              </li>
            </ul>
          </div>

          {/* Maison & Care */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white">
              Maison Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-white transition-colors">
                  Botanical Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('specimen')} className="hover:text-white transition-colors">
                  3D Specimen Gallery
                </button>
              </li>
              <li>
                <a href="#care" className="hover:text-white transition-colors">
                  Stem Longevity Guide
                </a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-white transition-colors">
                  Courier Protocols
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-white transition-colors">
                  Press & Editorial
                </a>
              </li>
            </ul>
          </div>

          {/* VIP Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#ff4d56] uppercase">
                <Sparkles className="w-3 h-3 text-[#e3131b]" /> The Private Gazette
              </span>
              <h4 className="text-sm font-medium text-white mt-1">
                Receive Private Harvest Allocations
              </h4>
              <p className="text-xs text-[#b6b095]/70 mt-1">
                Patrons receive early notice of limited spider lily blooms and bespoke seasonal releases.
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#e3131b]/15 border border-[#e3131b]/40 text-white text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#ff4d56]" />
                <span>You are entered into the Private Gazette register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your patron email..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-[#b6b095]/20 text-white placeholder-[#b6b095]/40 text-xs focus:outline-none focus:border-[#e3131b]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-medium transition-colors flex items-center gap-1.5 flex-shrink-0"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-[#b6b095]/50">
                  By joining, you agree to receive Maison Floria private allocations. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#b6b095]/50">
          <p>© 2026 Maison Floria Botanique. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Allocation</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Botanical Ethics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
