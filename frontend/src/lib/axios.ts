import axios from 'axios';
import { config } from '../config';

// Crear instancia de axios con la configuración base
export const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para logs de peticiones
api.interceptors.request.use(request => {
  console.log('Starting Request:', {
    url: request.url,
    baseURL: request.baseURL,
    method: request.method,
    headers: request.headers,
  });
  return request;
});

// Interceptor para logs de respuestas
api.interceptors.response.use(
  response => {
    console.log('Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  error => {
    console.error('API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);