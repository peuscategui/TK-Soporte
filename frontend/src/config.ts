// Configuración de la aplicación
export const config = {
  // URL base de la API
  apiUrl: process.env.REACT_APP_API_URL || 'http://192.168.40.79:5000',
  
  // Puerto de la aplicación frontend
  port: process.env.PORT || 5001,
  
  // Ambiente de ejecución
  env: process.env.NODE_ENV || 'development',
  
  // Endpoints de la API
  endpoints: {
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
    },
    tickets: {
      list: '/tickets',
      create: '/tickets',
      update: (id: string) => `/tickets/${id}`,
      delete: (id: string) => `/tickets/${id}`,
    },
  },
};

// Log de configuración
console.log('App Config:', {
  apiUrl: config.apiUrl,
  port: config.port,
  env: config.env,
});
