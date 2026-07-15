import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendResetEmail(email: string, token: string): Promise<void>;
    sendMail(to: string, subject: string, html: string): Promise<void>;
    sendInvoice(email: string, firstName: string, orderId: string, pdfBuffer: Buffer): Promise<void>;
    sendOrderConfirmation(email: string, firstName: string, orderId: string, items: {
        name: string;
        quantity: number;
        price: number;
    }[], total: number): Promise<void>;
    sendOrderStatusConfirmed(email: string, firstName: string, orderId: string): Promise<void>;
    sendOrderShipped(email: string, firstName: string, orderId: string): Promise<void>;
    sendOrderDelivered(email: string, firstName: string, orderId: string): Promise<void>;
    sendOrderCancelled(email: string, firstName: string, orderId: string): Promise<void>;
    sendAdminNewOrder(email: string, adminName: string, orderId: string, total: number, requiresValidation: boolean): Promise<void>;
}
