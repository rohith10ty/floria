import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, login, signup } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      login(email || 'patron@haute-floria.com', password || 'secret');
    } else if (authMode === 'signup') {
      signup(name || 'Lady Genevieve', email || 'genevieve@haute-floria.com', password || 'secret');
    } else if (authMode === 'forgot') {
      setForgotSent(true);
    }
  };

  const handleQuickDemoLogin = () => {
    login('camille.montparnasse@haute-floria.com', 'demo123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#0a0a0a] border border-[#b6b095]/20 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg text-[#b6b095] hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close auth dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#e3131b]/15 border border-[#e3131b]/30 text-[#ff4d56] mb-1">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-display text-white">
            {authMode === 'login' && 'Patron Sanctum'}
            {authMode === 'signup' && 'Join Maison Floria'}
            {authMode === 'forgot' && 'Account Recovery'}
          </h2>
          <p className="text-xs text-[#b6b095]/70">
            {authMode === 'login' && 'Access your private allocations & saved botanicals.'}
            {authMode === 'signup' && 'Receive bespoke seasonal invitations & 100 Sovereign welcome points.'}
            {authMode === 'forgot' && 'Enter your registered email to receive access credentials.'}
          </p>
        </div>

        {/* Quick Demo Login Button */}
        {authMode === 'login' && (
          <div className="mb-5 p-3 rounded-xl bg-[#e3131b]/10 border border-[#e3131b]/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Instant Demo Patron Access</p>
                <p className="text-[10px] text-[#b6b095]">Pre-loaded with Grand Sovereign status</p>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="px-3 py-1.5 rounded-lg bg-[#e3131b] hover:bg-[#ff2a3b] text-white text-xs font-medium transition-colors"
              >
                1-Click Login
              </button>
            </div>
          </div>
        )}

        {/* Mode Switcher Tabs */}
        {authMode !== 'forgot' && (
          <div className="grid grid-cols-2 gap-1 p-1 bg-black rounded-xl border border-white/10 mb-6 text-xs font-medium">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`py-2 rounded-lg transition-all ${
                authMode === 'login' ? 'bg-[#e3131b] text-white shadow-md' : 'text-[#b6b095] hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`py-2 rounded-lg transition-all ${
                authMode === 'signup' ? 'bg-[#e3131b] text-white shadow-md' : 'text-[#b6b095] hover:text-white'
              }`}
            >
              Register Patron
            </button>
          </div>
        )}

        {/* Form */}
        {forgotSent ? (
          <div className="text-center py-6 space-y-3">
            <ShieldCheck className="w-10 h-10 text-[#ff4d56] mx-auto" />
            <h4 className="text-sm font-medium text-white">Verification Link Dispatched</h4>
            <p className="text-xs text-[#b6b095]/70">
              Check your inbox for password restoration instructions.
            </p>
            <button
              type="button"
              onClick={() => {
                setForgotSent(false);
                setAuthMode('login');
              }}
              className="mt-2 text-xs text-[#ff4d56] hover:underline"
            >
              Return to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {authMode === 'signup' && (
              <div>
                <label className="font-mono text-[10px] tracking-wider text-[#b6b095] uppercase block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#b6b095]/50 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Lady Genevieve Montgomery"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-[#b6b095]/20 text-white placeholder-[#b6b095]/30 focus:outline-none focus:border-[#e3131b]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="font-mono text-[10px] tracking-wider text-[#b6b095] uppercase block mb-1">
                Patron Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#b6b095]/50 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patron@domain.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-[#b6b095]/20 text-white placeholder-[#b6b095]/30 focus:outline-none focus:border-[#e3131b]"
                />
              </div>
            </div>

            {authMode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-mono text-[10px] tracking-wider text-[#b6b095] uppercase">
                    Security Key / Password
                  </label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-[10px] text-[#ff4d56] hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#b6b095]/50 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-[#b6b095]/20 text-white placeholder-[#b6b095]/30 focus:outline-none focus:border-[#e3131b]"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#e3131b] hover:bg-[#ff2a3b] text-white font-semibold uppercase tracking-wider transition-all shadow-lg shadow-[#e3131b]/30 flex items-center justify-center gap-2 mt-2"
            >
              <span>
                {authMode === 'login' && 'Enter Sanctum'}
                {authMode === 'signup' && 'Create Patron Account'}
                {authMode === 'forgot' && 'Send Recovery Email'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center text-[10px] text-[#b6b095]/60">
          <p>Protected by 256-bit encrypted floral allocation protocols.</p>
        </div>
      </div>
    </div>
  );
};
