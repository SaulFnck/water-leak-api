// src/storage/storage.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { envs } from '../config/envs';
import { randomUUID } from 'crypto';
import { extname } from 'path';

export interface UploadedFile {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}

@Injectable()
export class StorageService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;

  constructor() {
    this.region = envs.AWS_REGION;
    this.bucketName = envs.AWS_BUCKET_NAME;

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: envs.AWS_ACCESS_KEY_ID,
        secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: UploadedFile, folder: string): Promise<string> {
    const fileExtension = extname(file.originalname);
    const fileName = `${randomUUID()}${fileExtension}`;
    const cleanFolder = folder.replace(/^\/+|\/+$/g, ''); // Limpia "/" ej. reports/ -> reports
    const key = `${cleanFolder}/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      await this.s3Client.send(command);
      return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al subir el archivo a S3: ${(error as Error).message}`,
      );
    }
  }
}
