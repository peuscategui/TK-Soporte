import axios from 'axios';

// Obtener la URL base de la API desde las variables de entorno
const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.40.79:5000';

// Log para debug
console.log('API URL:', API_URL);
console.log('Environment:', process.env.NODE_ENV);
console.log('All env vars:', process.env);

// Crear instancia de axios con la configuración base
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para logs de peticiones
api.interceptors.request.use(request => {
  console.log('Starting Request:', request.url);
  return request;
});

// Interceptor para logs de respuestas
api.interceptors.response.use(
  response => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  error => {
    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);