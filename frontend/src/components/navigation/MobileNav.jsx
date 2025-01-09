// src/components/navigation/MobileNav.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Heart, User, LogIn } from '../../utils/icons';
import CloseHeader from './CloseHeader';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [favoriteCount, setFavoriteCount] = useState(() => {
    const stored = localStorage.getItem('physioapp_favorites');
    return stored ? Object.keys(JSON.parse(stored)).length : 0;
  });

  useEffect(() => {
    const handleFavoritesUpdate = (event) => {
      const { count } = event.detail;
      setFavoriteCount(count);
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    return () => window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="lg:hidden p-2 text-physio-chocolate hover:bg-physio-cream/10 rounded-lg"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-physio-chocolate/50"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-physio-cream">
              <h2 className="text-lg font-semibold text-physio-chocolate">Menu</h2>
              <CloseHeader onClose={() => setIsOpen(false)} />
            </div>

            <nav className="p-4">
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => handleNavigation('/favorites')}
                    className="w-full flex items-center p-2 text-physio-chocolate hover:bg-physio-cream/10 rounded-lg"
                  >
                    <Heart className="w-5 h-5 mr-3" />
                    <span>Favoriten</span>
                    {favoriteCount > 0 && (
                      <span className="ml-auto bg-physio-terrakotta text-white text-xs px-2 py-1 rounded-full">
                        {favoriteCount}
                      </span>
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/login')}
                    className="w-full flex items-center p-2 text-physio-chocolate hover:bg-physio-cream/10 rounded-lg"
                  >
                    <LogIn className="w-5 h-5 mr-3" />
                    <span>Login</span>
                  </button>
                </li>
                <li>
                  <button
                    className="w-full flex items-center p-2 text-physio-chocolate hover:bg-physio-cream/10 rounded-lg"
                  >
                    <User className="w-5 h-5 mr-3" />
                    <span>Profil</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;