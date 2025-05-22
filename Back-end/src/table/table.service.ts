// Back-end/src/table/table.service.ts
import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class TableService {
  async generateQR(tableId: string) {
    const url = `http://localhost:3000/table-login/${tableId}`;
    try {
      const qr = await QRCode.toDataURL(url);
      return { qr };
    } catch (error) {
      throw new Error('Failed to generate QR');
    }
  }
}