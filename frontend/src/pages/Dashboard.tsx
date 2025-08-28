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
  ChartData,
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p>Cargando...</p>
      </div>
    );
  }

  const getDateRange = () => {
    const now = new Date();
    switch (timeRange) {
      case 'day':
        return { start: subWeeks(now, 1), end: now };
      case 'week':
        return { start: subWeeks(now, 4), end: now };
      case 'month':
        return { start: subWeeks(now, 12), end: now };
      default:
        return { start: subWeeks(now, 4), end: now };
    }
  };

  const prepareLineChartData = (): ChartData<'line'> => {
    const dateRange = getDateRange();
    const days = eachDayOfInterval({ start: dateRange.start, end: dateRange.end });
    
    const ticketsByDay = days.map(day => {
      const dayTickets = tickets?.filter(ticket => {
        const ticketDate = new Date(ticket.createdAt);
        return format(ticketDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
      });
      return {
        date: day,
        total: dayTickets?.length || 0
      };
    });

    return {
      labels: ticketsByDay.map(day => format(day.date, 'dd MMM', { locale: es })),
      datasets: [
        {
          label: 'Tickets Creados',
          data: ticketsByDay.map(day => day.total),
          borderColor: '#90A4AE',
          backgroundColor: '#ECEFF1',
          tension: 0.4,
          fill: true
        }
      ]
    };
  };

  const prepareBarChartData = (): ChartData<'bar'> => {
    const agentStats = tickets?.reduce((acc, ticket) => {
      if (ticket.agente) {
        acc[ticket.agente] = (acc[ticket.agente] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const sortedAgents = Object.entries(agentStats || {})
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    return {
      labels: sortedAgents.map(([agent]) => agent),
      datasets: [
        {
          label: 'Tickets Atendidos',
          data: sortedAgents.map(([, count]) => count),
          backgroundColor: '#78909C',
          borderRadius: 6,
        }
      ]
    };
  };

  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Tendencia de Tickets',
        font: {
          family: "'Inter', sans-serif",
          size: 16,
          weight: 'bold'
        },
        padding: 20
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      },
      x: {
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      }
    }
  };

  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Rendimiento por Agente',
        font: {
          family: "'Inter', sans-serif",
          size: 16,
          weight: 'bold'
        },
        padding: 20
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      },
      x: {
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium text-gray-900">
                Tendencia de Tickets
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimeRange('day')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    timeRange === 'day'
                      ? 'bg-[#607D8B] text-white'
                      : 'bg-[#ECEFF1] text-gray-600 hover:bg-[#CFD8DC]'
                  }`}
                >
                  Diario
                </button>
                <button
                  onClick={() => setTimeRange('week')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    timeRange === 'week'
                      ? 'bg-[#607D8B] text-white'
                      : 'bg-[#ECEFF1] text-gray-600 hover:bg-[#CFD8DC]'
                  }`}
                >
                  Semanal
                </button>
                <button
                  onClick={() => setTimeRange('month')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    timeRange === 'month'
                      ? 'bg-[#607D8B] text-white'
                      : 'bg-[#ECEFF1] text-gray-600 hover:bg-[#CFD8DC]'
                  }`}
                >
                  Mensual
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="h-[300px]">
              <Line options={lineChartOptions} data={prepareLineChartData()} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-medium text-gray-900">
              Rendimiento por Agente
            </h3>
          </div>
          <div className="p-6">
            <div className="h-[300px]">
              <Bar options={barChartOptions} data={prepareBarChartData()} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h4 className="text-xl font-medium text-gray-900">Tickets Recientes</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#e8f5e9]">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Solicitante
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Solicitud
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Categoría
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets?.slice(0, 5).map((ticket, index) => (
                <tr key={`${ticket.createdAt}-${ticket.solicitante}-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.solicitante}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#e8f5e9] text-[#4CAF50]">
                      {ticket.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;