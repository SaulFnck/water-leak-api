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

  //Nuevas columnas para photo en aws
  @Column()
  photoUrl!: string;

  //Nuevas columnas para photo en aws
  @Column({ type: 'varchar', nullable: true })
  repairPhotoUrl!: string | null;

  @Column({ default: false })
  isResolved!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
