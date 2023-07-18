import { InvoiceRepository } from 'src/invoices/domain/contracts/invoice.repository';
import Invoice from 'src/invoices/domain/models/invoice.model';

export default class ListPassengerInvoicesUseCase {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  public handler(idPassenger: number): Promise<Invoice[]> {
    return this.invoiceRepository.getInvoicesByPassenger(idPassenger);
  }
}
