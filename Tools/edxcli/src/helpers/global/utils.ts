import { ATWebsiteFields } from '../airtable';

export function isCountedSite(data: ATWebsiteFields): boolean {
  return (
    (data['Digital Brand Category'] === 'Hybrid' ||
      data['Digital Brand Category'] === 'GSA Business') &&
    (data['Prod Status'] === 'production' ||
      data['Prod Status'] === 'archived') &&
    (data['Type of Domain'] === 'Informational' ||
      data['Type of Domain'] === 'Application' ||
      data['Type of Domain'] === 'Application Login')
  );
}
