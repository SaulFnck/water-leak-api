// src/email/email.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envs } from '../config/envs';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(to: string, subject: string, htmlTemplate: string) {
    try {
      await this.transporter.sendMail({
        from: `"API Fugas de Agua" <${envs.MAILER_EMAIL}>`,
        to,
        subject,
        html: htmlTemplate,
      });
      this.logger.log(`Correo de notificación enviado a: ${to}`);
    } catch (error) {
      this.logger.error('Error al enviar el correo:', error);
    }
  }
}
