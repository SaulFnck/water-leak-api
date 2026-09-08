// src/reports/entities/report.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('WATER_REPORT')
export class Report {
  @PrimaryGeneratedColumn('increment') // Genera un id serial autoincrementable
  id!: number;

  @Column()
  address!: string;

  @Column()
  description!: string;

  @Column()
  severity!: string; // low / medium / high

  @Column()
  reporterPhone!: string;

  @Column({ default: false })
  isResolved!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
