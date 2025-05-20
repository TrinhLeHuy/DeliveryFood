// Back-end/src/table/table.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { TableService } from './table.service';

@Controller('api/table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get(':tableId/qr')
  async generateQR(@Param('tableId') tableId: string) {
    return this.tableService.generateQR(tableId);
  }
}