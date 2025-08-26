import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { User } from '../types/user';
import jwtDecode from 'jwt-decode';
import { config } from '../config';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
}

interface JwtPayload {
  username: string;
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading, isFetching } = useQuery<User | null>({
    queryKey: ['user'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          console.log('Token decodificado:', decoded);
          return {
            id: decoded.sub,
            email: decoded.username,
            role: decoded.role
          };
        } catch (error) {
          console.error('Error decodificando token:', error);
          localStorage.removeItem('token');
          return null;
        }
      }
      return null;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const login = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      // Log de la URL completa antes de hacer la petición
      const fullUrl = `${config.apiUrl}/${config.endpoints.auth.login}`.replace(/([^:]\/)\/+/g, "$1");
      console.log('Intentando login con URL:', fullUrl);
      console.log('Credenciales:', credentials);

      const { data } = await api.post<AuthResponse>(config.endpoints.auth.login, credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: any) => {
      console.error('Error en login:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    }
  });

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    queryClient.setQueryData(['user'], null);
  };

  return {
    user,
    isLoadingUser: isLoading || isFetching,
    login,
    logout,
    isAuthenticated: !!user,
  };
};