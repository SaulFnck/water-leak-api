// src/reports/reports.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { EmailService } from '../email/email.service';
import { generateReportTemplate } from './templates/report.template';
import { envs } from '../config/envs';
import { StorageService, UploadedFile } from '../storage/storage.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    private readonly emailService: EmailService,
    private readonly storageService: StorageService,
  ) {}

  async create(createReportDto: CreateReportDto, file: UploadedFile) {
    // 1. Subir la foto a la carpeta "reports/" del bucket S3
    const photoUrl = await this.storageService.uploadFile(file, 'reports');

    // 1. Crear y guardar en BD
    const report = this.reportRepository.create({
      ...createReportDto,
      photoUrl,
    });
    const savedReport = await this.reportRepository.save(report);

    // 2. Generar el HTML
    const htmlTemplate = generateReportTemplate(createReportDto, photoUrl);

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
