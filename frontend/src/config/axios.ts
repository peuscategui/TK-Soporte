import axios from 'axios';
import { config } from './environment';

// Configuración base de axios
const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 5000, // timeout de 5 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api; 