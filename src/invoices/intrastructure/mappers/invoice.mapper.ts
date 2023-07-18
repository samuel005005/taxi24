import { InvoiceEntity } from '../entities/invoice.entity';
import Invoice from 'src/invoices/domain/models/invoice.model';

export default class InvoiceMapper {
  public static DomainToEntity(invoice: Invoice): InvoiceEntity {
    const invoiceEntity = new InvoiceEntity();
    invoiceEntity.idTravel = invoice.getIdTravel;
    invoiceEntity.idPassenger = invoice.getIdPassenger;
    invoiceEntity.amount = invoice.getAmount;
    return invoiceEntity;
  }
  public static EntityToDomain(invoiceEntity: InvoiceEntity) {
    const driver = new Invoice(
      invoiceEntity.idTravel,
      invoiceEntity.idPassenger,
      invoiceEntity.amount,
      invoiceEntity.status,
      invoiceEntity.createdAt,
      invoiceEntity.id,
    );

    return driver;
  }

  public static EntitiesToDomains(invoiceEntity: InvoiceEntity[]): Invoice[] {
    const invoices = invoiceEntity.map((invoiceEntity) =>
      this.EntityToDomain(invoiceEntity),
    );
    return invoices;
  }
}
