import apiClient from './config';
import { refreshToken } from './authApi';
import toast from 'react-hot-toast';

apiClient.interceptors.request.use(
  (config) => {

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {

        const result = await refreshToken();
        if (result.success) {
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        toast.error('Sitzung abgelaufen. Bitte erneut einloggen.');
      }
    }

    if (error.response?.status === 503) {
      toast.error('Server temporär nicht erreichbar. Bitte später erneut versuchen.');
    }

    if (error.response?.status === 400) {
      toast.error(error.response.data.message || 'Ungültige Eingabe');
    }

    if (error.response?.status === 404) {
      toast.error('Ressource nicht gefunden');
    }

    if (error.response?.status === 500) {
      toast.error('Ein Serverfehler ist aufgetreten');
    }

    if (error.response?.status === 429) {
      toast.error('Zu viele Anfragen. Bitte warten Sie einen Moment.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;