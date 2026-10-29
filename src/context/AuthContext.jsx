import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getAdminKey, setAdminKey } from '../lib/api';

const AuthContext = createContext();

// Demo student account (browser-only). Admin access is verified by the SERVER
// against the ADMIN_PASSCODE in server/.env – there is no admin password in this file.
const INITIAL_USERS = [
  {
    id: 'USR-8821',
    name: 'Alistair Finch',
    email: 'a.finch@mayfaircapital.co.uk',
    password: 'student123',
    role: 'student',
    title: 'Senior Compliance Analyst',
    organization: 'Mayfair Capital Partners London',
    country: 'United Kingdom',
    phone: '+44 (0) 7552 237 997',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  }
];

const ADMIN_PROFILE = {
  id: 'ADM-001',
  name: 'Renjith Kalappurackal (Ren)',
  email: 'ren@retrrac.org',
  role: 'admin',
  title: 'Chief Executive & Academy Dean',
  organization: 'ReTRRAC Global Ltd.',
  country: 'United Kingdom',
  phone: '+44 (0) 7552 237 997',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
};

// Kept so existing imports don't break. The real passcode lives only on the server.
export const ADMIN_MASTER_PASSCODE = '';

export function AuthProvider({ children }) {
  const [usersDb, setUsersDb] = useState(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem('retrrac_users_db') || 'null');
      if (Array.isArray(parsed) && parsed.length > 0) return parsed.filter((u) => u.role !== 'admin');
    } catch { /* ignore */ }
    return INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('retrrac_user') || 'null');
      // An "admin" saved in the browser without a server-verified key is not an admin.
      if (saved?.role === 'admin' && !getAdminKey()) return null;
      return saved;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin');
  const [authModalMessage, setAuthModalMessage] = useState('');
  const [authSuccessCallback, setAuthSuccessCallback] = useState(null);

  useEffect(() => {
    try { localStorage.setItem('retrrac_users_db', JSON.stringify(usersDb)); } catch { /* ignore */ }
  }, [usersDb]);

  useEffect(() => {
    try {
      if (currentUser) localStorage.setItem('retrrac_user', JSON.stringify(currentUser));
      else localStorage.removeItem('retrrac_user');
    } catch { /* ignore */ }
  }, [currentUser]);

  // If the server rejects the stored admin key (e.g. passcode changed), sign the admin out.
  useEffect(() => {
    const onUnauthorized = () => {
      setAdminKey('');
      setCurrentUser((u) => (u?.role === 'admin' ? null : u));
    };
    window.addEventListener('retrrac:admin-unauthorized', onUnauthorized);
    return () => window.removeEventListener('retrrac:admin-unauthorized', onUnauthorized);
  }, []);

  const openAuthModal = (mode = 'signin', callback = null, message = '') => {
    setAuthModalMode(mode);
    setAuthSuccessCallback(() => callback);
    setAuthModalMessage(message);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthSuccessCallback(null);
    setAuthModalMessage('');
  };

  const finish = (user) => {
    setCurrentUser(user);
    if (authSuccessCallback) authSuccessCallback(user);
    closeAuthModal();
    return { success: true, user };
  };

  /** Candidate or Admin sign in. Returns a Promise – use `await signIn(...)`. */
  const signIn = async ({ email, password, isAdminMode = false, adminPasscode = '' }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (isAdminMode) {
      const passcode = (adminPasscode || cleanPass || '').trim();
      if (!passcode) return { success: false, error: 'Please enter the administrator passcode.' };
      try {
        await api('/api/admin/login', { method: 'POST', body: { passcode } });
      } catch (err) {
        return { success: false, error: err.message || 'Invalid administrator passcode.' };
      }
      setAdminKey(passcode);
      return finish(ADMIN_PROFILE);
    }

    const user = usersDb.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      return { success: false, error: 'No candidate account found with this email. Please check your email or register.' };
    }
    if (user.password && user.password !== cleanPass) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }
    return finish(user);
  };

  const signUp = ({ name, email, password, phone, organization, country }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (name || '').trim();
    if (!cleanEmail || !cleanName) return { success: false, error: 'Legal Name and Email are required.' };
    if (cleanEmail === ADMIN_PROFILE.email || usersDb.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'An account already exists with this email address. Please sign in instead.' };
    }
    const newUser = {
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: cleanName,
      email: cleanEmail,
      password: password || '',
      role: 'student',
      title: 'Candidate Scholar',
      organization: organization || 'Independent Professional',
      country: country || 'United Kingdom',
      phone: phone || '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    setUsersDb((prev) => [newUser, ...prev]);
    return finish(newUser);
  };

  const signOut = () => {
    setAdminKey('');
    setCurrentUser(null);
  };

  /** Used after a successful payment by a guest. */
  const loginAsStudent = (details = {}) => {
    setCurrentUser({
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      title: 'Candidate Scholar',
      ...details,
      role: 'student'
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: Boolean(currentUser),
        isAdmin: currentUser?.role === 'admin' && Boolean(getAdminKey()),
        signIn,
        signUp,
        signOut,
        loginAsStudent,
        loginAsAdmin: () => openAuthModal('admin'),
        isAuthModalOpen,
        authModalMode,
        authModalMessage,
        openAuthModal,
        closeAuthModal,
        ADMIN_MASTER_PASSCODE
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}