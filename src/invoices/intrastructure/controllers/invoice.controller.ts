import { Controller, Get, Param } from '@nestjs/common';
import { InvoiceService } from '../services/invoice.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @Get()
  listInvoices() {
    return this.invoiceService.listInvoices();
  }

  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @Get(':idPassenger')
  listPassengerInvoices(@Param('idPassenger') idPassenger: number) {
    return this.invoiceService.listPassengerInvoices(idPassenger);
  }
}
