// src/reports/reports.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile as UploadedFileDecorator,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import type { UploadedFile } from '../storage/storage.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @Body() createReportDto: CreateReportDto,
    @UploadedFileDecorator() file?: UploadedFile,
  ) {
    if (!file) {
      throw new BadRequestException('El archivo photo es obligatorio');
    }

    return this.reportsService.create(createReportDto, file);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
}
