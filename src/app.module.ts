// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { ReportsModule } from './reports/reports.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      //entities: [],
      //migrations: [],
      autoLoadEntities: true,
      migrationsRun: true,
    }),
    AuthModule,
    EmailModule,
    ReportsModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
