// src/reports/templates/report.template.ts
import { CreateReportDto } from '../dto/create-report.dto';

export const generateReportTemplate = (
  dto: CreateReportDto,
  photoUrl: string,
): string => {
  const severityColor =
    dto.severity === 'high'
      ? 'red'
      : dto.severity === 'medium'
        ? 'orange'
        : 'green';

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto;">
      <h2 style="color: #0056b3;">💧 WaterLeak -🚨  Nuevo Reporte de Fuga de Agua 🚨  </h2>
      <p>Se ha registrado un nuevo reporte en el sistema. A continuación los detalles:</p>
      
      <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr style="background-color: #f8f9fa;">
          <td style="width: 30%;"><strong>Dirección:</strong></td>
          <td>${dto.address}</td>
        </tr>
        <tr>
          <td><strong>Descripción:</strong></td>
          <td>${dto.description}</td>
        </tr>
        <tr style="background-color: #f8f9fa;">
          <td><strong>Severidad:</strong></td>
          <td style="color: ${severityColor}; font-weight: bold; text-transform: uppercase;">
            ${dto.severity}
          </td>
        </tr>
        <tr>
          <td><strong>Contacto:</strong></td>
          <td>${dto.reporterPhone}</td>
        </tr>
      </table>

      <div style="margin-top: 20px; text-align: center;">
        <p style="text-align: left;"><strong>Evidencia Fotográfica:</strong></p>
        <img 
          src="${photoUrl}" 
          alt="Foto de la fuga de agua" 
          style="max-width: 100%; height: auto; border-radius: 6px; border: 1px solid #ccc;" 
        />
      </div>
      
      <p style="margin-top: 20px; font-size: 0.9em; color: #555;">
        Sistema automatizado de notificaciones de fugas.
      </p>
    </div>
  `;
};
