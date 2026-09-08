// src/reports/dto/create-report.dto.ts
import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsIn(['low', 'medium', 'high'], {
    message: 'severity debe ser low, medium o high',
  })
  severity!: string;

  @IsString()
  @IsNotEmpty()
  reporterPhone!: string;
}
