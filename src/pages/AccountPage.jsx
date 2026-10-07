import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, Award, LogOut, ArrowRight } from 'lucide-react';

export const AccountPage = ({ onNavigateToShop }) => {
  const { user, orders, logout } = useAuth();

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 min-h-screen">
      
      {/* Patron Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#090909] border border-[#b6b095]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#e3131b]/20 border-2 border-[#e3131b] flex items-center justify-center text-[#ff4d56] text-xl font-bold font-display uppercase">
            {user?.name?.charAt(0) || 'P'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4d56] bg-[#e3131b]/15 px-2 py-0.5 rounded border border-[#e3131b]/30">
                {user?.tier || 'Grand Sovereign'}
              </span>
              <span className="text-xs font-mono text-[#d4af37] flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> {user?.loyaltyPoints || 1450} Sovereign Points
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display text-white mt-1">
              {user?.name || 'Patron de Floria'}
            </h1>
            <p className="text-xs text-[#b6b095]">
              {user?.email || 'patron@haute-floria.com'}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#e3131b]/20 text-xs text-[#ff4d56] border border-white/10 hover:border-[#e3131b]/40 transition-colors flex items-center gap-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Orders & Allocations History */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#e3131b] uppercase">
              Provenance &amp; Archive
            </span>
            <h2 className="text-2xl font-display text-white mt-0.5">
              MY BOTANICAL ALLOCATIONS ({orders.length})
            </h2>
          </div>
          <button
            onClick={onNavigateToShop}
            className="text-xs text-[#ff4d56] hover:underline flex items-center gap-1"
          >
            <span>Browse Treasury</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#080808] border border-[#b6b095]/15 space-y-4">
            <Package className="w-10 h-10 text-[#b6b095]/40 mx-auto" />
            <h3 className="text-base font-semibold text-white font-serif-heading">No Prior Allocations Recorded</h3>
            <p className="text-xs text-[#b6b095]/70 max-w-sm mx-auto">
              Your previous order receipts, courier telemetry, and stem care certificates will be archived here.
            </p>
            <button
              onClick={onNavigateToShop}
              className="px-6 py-2.5 rounded-xl bg-[#e3131b] text-white text-xs font-semibold uppercase"
            >
              Order First Harvest
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-2xl bg-[#080808] border border-[#b6b095]/15 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10 text-xs">
                  <div>
                    <span className="font-mono text-white font-bold">{order.id}</span>
                    <span className="text-[#b6b095]/60 ml-3">{order.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#e3131b]/15 text-[#ff4d56] border border-[#e3131b]/30 font-mono text-[10px] uppercase font-semibold">
                      {order.status}
                    </span>
                    <span className="font-mono font-bold text-white">${order.total}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover border border-white/10"
                      />
                      <div>
                        <h4 className="font-semibold text-white">{item.product.name}</h4>
                        <p className="text-[11px] text-[#b6b095]/70 font-mono">
                          {item.quantity}x {item.size} (${item.price * item.quantity})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#b6b095]/70 font-mono">
                  <span>Tracking: {order.trackingNumber}</span>
                  <span>Recipient: {order.shippingAddress.fullName} • {order.shippingAddress.city}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
