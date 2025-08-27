const API_URL = 'http://192.168.40.79:5000';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  console.log('Intentando login con:', {
    url: `${API_URL}/auth/login`,
    credentials
  });

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(error.message || 'Error en la autenticación');
  }

  const data = await response.json();
  console.log('Login exitoso:', data);
  return data;
};
