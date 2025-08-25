import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Ticket } from '../types/ticket';

// Hook para obtener tickets
export const useFilteredTickets = () => {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: async () => {
      const { data } = await axios.get<Ticket[]>('/api/tickets');
      return data;
    },
  });
};