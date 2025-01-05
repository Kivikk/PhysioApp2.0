import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = Cookies.get('jwt');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Verify token with backend (endpoint to be implemented)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify`);

        if (response.data.valid) {
          setIsAuthenticated(true);
          setUser(response.data.user);
        } else {
          Cookies.remove('jwt');
          delete axios.defaults.headers.common['Authorization'];
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        Cookies.remove('jwt');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, credentials);
      const { token, user } = response.data;

      Cookies.set('jwt', token, { expires: 7 });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setIsAuthenticated(true);
      setUser(user);

      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const logout = () => {
    Cookies.remove('jwt');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    loading,
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;