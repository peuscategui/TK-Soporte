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
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }

      return response.json();
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