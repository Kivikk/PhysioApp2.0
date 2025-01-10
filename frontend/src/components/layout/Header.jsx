// src/components/layout/Header.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Heart, LogIn } from "../../utils/icons";
import { useFavorites } from "../../hooks/useFavorites";
import MobileNav from "../navigation/MobileNav";
import logo from "../../assets/logo.svg";
import { useToast } from '../../contexts/ToastContext';

const Header = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [favoriteCount, setFavoriteCount] = useState(() => {
    const stored = localStorage.getItem('physioapp_favorites');
    return stored ? Object.keys(JSON.parse(stored)).length : 0;
  });
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(true);

  useEffect(() => {
    const handleFavoritesUpdate = (event) => {
      const { count } = event.detail;
      setFavoriteCount(count);
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    return () => window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    // Debug Log
    console.log('deferredPrompt status:', !!deferredPrompt);

    if (!deferredPrompt) {
      // Prüfen ob wir auf localhost sind
      if (window.location.hostname === 'localhost') {
        showToast('Installation nur in der Production-Version verfügbar', {
          type: 'info',
          duration: 3000
        });
      } else {
        showToast('Bereits installiert', {
          type: 'info',
          duration: 3000
        });
      }
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        showToast('App wurde erfolgreich installiert', {
          type: 'success',
          duration: 3000
        });
      }
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Installations-Fehler:', error);
      showToast('Installation fehlgeschlagen', {
        type: 'error',
        duration: 3000
      });
    }
  };


  return (
    <header className="bg-physio-safari/75 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img
              src={logo}
              alt="PhysioApp Logo"
              className="h-16 w-auto"
            />
            <h1 className="text-2xl font-bold text-physio-chocolate ml-3">
              PhysioApp
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => navigate('/favorites')}
              className="text-physio-chocolate hover:text-physio-cream transition-colors duration-200 relative group"
              aria-label="Favoriten"
            >
              <Heart className="h-5 w-5 text-physio-cream" />
              {favoriteCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-physio-terrakotta text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
              <span className="absolute top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm text-physio-cream">
                Favoriten
              </span>
            </button>

            <button
              onClick={() => navigate('/login')}
              className="text-physio-chocolate hover:text-physio-cream transition-colors duration-200 relative group"
              aria-label="Login"
            >
              <LogIn className="h-5 w-5 text-physio-cream" />
              <span className="absolute top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm text-physio-cream">
                Login
              </span>
            </button>

            <button
              onClick={() => navigate('/profile')}
              className="text-physio-chocolate hover:text-physio-cream transition-colors duration-200 relative group"
              aria-label="Profil"
            >
              <User className="h-5 w-5 text-physio-cream" />
              <span className="absolute top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm text-physio-cream">
                Profil
              </span>
            </button>

            {isInstallable && (
              <button
                onClick={handleInstallClick}
                className="text-physio-chocolate hover:text-physio-cream transition-colors duration-200 relative group"
                aria-label="App installieren"
              >
                <img
                  src="/favicon.svg"
                  alt="PhysioApp Icon"
                  className="h-5 w-5 text-physio-cream"
                />
                <span className="absolute top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm text-physio-cream">
                  Installation
                </span>
              </button>
            )}
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;