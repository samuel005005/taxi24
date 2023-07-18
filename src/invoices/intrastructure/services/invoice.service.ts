import { Inject, Injectable } from '@nestjs/common';
import {
  ListInvoices,
  ListPassengerInvoices,
} from 'src/invoices/application/usecases';

import { InvoiceRepository } from 'src/invoices/domain/contracts/invoice.repository';

@Injectable()
export class InvoiceService {
  private readonly listPassengerInvoice: ListPassengerInvoices;
  private readonly listInvoice: ListInvoices;
  constructor(
    @Inject('InvoiceRepository')
    private readonly invoiceRepository: InvoiceRepository,
  ) {
    this.listInvoice = new ListInvoices(this.invoiceRepository);
    this.listPassengerInvoice = new ListPassengerInvoices(
      this.invoiceRepository,
    );
  }

  async listInvoices() {
    return this.listInvoice.handler();
  }

  async listPassengerInvoices(idPassenger: number) {
    return this.listPassengerInvoice.handler(idPassenger);
  }
}
