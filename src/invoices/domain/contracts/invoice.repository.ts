import Invoice from '../models/invoice.model';

export interface InvoiceRepository {
  generateInvoice(trip: Invoice): Promise<Invoice>;
  getInvoicesByPassenger(idPassenger: number): Promise<Invoice[]>;
  getInvoices(): Promise<Invoice[]>;
}
