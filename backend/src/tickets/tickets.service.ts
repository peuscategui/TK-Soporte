import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Ticket } from './entities/ticket.entity';

interface TicketRow {
  createdAt: string;
  solicitante: string;
  description: string;
  category: string;
  agente: string;
  area: string;
}

@Injectable()
export class TicketsService {
  private readonly logger = new Logger(TicketsService.name);

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<Ticket[]> {
    try {
      const result = await this.dataSource.query(`
        SELECT 
          "Fecha de Registro" as "createdAt",
          solicitante,
          solicitud as description,
          categoria as category,
          agente,
          area
        FROM public.tksoporte
        ORDER BY "Fecha de Registro" DESC
      `);

      // Transformar las fechas a formato ISO
      return result.map((ticket: TicketRow) => ({
        ...ticket,
        createdAt: new Date(ticket.createdAt).toISOString()
      }));

    } catch (error) {
      this.logger.error('Error querying database:', error);
      throw error;
    }
  }
}