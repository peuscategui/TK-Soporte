import axios from 'axios';
import { config } from '../config';

// Crear instancia de axios con la configuración base
const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para logs de peticiones
api.interceptors.request.use(request => {
  // Construir la URL completa para el log
  const fullUrl = request.baseURL && request.url
    ? `${request.baseURL}/${request.url}`.replace(/([^:]\/)\/+/g, "$1")
    : request.url;

  console.log('Starting Request:', {
    fullUrl,
    baseURL: request.baseURL,
    url: request.url,
    method: request.method,
    headers: request.headers,
  });
  return request;
});

// Interceptor para logs de respuestas
api.interceptors.response.use(
  response => {
    const fullUrl = response.config.baseURL && response.config.url
      ? `${response.config.baseURL}/${response.config.url}`.replace(/([^:]\/)\/+/g, "$1")
      : response.config.url;

    console.log('Response:', {
      status: response.status,
      fullUrl,
      data: response.data,
    });
    return response;
  },
  error => {
    const fullUrl = error.config?.baseURL && error.config?.url
      ? `${error.config.baseURL}/${error.config.url}`.replace(/([^:]\/)\/+/g, "$1")
      : error.config?.url;

    console.error('API Error:', {
      status: error.response?.status,
      fullUrl,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export { api };