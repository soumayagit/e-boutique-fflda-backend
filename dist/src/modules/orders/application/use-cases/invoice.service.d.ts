import { PrismaService } from '../../../../../prisma/prisma.service';
export declare class InvoiceService {
    private readonly prisma;
    private readonly COMPANY_NAME;
    private readonly COMPANY_ADDRESS;
    constructor(prisma: PrismaService);
    getOrCreateInvoiceNumber(orderId: string, totalTTC: number, createdBy?: string): Promise<string>;
    generateInvoicePdf(order: any, invoiceNumber: string): Promise<Buffer>;
}
