export const AIRTABLE_FIELDS = {
  'website-evals': {
    Site: { id: 'fldEJKjLyRz34tQzh', name: 'Site' },
  },
  websites: {
    website: { id: 'fldFrU6QZcwAdraF7', name: 'Site' },
    active: { id: 'fldnjl7wNChb5d6Vu', name: 'Active' },
    office: { id: 'fldF6peALqDlbDlBp', name: 'Office' },
    'sub-office': { id: 'fldAsCVsayge6mxhK', name: 'Sub-Office' },
    'website-platform': { id: 'fldOEB2p3zzQJUfX8', name: '' },
    'digital-brand-category': {
      id: 'fldEJNQ2Bp76EHPPB',
      name: 'Digital Brand Category',
    },
    'type-of-domain': { id: 'fld76C5VCbbfQ0w4v', name: 'Type of Domain' },
    'score-customer-centricity': {
      id: 'fldWhw3jTSLJzbbx4',
      name: 'Statuscard Score - Customer Centricity',
    },
    'score-mobile-perf': {
      id: 'fldfvDZZqPnb2qbsG',
      name: 'Statuscard Score - Mobile Performance Rollup (from USWDS, Performance)',
    },
    'score-amp': { id: 'fldN3wy0EtgQ1aU4w', name: 'Statuscard Score - AMP' },
    'score-ga': { id: 'fldkwF5Zusr17tBcu', name: 'Statuscard Score - GA data' },
    'score-uswds': {
      id: 'fld6u0AYPH52m19iP',
      name: 'Statuscard Score - USWDS',
    },
    'score-reqd-links': {
      id: 'fldfQdluzWsPP2aty',
      name: 'Statuscard Score - Required Links',
    },
  },
};

type ATWebsite = {
  id: string;
  createdTime: Date;
  fields: ATWebsiteFields;
};

type ATWebsiteFields = {
  Site?: string;
  'USWDS, Performance'?: string[];
  Office?: string;
  'Sub-Office'?: string;
  Active?: boolean;
  'Touchpoints URL'?: string;
  'Prod Status'?: string;
  'Type of Domain'?: string;
  'Digital Brand Category'?: string;
  'Statuscard Score - Customer Centricity'?: string | number;
  'Statuscard Score - Mobile Performance Rollup (fromUSWDS, Performance)'?:
    | string
    | number;
  'Statuscard Score - AMP'?: string | number;
  'Statuscard Score - GA data'?: string | number;
  'Statuscard Score - USWDS'?: string | number;
  'Statuscard Score - Required Links'?: string | number;
};
