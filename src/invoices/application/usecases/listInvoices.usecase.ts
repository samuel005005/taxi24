import { InvoiceRepository } from 'src/invoices/domain/contracts/invoice.repository';
import Invoice from 'src/invoices/domain/models/invoice.model';

export default class ListInvoicesUseCase {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  public handler(): Promise<Invoice[]> {
    return this.invoiceRepository.getInvoices();
  }
}
