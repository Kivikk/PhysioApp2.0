// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes';

const App = () => {
  console.log('App rendering');  // Debug log
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Toaster position="top-right" />
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;