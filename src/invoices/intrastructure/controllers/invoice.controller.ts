import { Controller, Get, Param } from '@nestjs/common';
import { InvoiceService } from '../services/invoice.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  listInvoices() {
    return this.invoiceService.listInvoices();
  }
  @Get(':idPassenger')
  listPassengerInvoices(@Param('idPassenger') idPassenger: number) {
    return this.invoiceService.listPassengerInvoices(idPassenger);
  }
}
