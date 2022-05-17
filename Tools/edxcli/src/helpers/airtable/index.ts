require('dotenv').config();
import * as AT_FIELDS from './fields';
import * as AT_TABLES from './tables';
const AIRTABLE_BASE = 'appaxAzqTVnbOf7cm';

const base = require('airtable').base(AIRTABLE_BASE);
const Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: `${process.env.AIRTABLE_API_KEY}`,
});

export function retrieveDomain(domain: string): AT_Website {
    base('WEBSITES').select({
        filterByFormula: `{Site}=${domain}`,
        view: "ALL Sites",
    }, function(err, record) {
        if (err) { console.error(err); return; }
        console.log('Retrieved', record.id);
        return record;
    });
}
