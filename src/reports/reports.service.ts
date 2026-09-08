// src/reports/reports.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { EmailService } from '../email/email.service';
import { generateReportTemplate } from './templates/report.template';
import { envs } from '../config/envs';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    private readonly emailService: EmailService,
  ) {}

  async create(createReportDto: CreateReportDto) {
    // 1. Crear y guardar en BD
    const report = this.reportRepository.create(createReportDto);
    const savedReport = await this.reportRepository.save(report);

    // 2. Generar el HTML
    const htmlTemplate = generateReportTemplate(createReportDto);

    // 3. Enviar correo
    await this.emailService.sendEmail(
      envs.MAILER_EMAIL,
      `Nuevo Reporte de Fuga: ${createReportDto.severity.toUpperCase()}`,
      htmlTemplate,
    );

    return savedReport;
  }

  async findAll() {
    return this.reportRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
