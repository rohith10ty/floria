import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle2, Heart, ShoppingBag, AlertCircle } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 p-4 rounded-xl glass-panel-crimson border border-[#e3131b]/40 text-[#f4efe6] shadow-2xl animate-in slide-in-from-bottom-5 duration-300 backdrop-blur-xl"
            style={{ background: 'rgba(15, 7, 7, 0.95)' }}
          >
            {toast.thumbnail ? (
              <img
                src={toast.thumbnail}
                alt=""
                className="w-12 h-12 rounded-lg object-cover border border-[#b6b095]/30 flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-[#e3131b]/15 border border-[#e3131b]/30 flex items-center justify-center flex-shrink-0 text-[#e3131b]">
                {toast.type === 'cart' && <ShoppingBag className="w-5 h-5" />}
                {toast.type === 'wishlist' && <Heart className="w-5 h-5 fill-current" />}
                {toast.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
                {toast.type === 'info' && <CheckCircle2 className="w-5 h-5" />}
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium tracking-wide text-white truncate font-sans-body">
                {toast.title}
              </h4>
              {toast.message && (
                <p className="text-xs text-[#b6b095] mt-0.5 line-clamp-2">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 text-[#b6b095] hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
