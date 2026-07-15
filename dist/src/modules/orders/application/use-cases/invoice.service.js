"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const pdfkit_1 = __importDefault(require("pdfkit"));
const prisma_service_1 = require("../../../../../prisma/prisma.service");
let InvoiceService = class InvoiceService {
    prisma;
    COMPANY_NAME = 'E-Boutique FFLDA';
    COMPANY_ADDRESS = 'France Fédération de Lutte et Disciplines Associées';
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOrCreateInvoiceNumber(orderId, totalTTC, createdBy) {
        const existing = await this.prisma.invoice.findUnique({ where: { orderId } });
        if (existing)
            return existing.invoiceNumber;
        const year = new Date().getFullYear();
        const count = await this.prisma.invoice.count({
            where: { invoiceNumber: { startsWith: `FFLDA-${year}-` } },
        });
        const sequence = String(count + 1).padStart(5, '0');
        const invoiceNumber = `FFLDA-${year}-${sequence}`;
        await this.prisma.invoice.create({
            data: { orderId, invoiceNumber, totalTTC, createdBy: createdBy ?? null },
        });
        return invoiceNumber;
    }
    async generateInvoicePdf(order, invoiceNumber) {
        return new Promise((resolve, reject) => {
            const doc = new pdfkit_1.default({ size: 'A4', margin: 50 });
            const chunks = [];
            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', reject);
            doc
                .fontSize(20).fillColor('#0D1B3E').text(this.COMPANY_NAME, 50, 50)
                .fontSize(10).fillColor('#555').text(this.COMPANY_ADDRESS, 50, 75);
            doc
                .fontSize(16).fillColor('#0D1B3E').text('FACTURE', 400, 50, { align: 'right' })
                .fontSize(10).fillColor('#555')
                .text(`N° ${invoiceNumber}`, 400, 75, { align: 'right' })
                .text(`Date : ${new Date(order.createdAt).toLocaleDateString('fr-FR')}`, 400, 90, { align: 'right' });
            doc.moveTo(50, 115).lineTo(545, 115).strokeColor('#ccc').stroke();
            doc
                .fontSize(12).fillColor('#000').text('Facturé à :', 50, 130)
                .fontSize(10)
                .text(`${order.address.firstName} ${order.address.lastName}`, 50, 148)
                .text(order.address.address, 50, 163)
                .text(`${order.address.postalCode} ${order.address.city}`, 50, 178)
                .text(order.address.phone ?? '', 50, 193);
            let y = 240;
            doc.fontSize(10).rect(50, y, 495, 20).fill('#0D1B3E');
            doc.fillColor('#fff')
                .text('Produit', 55, y + 6)
                .text('Qté', 300, y + 6)
                .text('Prix HT', 350, y + 6)
                .text('TVA', 420, y + 6)
                .text('Total TTC', 470, y + 6);
            y += 25;
            doc.fillColor('#000');
            for (const item of order.items) {
                doc.fontSize(9)
                    .text(item.productName + (item.size ? ` (${item.size})` : ''), 55, y, { width: 240 })
                    .text(String(item.quantity), 300, y)
                    .text(`${item.priceHT.toFixed(2)} €`, 350, y)
                    .text(`${item.tva.toFixed(2)} €`, 420, y)
                    .text(`${item.subtotal.toFixed(2)} €`, 470, y);
                y += 20;
            }
            doc.moveTo(50, y + 5).lineTo(545, y + 5).strokeColor('#ccc').stroke();
            y += 20;
            doc.fontSize(10)
                .text('Sous-total HT :', 380, y).text(`${order.subtotalHT.toFixed(2)} €`, 480, y, { align: 'right' });
            y += 15;
            doc.text('Livraison HT :', 380, y).text(`${order.shippingHT.toFixed(2)} €`, 480, y, { align: 'right' });
            y += 15;
            doc.text(`TVA (${order.tvaRate}%) :`, 380, y).text(`${order.totalTVA.toFixed(2)} €`, 480, y, { align: 'right' });
            y += 20;
            doc.fontSize(13).fillColor('#0D1B3E')
                .text('TOTAL TTC :', 380, y).text(`${order.total.toFixed(2)} €`, 480, y, { align: 'right' });
            doc.fontSize(8).fillColor('#999')
                .text(`${this.COMPANY_NAME} — Merci de votre confiance.`, 50, 750, { align: 'center', width: 495 });
            doc.end();
        });
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map