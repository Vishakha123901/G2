import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginModal from '../components/common/LoginModal';

const AuthModalContext = createContext();

export function AuthModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const openLoginModal = () => {
    setIsOpen(true);
  };

  const closeLoginModal = () => {
    setIsOpen(false);
  };

  return (
    <AuthModalContext.Provider value={{ isOpen, openLoginModal, closeLoginModal }}>
      {children}
      {/* In-page Login Modal: renders over existing page only when NOT on /login route */}
      {location.pathname !== '/login' && (
        <LoginModal isOpen={isOpen} onClose={closeLoginModal} isWhitePage={false} />
      )}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
}
