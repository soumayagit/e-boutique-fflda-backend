// src/modules/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetEmail(email: string, token: string): Promise<void> {
    const resetUrl = `https://ton-site.com/reset-password?token=${token}`;
    await this.mailerService.sendMail({
      to:      email,
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
async sendInvoice(
    email: string,
    firstName: string,
    orderId: string,
    pdfBuffer: Buffer,
  ): Promise<void> {
    const shortId = orderId.substring(0, 8).toUpperCase();
    await this.mailerService.sendMail({
      to:      email,
      subject: `🧾 Votre facture — Commande #${shortId}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D1B3E;padding:20px;text-align:center;">
            <h1 style="color:white;margin:0;">🧾 Votre facture</h1>
          </div>
          <div style="padding:20px;">
            <p>Bonjour <strong>${firstName}</strong>,</p>
            <p>Vous trouverez ci-joint la facture de votre commande <strong>#${shortId}</strong>.</p>
            <p>Merci pour votre confiance !</p>
          </div>
          <div style="background:#f0f0f0;padding:10px;text-align:center;font-size:12px;color:gray;">
            E-Boutique FFLDA · France Fédération de Lutte et Disciplines Associées<br>
            Cet email est automatique, merci de ne pas y répondre.
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `facture-${shortId}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });
  }
  async sendOrderConfirmation(
    email: string,
    firstName: string,
    orderId: string,
    items: { name: string; quantity: number; price: number }[],
    total: number,
  ): Promise<void> {
    const itemsHtml = items
      .map(i => `<tr><td>${i.name}</td><td>${i.quantity}</td><td>${i.price} €</td></tr>`)
      .join('');

    await this.mailerService.sendMail({
      to:      email,
      subject: `✅ Votre commande est confirmée`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D1B3E;padding:20px;text-align:center;">
            <h1 style="color:white;margin:0;">✅ Commande confirmée !</h1>
          </div>
          <div style="padding:20px;">
            <p>Bonjour <strong>${firstName}</strong>,</p>
            <p>Votre commande <strong>#${orderId.substring(0, 8).toUpperCase()}</strong> a été confirmée.</p>
            <table border="1" cellpadding="8" style="width:100%;border-collapse:collapse;">
              <tr style="background:#f0f0f0;"><th>Produit</th><th>Quantité</th><th>Prix</th></tr>
              ${itemsHtml}
            </table>
            <p style="font-size:18px;"><strong>Total : ${total} €</strong></p>
            <p>Nous vous contacterons dès que votre commande est expédiée.</p>
          </div>
          <div style="background:#f0f0f0;padding:10px;text-align:center;font-size:12px;color:gray;">
            E-Boutique FFLDA · France Fédération de Lutte et Disciplines Associées
          </div>
        </div>
      `,
    });
  }

  // ── Emails statuts commande ───────────────────────────────────────────────

  async sendOrderStatusConfirmed(
    email: string,
    firstName: string,
    orderId: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to:      email,
      subject: `✅ Votre commande est confirmée`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D1B3E;padding:20px;text-align:center;">
            <h1 style="color:white;margin:0;">✅ Commande confirmée !</h1>
          </div>
          <div style="padding:20px;">
            <p>Bonjour <strong>${firstName}</strong>,</p>
            <p>Votre commande <strong>#${orderId.substring(0, 8).toUpperCase()}</strong> a été confirmée par notre équipe.</p>
            <p>Nous préparons votre colis et vous informerons dès son expédition.</p>
          </div>
          <div style="background:#f0f0f0;padding:10px;text-align:center;font-size:12px;color:gray;">
            E-Boutique FFLDA · France Fédération de Lutte et Disciplines Associées<br>
            Cet email est automatique, merci de ne pas y répondre.
          </div>
        </div>
      `,
    });
  }

  async sendOrderShipped(
    email: string,
    firstName: string,
    orderId: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to:      email,
      subject: `🚚 Votre commande est expédiée`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D1B3E;padding:20px;text-align:center;">
            <h1 style="color:white;margin:0;">🚚 Commande expédiée !</h1>
          </div>
          <div style="padding:20px;">
            <p>Bonjour <strong>${firstName}</strong>,</p>
            <p>Votre commande <strong>#${orderId.substring(0, 8).toUpperCase()}</strong> est en route !</p>
            <p>Vous recevrez votre colis sous 2 à 4 jours ouvrés via Colissimo.</p>
          </div>
          <div style="background:#f0f0f0;padding:10px;text-align:center;font-size:12px;color:gray;">
            E-Boutique FFLDA · France Fédération de Lutte et Disciplines Associées<br>
            Cet email est automatique, merci de ne pas y répondre.
          </div>
        </div>
      `,
    });
  }

  async sendOrderDelivered(
    email: string,
    firstName: string,
    orderId: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to:      email,
      subject: `📦 Votre commande a été livrée`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#1D9E75;padding:20px;text-align:center;">
            <h1 style="color:white;margin:0;">📦 Commande livrée !</h1>
          </div>
          <div style="padding:20px;">
            <p>Bonjour <strong>${firstName}</strong>,</p>
            <p>Votre commande <strong>#${orderId.substring(0, 8).toUpperCase()}</strong> a été livrée.</p>
            <p>Nous espérons que vous êtes satisfait de votre achat !</p>
            <p>N'hésitez pas à laisser un avis sur notre boutique.</p>
          </div>
          <div style="background:#f0f0f0;padding:10px;text-align:center;font-size:12px;color:gray;">
            E-Boutique FFLDA · France Fédération de Lutte et Disciplines Associées<br>
            Cet email est automatique, merci de ne pas y répondre.
          </div>
        </div>
      `,
    });
  }

  async sendOrderCancelled(
    email: string,
    firstName: string,
    orderId: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to:      email,
      subject: `❌ Votre commande a été annulée`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#E30613;padding:20px;text-align:center;">
            <h1 style="color:white;margin:0;">❌ Commande annulée</h1>
          </div>
          <div style="padding:20px;">
            <p>Bonjour <strong>${firstName}</strong>,</p>
            <p>Votre commande <strong>#${orderId.substring(0, 8).toUpperCase()}</strong> a été annulée.</p>
            <p>Si vous avez des questions, contactez-nous.</p>
          </div>
          <div style="background:#f0f0f0;padding:10px;text-align:center;font-size:12px;color:gray;">
            E-Boutique FFLDA · France Fédération de Lutte et Disciplines Associées<br>
            Cet email est automatique, merci de ne pas y répondre.
          </div>
        </div>
      `,
    });
  }
  // ── Notification admin : nouvelle commande ────────────────────────────────

async sendAdminNewOrder(
  email: string,
  adminName: string,
  orderId: string,
  total: number,
  requiresValidation: boolean,
): Promise<void> {
  const shortId = orderId.substring(0, 8).toUpperCase();
  const subject = requiresValidation
    ? `🛠️ Commande sur-mesure à valider — #${shortId}`
    : `🛒 Nouvelle commande — #${shortId}`;

  await this.mailerService.sendMail({
    to:      email,
    subject,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:${requiresValidation ? '#185FA5' : '#0D1B3E'};padding:20px;text-align:center;">
          <h1 style="color:white;margin:0;">${requiresValidation ? '🛠️ Commande à valider' : '🛒 Nouvelle commande'}</h1>
        </div>
        <div style="padding:20px;">
          <p>Bonjour <strong>${adminName}</strong>,</p>
          <p>${requiresValidation
            ? 'Une commande contenant un article sur-mesure attend votre validation avant paiement.'
            : 'Une nouvelle commande vient d\'être passée sur la boutique.'}</p>
          <p><strong>Commande :</strong> #${shortId}</p>
          <p><strong>Montant :</strong> ${total.toFixed(2)} €</p>
          <p>Connectez-vous à l'interface admin pour la consulter.</p>
        </div>
        <div style="background:#f0f0f0;padding:10px;text-align:center;font-size:12px;color:gray;">
          E-Boutique FFLDA · France Fédération de Lutte et Disciplines Associées<br>
          Cet email est automatique, merci de ne pas y répondre.
        </div>
      </div>
    `,
  });
}
}