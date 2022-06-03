import { ATWebsiteFields } from '../airtable';
import fs from 'node:fs';

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

export function writeJSONFile(
  jsonData: any[] | any,
  path: string,
  filename: string,
  date?: string,
): void {
  path = path.endsWith('/') ? path : `${path}/`;
  fs.mkdir(path, { recursive: true }, (dirErr: any) => {
    if (dirErr) console.error(dirErr);
  });
  date = date ? `_${date}` : '';

  fs.writeFile(
    `${path}${filename}${date}.json`,
    JSON.stringify(jsonData),
    (err: any) => {
      if (err) {
        console.error(err);
      }
    },
  );
}
