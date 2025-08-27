import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Ticket } from '../types/ticket';
import { API_CONFIG } from '../config/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { eachDayOfInterval, format, subWeeks } from 'date-fns';
import { es } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TimeRange = 'day' | 'week' | 'month';

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  
  const { data: tickets, isLoading } = useQuery<Ticket[]>({
    queryKey: ['tickets'],
    queryFn: async () => {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TICKETS}`, {
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

  // ... resto del código del Dashboard sin cambios ...

  return (
    // ... resto del JSX sin cambios ...
  );
};

export default Dashboard;