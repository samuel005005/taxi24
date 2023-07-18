import Invoice from '../models/invoice.model';

export interface InvoiceRepository {
  generateInvoice(trip: Invoice): Promise<Invoice>;
  getInvoicesByPassenger(idPassager: number): Promise<Invoice[]>;
  getInvoices(): Promise<Invoice[]>;
}
