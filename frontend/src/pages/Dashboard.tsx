import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Ticket } from '../types/ticket';
import { config } from '../config';
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
  ChartOptions,
  ChartData
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
  
  const { data: tickets = [], isLoading, error } = useQuery<Ticket[]>({
    queryKey: ['tickets'],
    queryFn: async () => {
      const response = await fetch(`${config.apiUrl}/tickets`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Error al cargar tickets');
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="bg-red-100 rounded-full p-4 mx-auto mb-4">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-600 text-lg">Error al cargar los datos: {error.message}</p>
        </div>
      </div>
    );
  }

  // Preparar datos para el gráfico de tendencia
  const prepareChartData = () => {
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
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointBackgroundColor: '#3B82F6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8
        }
      ]
    };
  };

  // Preparar datos para el gráfico de rendimiento por agente
  const prepareAgentPerformanceData = () => {
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
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(139, 92, 246, 0.8)'
          ],
          borderRadius: 8,
          borderWidth: 0,
          hoverBackgroundColor: [
            'rgba(59, 130, 246, 1)',
            'rgba(16, 185, 129, 1)',
            'rgba(245, 158, 11, 1)',
            'rgba(239, 68, 68, 1)',
            'rgba(139, 92, 246, 1)'
          ]
        }
      ]
    };
  };

  const getDateRange = () => {
    const now = new Date();
    switch (timeRange) {
      case 'day':
        return {
          start: subWeeks(now, 1),
          end: now
        };
      case 'week':
        return {
          start: subWeeks(now, 4),
          end: now
        };
      case 'month':
        return {
          start: subWeeks(now, 12),
          end: now
        };
      default:
        return {
          start: subWeeks(now, 4),
          end: now
        };
    }
  };

  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Inter', sans-serif",
            size: 14,
            weight: '600'
          },
          usePointStyle: true,
          padding: 20
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3B82F6',
        borderWidth: 2,
        padding: 12,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 12
          },
          color: '#6B7280'
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawBorder: false
        }
      },
      x: {
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 12
          },
          color: '#6B7280'
        },
        grid: {
          display: false
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  const verticalBarOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Inter', sans-serif",
            size: 14,
            weight: '600'
          },
          usePointStyle: true,
          padding: 20
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3B82F6',
        borderWidth: 2,
        padding: 12,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 12
          },
          color: '#6B7280'
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawBorder: false
        }
      },
      x: {
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 12
          },
          color: '#6B7280'
        },
        grid: {
          display: false
        }
      }
    }
  };

  const horizontalBarOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3B82F6',
        borderWidth: 2,
        padding: 12,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      y: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 12
          },
          color: '#6B7280'
        }
      },
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawBorder: false
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 12
          },
          color: '#6B7280'
        }
      }
    }
  };

  // Calcular estadísticas generales
  const totalTickets = tickets.length;
  const pendingTickets = tickets.filter(t => !t.agente).length;
  const completedTickets = tickets.filter(t => t.agente).length;
  const avgResponseTime = tickets.length > 0 ? Math.round(tickets.reduce((acc, t) => acc + (t.agente ? 1 : 0), 0) / tickets.length * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      {/* Header con estadísticas principales */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard de TK Soporte</h1>
        <p className="text-gray-600">Resumen general del sistema de tickets</p>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Tickets</p>
              <p className="text-3xl font-bold">{totalTickets}</p>
            </div>
            <div className="bg-blue-400 rounded-full p-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Completados</p>
              <p className="text-3xl font-bold">{completedTickets}</p>
            </div>
            <div className="bg-green-400 rounded-full p-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Pendientes</p>
              <p className="text-3xl font-bold">{pendingTickets}</p>
            </div>
            <div className="bg-yellow-400 rounded-full p-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Tasa de Respuesta</p>
              <p className="text-3xl font-bold">{avgResponseTime}%</p>
            </div>
            <div className="bg-purple-400 rounded-full p-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Fila de gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gráfico de Tendencia */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                Tendencia de Tickets
              </h3>
              <div className="flex gap-2">
                {(['day', 'week', 'month'] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      timeRange === range
                        ? 'bg-blue-600 text-white shadow-md transform scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {range === 'day' ? 'Diario' : range === 'week' ? 'Semanal' : 'Mensual'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="h-[300px]">
              <Line options={lineChartOptions} data={prepareChartData()} />
            </div>
          </div>
        </div>

        {/* Gráfico de Rendimiento por Agente */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              Rendimiento por Agente
            </h3>
          </div>
          <div className="p-6">
            <div className="h-[300px]">
              <Bar options={verticalBarOptions} data={prepareAgentPerformanceData()} />
            </div>
          </div>
        </div>
      </div>

      {/* Fila de gráficos de área y categoría */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gráfico de Atenciones por Área */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
              Atenciones por Área
            </h3>
          </div>
          <div className="p-6">
            <div className="h-[300px]">
              <Bar
                options={horizontalBarOptions}
                data={{
                  labels: Object.entries(tickets?.reduce((acc, ticket) => {
                    acc[ticket.area] = (acc[ticket.area] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>) || {})
                    .sort(([, a], [, b]) => b - a)
                    .map(([area]) => area),
                  datasets: [{
                    data: Object.entries(tickets?.reduce((acc, ticket) => {
                      acc[ticket.area] = (acc[ticket.area] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>) || {})
                      .sort(([, a], [, b]) => b - a)
                      .map(([, count]) => count),
                    backgroundColor: 'rgba(139, 92, 246, 0.8)',
                    borderRadius: 8,
                    borderWidth: 0,
                    hoverBackgroundColor: 'rgba(139, 92, 246, 1)'
                  }]
                }}
              />
            </div>
          </div>
        </div>

        {/* Gráfico de Atenciones por Categoría */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
              Atenciones por Categoría
            </h3>
          </div>
          <div className="p-6">
            <div className="h-[300px]">
              <Bar
                options={horizontalBarOptions}
                data={{
                  labels: Object.entries(tickets?.reduce((acc, ticket) => {
                    acc[ticket.category] = (acc[ticket.category] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>) || {})
                    .sort(([, a], [, b]) => b - a)
                    .map(([category]) => category),
                  datasets: [{
                    data: Object.entries(tickets?.reduce((acc, ticket) => {
                      acc[ticket.category] = (acc[ticket.category] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>) || {})
                      .sort(([, a], [, b]) => b - a)
                      .map(([, count]) => count),
                    backgroundColor: 'rgba(245, 158, 11, 0.8)',
                    borderRadius: 8,
                    borderWidth: 0,
                    hoverBackgroundColor: 'rgba(245, 158, 11, 1)'
                  }]
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de tickets recientes */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
          <h4 className="text-xl font-semibold text-gray-900 flex items-center">
            <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
            Tickets Recientes
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Solicitante
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Solicitud
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Categoría
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets?.slice(0, 5).map((ticket, index) => (
                <tr key={`${ticket.createdAt}-${ticket.solicitante}-${index}`} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {ticket.solicitante}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                    {ticket.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-200">
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