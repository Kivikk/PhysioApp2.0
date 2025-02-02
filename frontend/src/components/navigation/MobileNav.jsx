import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Heart, User, LogIn } from '../../utils/icons';
import CloseHeader from './CloseHeader';
import { useToast } from '../../contexts/ToastContext';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(true);

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

  //PWA popup
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

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  //PWA Installer
  const handleInstallClick = async () => {
    console.log('deferredPrompt status:', !!deferredPrompt);

    if (!deferredPrompt) {
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

          <div className="fixed right-0 top-0 h-full w-64 bg-physio-cream shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-x-physio-chocolate">
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
                    onClick={() => handleNavigation('/error')} //ändern nach implementierung des Profils in'/profile'
                    className="w-full flex items-center p-2 text-physio-chocolate hover:bg-physio-cream/10 rounded-lg"
                  >
                    <User className="w-5 h-5 mr-3" />
                    <span>Profil</span>
                  </button>
                </li>
                {isInstallable && (
                  <li>
                    <button
                      onClick={handleInstallClick}
                      className="w-full flex items-center p-2 text-physio-chocolate hover:bg-physio-cream/10 rounded-lg"
                    >
                      <img
                        src="/favicon.svg"
                        alt="PhysioApp Icon"
                        className="w-5 h-5 mr-3"
                      />
                      <span>App installieren</span>
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;