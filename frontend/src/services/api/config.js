import axios from 'axios';
import Cookies from 'js-cookie';

const API_URLS = {
  development: 'http://localhost:8000',
  production: 'https://https://physioapp2-0backend.onrender.com',  // Updated with production URL
};

const config = {
  baseURL: API_URLS[process.env.NODE_ENV] || API_URLS.development,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
};

const apiClient = axios.create(config);
const token = Cookies.get('jwt');
if (token) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const getApiClient = () => apiClient;

export const updateAuthHeader = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

export const getBaseUrl = () => config.baseURL;

export default apiClient;
