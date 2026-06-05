// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendResetEmail(email: string, token: string) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: '"E-Boutique FFLDA" <no-reply@fflda.com>',
      to: email,
      subject: 'Réinitialisation de votre mot de passe',
      html: `
        <div style="font-family: Arial; max-width: 500px; margin: auto;">
          <h2 style="color: #0D1B3E;">Réinitialisation du mot de passe</h2>
          <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
          <a href="${resetUrl}"
             style="background: #E63946; color: white; padding: 12px 24px;
                    border-radius: 8px; text-decoration: none; display: inline-block;">
            Réinitialiser mon mot de passe
          </a>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            Ce lien expire dans 1 heure.
          </p>
        </div>
      `,
    });
  }
}