import apiClient, { updateAuthHeader } from './config';
import Cookies from 'js-cookie';

const AUTH_URL = '/api/auth';

export const login = async (credentials) => {
  try {
    const response = await apiClient.post(`${AUTH_URL}/login`, credentials);
    const { token, user } = response.data;

    Cookies.set('jwt', token, { expires: 7 });
    updateAuthHeader(token);

    return {
      success: true,
      data: { user, token }
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Login fehlgeschlagen'
    };
  }
};

export const logout = () => {
  Cookies.remove('jwt');
  updateAuthHeader(null);
  return { success: true };
};

export const verifyToken = async () => {
  try {
    const token = Cookies.get('jwt');
    if (!token) {
      return { success: false, error: 'Kein Token gefunden' };
    }

    const response = await apiClient.get(`${AUTH_URL}/verify`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    Cookies.remove('jwt');
    updateAuthHeader(null);
    return {
      success: false,
      error: error.response?.data?.message || 'Token ungültig'
    };
  }
};

export const refreshToken = async () => {
  try {
    const response = await apiClient.post(`${AUTH_URL}/refresh`);
    const { token } = response.data;

    Cookies.set('jwt', token, { expires: 7 });
    updateAuthHeader(token);

    return {
      success: true,
      data: { token }
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Token-Erneuerung fehlgeschlagen'
    };
  }
};