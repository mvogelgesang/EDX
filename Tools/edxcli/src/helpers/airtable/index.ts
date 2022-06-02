require('dotenv').config();

const AIRTABLE_BASE = 'appaxAzqTVnbOf7cm';

const base = require('airtable').base(AIRTABLE_BASE);
const Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: `${process.env.AIRTABLE_API_KEY}`,
});

export function retrieveWebsite(domain: string): Promise<ATListResponseType> {
  // must return a promise since the "select" function is promise based. https://ckhang.com/blog/2021/javascript-promises-async-await/
  return new Promise<ATListResponseType>((resolve, reject) => {
    base('WEBSITES copy')
      .select({
        filterByFormula: `{Site}="${domain}"`,
        fields: [
          'Touchpoints URL',
          'Site',
          'Office',
          'Sub-Office',
          'Prod Status',
          'Type of Domain',
          'Digital Brand Category',
          'Website Platform',
        ],
        view: 'ALL Sites',
      })
      .firstPage(function (err: any, data: any) {
        if (err) {
          console.error(err);
          console.error('Error occured while searching site', data);
          reject();
        }

        resolve({ records: data });
      });
  });
}

export function updateWebsites(data: ATWebsite[]): Promise<any> {
  return new Promise((resolve, reject) => {
    base('WEBSITES copy').update(
      data,
      function (err: any, records: ATListResponseType) {
        if (err) {
          console.log(err);
          console.log('Error occured while updating website', data);
          reject();
        }

        resolve(records);
      },
    );
  });
}

export function createWebsites(newWebsite: ATWebsiteFields): Promise<any> {
  return new Promise((resolve, reject) => {
    base('WEBSITES copy').create(
      [{ fields: newWebsite }],
      function (err: any, records: ATListResponseType) {
        if (err) {
          console.error(err);
          console.error('Error occured while creating website', records);
          reject();
        }

        resolve(records);
      },
    );
  });
}

export type ATListResponseType = {
  records: ATWebsite[];
};

export type ATWebsite = {
  id: string;
  createdTime?: Date;
  fields: ATWebsiteFields;
};

export type ATWebsiteFields = {
  Site?: string;
  'USWDS, Performance'?: string[];
  Office?: string;
  'Sub-Office'?: string;
  Active?: boolean;
  'Touchpoints URL'?: string;
  'Prod Status'?: string;
  'Type of Domain'?: string;
  'Digital Brand Category'?: string;
  'Website Platform'?: string[];
  'Statuscard Score - Customer Centricity'?: string | number;
  'Statuscard Score - Mobile Performance Rollup (fromUSWDS, Performance)'?:
    | string
    | number;
  'Statuscard Score - AMP'?: string | number;
  'Statuscard Score - GA data'?: string | number;
  'Statuscard Score - USWDS'?: string | number;
  'Statuscard Score - Required Links'?: string | number;
};
