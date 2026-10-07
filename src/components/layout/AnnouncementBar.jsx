import React, { useState } from 'react';
import { Sparkles, X, Gift } from 'lucide-react';

export const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#120607] border-b border-[#e3131b]/30 text-xs py-2 px-4 text-[#b6b095] relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 md:gap-3 text-center">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#e3131b]/20 text-[#ff4d56] border border-[#e3131b]/40 text-[10px] font-semibold tracking-wider uppercase">
            <Sparkles className="w-3 h-3" /> Rare Autumn Allocation
          </span>
          <p className="tracking-wide hidden sm:inline">
            Complimentary Temperature-Controlled White-Glove Courier on orders over <span className="text-white font-medium">$120</span>
          </p>
          <span className="hidden md:inline text-[#e3131b]">•</span>
          <p className="flex items-center gap-1.5 text-white">
            <Gift className="w-3.5 h-3.5 text-[#e3131b]" />
            Use Code <span className="font-mono text-[#ff4d56] bg-black/60 px-1.5 py-0.5 rounded border border-[#e3131b]/30">FLORIA15</span> for 15% VIP discount
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-[#b6b095]/60 hover:text-white transition-colors p-0.5"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
