// src/reports/templates/report.template.ts
import { CreateReportDto } from '../dto/create-report.dto';

export const generateReportTemplate = (
  dto: CreateReportDto,
  photoUrl: string,
): string => {
  const severityConfig =
    dto.severity === 'high'
      ? { bg: '#fee2e2', text: '#991b1b', label: 'ALTA (HIGH)' }
      : dto.severity === 'medium'
        ? { bg: '#fef3c7', text: '#92400e', label: 'MEDIA (MEDIUM)' }
        : { bg: '#d1fae5', text: '#065f46', label: 'BAJA (LOW)' };

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f8fafc; padding: 32px 16px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 560px;">
              
              <!-- Header estilo Next.js -->
              <tr>
                <td style="padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
                  <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #0f172a;">
                    Water Leak Reports
                  </h1>
                  <p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">
                    Nuevo reporte de fuga registrado en el sistema
                  </p>
                </td>
              </tr>

              <!-- Espaciador -->
              <tr><td style="height: 20px;"></td></tr>

              <!-- Tarjeta principal (estilo ReportList.tsx) -->
              <tr>
                <td style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                  
                  <!-- Imagen superior desde S3 -->
                  <a href="${photoUrl}" target="_blank" rel="noopener noreferrer" style="display: block; text-decoration: none;">
                    <img
                      src="${photoUrl}"
                      alt="Fuga en ${dto.address}"
                      style="display: block; width: 100%; max-height: 280px; object-fit: cover; border-bottom: 1px solid #e2e8f0;"
                    />
                  </a>

                  <!-- Contenido de la tarjeta -->
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding: 20px 24px;">
                    
                    <!-- Badge de severidad + Estado -->
                    <tr>
                      <td style="padding-bottom: 12px;">
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td align="left">
                              <span style="display: inline-block; background-color: ${severityConfig.bg}; color: ${severityConfig.text}; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; letter-spacing: 0.03em;">
                                ${severityConfig.label}
                              </span>
                            </td>
                            <td align="right" style="font-size: 12px; font-weight: 600; color: #d97706;">
                              Pendiente
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Dirección -->
                    <tr>
                      <td style="padding-bottom: 8px;">
                        <h2 style="margin: 0; font-size: 18px; font-weight: 600; color: #0f172a;">
                          ${dto.address}
                        </h2>
                      </td>
                    </tr>

                    <!-- Descripción -->
                    <tr>
                      <td style="padding-bottom: 16px;">
                        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #475569;">
                          ${dto.description}
                        </p>
                      </td>
                    </tr>

                    <!-- Divider y datos de contacto -->
                    <tr>
                      <td style="border-top: 1px solid #f1f5f9; padding-top: 14px;">
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td align="left" style="font-size: 13px; color: #64748b;">
                              <strong style="color: #334155;">Tel:</strong> ${dto.reporterPhone}
                            </td>
                            <td align="right">
                              <a
                                href="${photoUrl}"
                                target="_blank"
                                rel="noopener noreferrer"
                                style="display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 12px; font-weight: 600; text-decoration: none; padding: 8px 14px; border-radius: 8px;"
                              >
                                Ver evidencia en S3
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="padding-top: 20px; font-size: 12px; color: #64748b;">
                  Sistema automatizado de notificaciones · Water Leak Reports
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};
