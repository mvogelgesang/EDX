// @ts-check
require('dotenv').config();
import { ScanHelper } from './scan';
import { ScreenshotType } from './screenshot';
import { PerformanceMetricReport } from './it-performance-metric';
import { ICuiBanner } from './cui-banner';
import { IMetadataTags } from './metadata-tags';

/**
 * Represents all data elements in a websiteReport
 * @param domain a valid Node URL object for the site that is being scanned
 * @param sh a ScanHelper object
 * @returns WebsiteReportType
 */
export const websiteReport = (
  domain: URL,
  sh: ScanHelper,
): WebsiteReportType => {
  return {
    scanDate: sh.formattedDate,
    startTime: new Date().toISOString(),
    endTime: '',
    /* over time, the contents of scans will change and should follow semantic versioning principles. Pulling from package.json reduces the total number of manual steps when updating the version number */
    scanVersion: process.env.npm_package_version,
    domain: domain.hostname,
    url: domain.toString(),
    scanStatus: '',
    screenCapture: {
      description:
        'Holds screenshots of website homepage on both desktop and mobile viewport sizes',
      data: [],
    },
    performanceMetric: {
      description: "Represents GSA IT FY22 performance metrics",
    hsts: false,
    dap: false,
    contact: false,
    banner: false,
    identifier: false,
    identifierAccessibility: false,
    identifierFOIA: false,
    identifierPrivacy: false,
    search: false,
    },
    cuiBanner: {
      description: `Looks for the CUI warning banner on site and returns a fuzzy match ranking between 0 and 1 where a higher score indicates a closer match. Two variants of the CUI warning banner exist and scores are provided for both the internal and external variants. Specific language can be found in source and CIO 2100.1M, https://www.gsa.gov/cdnstatic/CIO_21001M_GSA_Information_Technology_(IT)_Security_Policy_03-26-2021_CC044215.pdf`,
      data: [],
    },
    metadataTags: {
      description: ``,
      data: {
        keywords: [],
      },
    },
  };
};

export type WebsiteReportType = {
  scanDate: string;
  startTime: string;
  endTime: string;
  /* over time, the contents of scans will change and should follow semantic versioning principles. Pulling from package.json reduces the total number of manual steps when updating the version number */
  scanVersion: string | undefined;
  domain: string;
  url: string;
  scanStatus: string;
  screenCapture: ScreenshotReport;
  performanceMetric: PerformanceMetricReport;
  cuiBanner: CuiBannerReport;
  metadataTags: MetadataTagsReport;
};

export type ScreenshotReport = {
  description: string;
  data: ScreenshotType[];
};

export type CuiBannerReport = {
  description: string;
  data: ICuiBanner[];
};

export type MetadataTagsReport = {
  description: string;
  data: IMetadataTags;
};
