import { Controller, Get } from '@nestjs/common';
import { MailService } from '../mail.service';
import { Public } from '../../auth/infrastructure/decorators/public.decorator';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @Get('test')
  async testMail() {
    await this.mailService.sendMail(
      'slimsoumaya94@gmail.com',
      'Mail envoyé',
      `
        <h1>Email envoyé avec succès 🚀</h1>
        <p>Si tu vois ce mail, ton SMTP fonctionne correctement.</p>
      `,
    );

    return {
      success: true,
      message: 'Email envoyé avec succès',
    };
  }
}