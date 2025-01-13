import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navigationStack, setNavigationStack] = useState([]);
  const [previousPath, setPreviousPath] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    exerciseId: null,
    sourceComponent: null  // 'allExercises' oder 'categoryExercises'
  });

  const handleModalState = useCallback((isOpen, exerciseId = null, sourceComponent = null) => {
    setModalState({
      isOpen,
      exerciseId,
      sourceComponent
    });
  }, []);

  const handleNavigation = useCallback((to, options = {}) => {
    const { source, replace = false, modalData } = options;

    // Neuer Eintrag mit kompletten Pfad inkl. Query-Parametern
    const query = new URLSearchParams();
    if (source) query.set('source', source);
    if (modalData) query.set('modalData', JSON.stringify(modalData));
    const queryString = query.toString();
    const fullPath = `${to}${queryString ? `?${queryString}` : ''}`;

    const newEntry = {
      path: fullPath,
      source,
      modalData,
      timestamp: Date.now()
    };

    // Stack aktualisieren
    setNavigationStack(currentStack => {
      if (replace) {
        return [...currentStack.slice(0, -1), newEntry];
      }
      return [...currentStack, newEntry];
    });

    setPreviousPath(location.pathname);
    navigate(fullPath);
  }, [location.pathname, navigate]);


  const goBack = useCallback(() => {
    if (navigationStack.length > 1) {
      const currentEntry = navigationStack[navigationStack.length - 1];
      const previousEntry = navigationStack[navigationStack.length - 2];

      // Stack vor der Navigation aktualisieren
      setNavigationStack(prev => prev.slice(0, -1));

      // Wenn wir von einem Modal zurückkommen
      if (currentEntry.source === 'modal') {
        handleModalState(true,
          currentEntry.modalData.exerciseId,
          currentEntry.modalData.sourceComponent
        );
      }

      // Zur vorherigen Route navigieren
      navigate(previousEntry.path);
    } else {
      handleModalState(false, null, null);
      navigate('/');
    }
  }, [navigationStack, navigate, handleModalState]);

  // Logging-Funktion für Debugging
  useEffect(() => {
    console.log('Navigation Stack Updated:', navigationStack);
  }, [navigationStack]);



  // Get the source of the current route
  const getNavigationSource = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('source');
  }, [location.search]);

  // Get previous route information
  const getPreviousRoute = useCallback(() => {
    if (navigationStack.length > 1) {
      return navigationStack[navigationStack.length - 2];
    }
    return null;
  }, [navigationStack]);

  // Clear navigation history
  const clearNavigationHistory = useCallback(() => {
    setNavigationStack([]);
    setPreviousPath(null);
    setModalState({
      isOpen: false,
      exerciseId: null,
      sourceComponent: null
    });
  }, []);

  const value = {
    handleNavigation,
    goBack,
    getNavigationSource,
    getPreviousRoute,
    clearNavigationHistory,
    previousPath,
    navigationStack,
    modalState,
    handleModalState
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;