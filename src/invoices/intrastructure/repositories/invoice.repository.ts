import { Injectable } from '@nestjs/common';
import { InvoiceEntity } from '../entities/invoice.entity';
import { InjectModel } from '@nestjs/sequelize';
import { InvoiceRepository } from 'src/invoices/domain/contracts/invoice.repository';
import Invoice from 'src/invoices/domain/models/invoice.model';
import { Op } from 'sequelize';
import InvoiceMapper from '../mappers/invoice.mapper';

@Injectable()
export class InvoceRepositoryPostgrest implements InvoiceRepository {
  constructor(
    @InjectModel(InvoiceEntity)
    private readonly invoiceEntity: typeof InvoiceEntity,
  ) {}

  async getInvoices(): Promise<Invoice[]> {
    const invoces = await this.invoiceEntity.findAll({
      where: {
        status: {
          [Op.not]: 'I',
        },
      },
    });
    return InvoiceMapper.EntitiesToDomains(invoces);
  }
  async getInvoicesByPassenger(idPassenger: number): Promise<Invoice[]> {
    const invoces = await this.invoiceEntity.findAll({
      where: {
        status: {
          [Op.not]: 'I',
        },
        idPassenger: {
          [Op.eq]: idPassenger,
        },
      },
    });
    return InvoiceMapper.EntitiesToDomains(invoces);
  }
  async generateInvoice(invoce: Invoice): Promise<Invoice> {
    const invoiceDomain = InvoiceMapper.DomainToEntity(invoce).dataValues;
    const invoiceEntity = await this.invoiceEntity.create(invoiceDomain);
    return InvoiceMapper.EntityToDomain(invoiceEntity);
  }
}
