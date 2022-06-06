import { ATWebsiteFields } from '../airtable';
import fs from 'node:fs';

/**
 * Uses GSA Digital Council guidelines to determine whether this is a site that counts towards performance goals
 * @param {ATWebsiteFields} data record for evaluation
 * @returns {boolean}
 */
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

/**
 * Given a JSON object, writes contents to a file
 * @param {any[] | any} jsonData valid json object
 * @param {string} path desired output path
 * @param {string} filename description of the data to be written.
 * @param {string} date if provided, prepends todays date to the file name e.g., {todays date}_filename.json
 * @return {void}
 */
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
  date = date ? `${date}_` : '';

  fs.writeFile(
    `${path}${date}${filename}.json`,
    JSON.stringify(jsonData),
    (err: any) => {
      if (err) {
        console.error(err);
      }
    },
  );
}
