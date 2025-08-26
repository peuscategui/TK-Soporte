import axios from 'axios';

// Usar la variable de entorno REACT_APP_API_URL
const baseURL = process.env.REACT_APP_API_URL || 'http://192.168.40.79:5000';

console.log('API Base URL:', baseURL); // Para verificar que se está usando la URL correcta

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});