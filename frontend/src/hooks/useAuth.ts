import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '../types/user';
import jwtDecode from 'jwt-decode';
import { API_CONFIG } from '../config/api';

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
    mutationFn: async (credentials: { usuario: string; clave: string }) => {
      console.log('Intentando login con:', credentials);
      const response = await fetch(`${API_CONFIG.backendUrl}${API_CONFIG.endpoints.login}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Error de autenticación:', data);
        throw new Error(data.message || 'Error en la autenticación');
      }

      console.log('Respuesta del login:', data);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const logout = () => {
    localStorage.removeItem('token');
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