import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

const DEMO_USER = {
  id: 'usr-9281',
  name: 'Camille de Montparnasse',
  email: 'camille.montparnasse@haute-floria.com',
  phone: '+1 (555) 234-8901',
  tier: 'Grand Sovereign',
  loyaltyPoints: 1450,
};

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('floria_user');
      return saved ? JSON.parse(saved) : DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('floria_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    if (user) {
      localStorage.setItem('floria_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('floria_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('floria_orders', JSON.stringify(orders));
  }, [orders]);

  const login = (email, _pass) => {
    const newUser = {
      id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      tier: 'Connoisseur',
      loyaltyPoints: 350,
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    addToast({
      type: 'success',
      title: 'Welcome Back, Esteemed Patron',
      message: `Signed in as ${newUser.name}. Exclusive allocations unlocked.`,
    });
    return true;
  };

  const signup = (name, email, _pass) => {
    const newUser = {
      id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
      name,
      email,
      tier: 'Patron',
      loyaltyPoints: 100,
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    addToast({
      type: 'success',
      title: 'Maison Floria Membership Activated',
      message: `Welcome ${name}. 100 Sovereign points added to your vault.`,
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have safely departed from Maison Floria.',
    });
  };

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        orders,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
