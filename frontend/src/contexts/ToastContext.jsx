import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/common/Toast';

const ToastContext = createContext(null);

const TOAST_DURATION = {
  short: 2000,
  normal: 3000,
  long: 5000
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const hideToast = useCallback((id) => {
    setToasts(currentToasts =>
      currentToasts.filter(toast => toast.id !== id)
    );
  }, []);

  const showToast = useCallback((message, config = {}) => {
    const {
      type = 'success',
      duration = TOAST_DURATION.normal,
    } = config;

    const id = Date.now();

    setToasts(currentToasts => [...currentToasts, {
      id,
      message,
      type,
      duration,
    }]);

    setTimeout(() => {
      hideToast(id);
    }, duration);
  }, [hideToast]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => hideToast(toast.id)}
          />
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

export { TOAST_DURATION };