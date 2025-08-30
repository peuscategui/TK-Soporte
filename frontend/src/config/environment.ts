// Configuración del entorno
export const config = {
  // URL de la API
  apiUrl: (() => {
    // Si estamos en desarrollo (localhost), usar localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000';
    }
    
    // Si estamos en producción, usar la variable de entorno o una URL por defecto
    return process.env.REACT_APP_API_URL || 'http://192.168.40.79:5000';
  })(),
  
  // Entorno
  isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
  isProduction: !(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'),
  
  // Configuración de la aplicación
  appName: 'TK Soporte',
  version: '1.0.0'
};
