import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'error', onClose }) => {
  const types = {
    error: {
      backgroundColor: 'bg-physio-terrakotta',
      icon: <AlertCircle className="w-5 h-5" />
    },
    success: {
      backgroundColor: 'bg-physio-sage',
      icon: <CheckCircle className="w-5 h-5" />
    }
  };

  const { backgroundColor, icon } = types[type] || types.error;

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center ${backgroundColor} text-white px-4 py-3 rounded-lg shadow-lg`}>
      <div className="mr-2">
        {icon}
      </div>
      <p className="mr-4">{message}</p>
      <button
        onClick={onClose}
        className="ml-auto hover:opacity-80 transition-opacity"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Toast;