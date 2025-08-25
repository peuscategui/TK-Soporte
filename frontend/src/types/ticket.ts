export interface Ticket {
  createdAt: Date;      // Fecha de Registro
  solicitante: string;  // Solicitante
  description: string;  // Solicitud
  category: string;     // Categoría
  agente: string;      // Agente
  area: string;        // Área
}

export interface QueryTicketsDto {
  page?: number;
  limit?: number;
  search?: string;
}