// Configuración de la API
export const API_CONFIG = {
  BASE_URL: 'http://192.168.40.79:5000',
  ENDPOINTS: {
    LOGIN: '/login',
    TICKETS: '/tickets'
  }
} as const;

// Log de configuración
console.log('API Configuration:', API_CONFIG);
