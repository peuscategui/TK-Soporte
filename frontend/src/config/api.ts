const normalizeUrl = (url: string) => {
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

const backendBaseUrl = normalizeUrl(process.env.REACT_APP_API_URL || 'http://192.168.40.79:5000');

export const API_CONFIG = {
  backendUrl: backendBaseUrl,
  endpoints: {
    login: '/auth/login',
    tickets: '/tickets',
  }
};

console.log('API_CONFIG loaded:', API_CONFIG);