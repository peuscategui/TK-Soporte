import { useQuery } from '@tanstack/react-query';
import { Ticket } from '../types/ticket';
import { API_CONFIG } from '../config/api';

export const useFilteredTickets = (filters: { page: number; limit: number }) => {
  return useQuery<Ticket[]>({
    queryKey: ['tickets', filters],
    queryFn: async () => {
      const response = await fetch(`${API_CONFIG.backendUrl}${API_CONFIG.endpoints.tickets}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener tickets');
      }

      return response.json();
    },
  });
};