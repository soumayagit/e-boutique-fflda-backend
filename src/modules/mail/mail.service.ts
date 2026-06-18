// src/modules/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  // ← utilisé par auth (reset password)
  async sendResetEmail(email: string, token: string): Promise<void> {
    const resetUrl = `https://ton-site.com/reset-password?token=${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Réinitialisation de votre mot de passe',
      html: `
        <h1>Réinitialisation de mot de passe</h1>
        <p>Clique sur ce lien pour réinitialiser ton mot de passe :</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>Ce lien expire dans 1 heure.</p>
      `,
    });
  }
async sendMail(to: string, subject: string, html: string): Promise<void> {
  await this.mailerService.sendMail({ to, subject, html });
}
  // ← utilisé par orders (confirmation commande)
  async sendOrderConfirmation(
    email: string,
    firstName: string,
    orderId: string,
    items: { name: string; quantity: number; price: number }[],
    total: number,
  ): Promise<void> {
    const itemsHtml = items
      .map(i => `<tr><td>${i.name}</td><td>${i.quantity}</td><td>${i.price}  €</td></tr>`)
      .join('');

    await this.mailerService.sendMail({
      to: email,
      subject: `Votre commande est bien reçue 🛍️`,

      html: `
        <h1>Merci pour votre commande ! 🎉</h1>
        <p>Bonjour ${firstName},</p>
        <p>Votre commande a bien été reçue.</p>
        <table border="1" cellpadding="8">
          <tr><th>Produit</th><th>Quantité</th><th>Prix</th></tr>
          ${itemsHtml}
        </table>
        <p><strong>Total : ${total}  €</strong></p>
        <p>Nous vous contacterons dès que votre commande est expédiée.</p>
      `,
    });
  }
}