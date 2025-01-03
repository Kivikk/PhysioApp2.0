import React, { createContext, useContext, useState, useCallback } from 'react';
import { X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && (
        <div className={`
          fixed top-4 right-4 z-50 
          ${toast.type === 'error' ? 'bg-physio-terrakotta' : 'bg-physio-sage'}
          text-white px-4 py-3 rounded-lg shadow-lg
          flex items-center justify-between
          min-w-[300px]
          animate-fade-in
        `}>
          <p className="pr-4">{toast.message}</p>
          <button
            onClick={hideToast}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
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