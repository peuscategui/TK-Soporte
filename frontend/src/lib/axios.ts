import axios from 'axios';

// En desarrollo, el proxy del package.json se encargará de redirigir al backend.
// Para producción, la baseURL se debe configurar con la variable de entorno REACT_APP_API_URL.
const baseURL = 'http://localhost:3000';

export const api = axios.create({
  baseURL, // Será undefined en desarrollo, lo que hará que las peticiones sean relativas.
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


