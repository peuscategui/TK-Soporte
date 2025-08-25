import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Ticket } from '../types/ticket';

const TicketList: React.FC = () => {
  const { data: tickets, isLoading } = useQuery<Ticket[]>({
    queryKey: ['tickets'],
    queryFn: async () => {
      const response = await axios.get('/tickets');
      return response.data;
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-white px-6 py-4 border-b">
        <h1 className="text-xl font-medium">Sistema de Tickets</h1>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">Administrador</span>
          <button className="text-gray-600 hover:text-gray-800">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Tickets</h2>
          <button className="bg-[#4CAF50] text-white px-4 py-2 rounded-md text-sm hover:bg-[#43A047] flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Ticket
          </button>
        </div>

        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="bg-[#e8f5e9] rounded-md px-3 py-2 flex items-center">
              <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              <span className="text-sm text-gray-600">Fecha</span>
            </div>
            <input
              type="text"
              placeholder="Buscar por fecha"
              className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <button className="bg-[#e8f5e9] text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-[#c8e6c9]">
              Buscar
            </button>
            <button className="bg-[#e8f5e9] text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-[#c8e6c9] flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Actualizar
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Registros por página:</span>
              <select className="border rounded-md text-sm px-2 py-1">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-[#e8f5e9] text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-[#c8e6c9] flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Exportar
              </button>
              <button className="bg-[#e8f5e9] text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-[#c8e6c9] flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Importar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="bg-white rounded-lg shadow">
          {isLoading ? (
            <div className="p-8 text-center">
              <p>Cargando tickets...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-[#e8f5e9] border-b border-gray-200">
                    <th className="w-4 px-6 py-3">
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Fecha de Registro</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Solicitante</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Solicitud</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Categoría</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Agente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Área</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(tickets || []).map((ticket: Ticket, index: number) => (
                    <tr key={`${ticket.createdAt}-${ticket.solicitante}`} className="hover:bg-gray-50">
                      <td className="w-4 px-6 py-4">
                        <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.solicitante}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.agente}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.area}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center">
              <span className="text-sm text-gray-700">
                Página 1 de 3
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-[#e8f5e9] text-gray-600 rounded-md text-sm hover:bg-[#c8e6c9]">Anterior</button>
              <button className="px-3 py-1 bg-[#e8f5e9] text-gray-600 rounded-md text-sm hover:bg-[#c8e6c9]">Siguiente</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketList;