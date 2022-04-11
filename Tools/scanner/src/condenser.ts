// @ts-check

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs").promises;
import path from "path";
import _ from "lodash";
import * as utils from "./utils";

const date = new Date();
const formattedDate = utils.getFormattedDate("YYYYMMDD_HHMM");

const csvHeaders = [
  { id: "domain", title: "Domain" },
  { id: "url", title: "URL" },
  { id: "scanDate", title: "Scan Date" },
  { id: "scanVersion", title: "Scan Version" },
  { id: "scanStatus", title: "Scan Status" },
  { id: "performanceMetric.hsts", title: "HSTS" },
  { id: "performanceMetric.dap", title: "Digital Analytics (DAP)" },
  { id: "performanceMetric.contact", title: "Contact" },
  { id: "performanceMetric.banner", title: "USA Banner" },
  { id: "performanceMetric.identifier", title: "Identifier" },
  {
    id: "performanceMetric.identifierAccessibility",
    title: "Accessibility Link",
  },
  { id: "performanceMetric.identifierFOIA", title: "FOIA Link" },
  { id: "performanceMetric.identifierPrivacy", title: "Privacy Policy Link" },
  { id: "performanceMetric.search", title: "Search" },
  { id: "siteScanner.data.scan_date", title: "Site Scanner Date" },
  { id: "siteScanner.data.uswds_usa_classes", title: "USA Class Count" },
  { id: "siteScanner.data.uswds_semantic_version", title: "USWDS Version" },
  { id: "uswdsComponents.accordion", title: "USWDS Accordion" },
  { id: "uswdsComponents.alert", title: "USWDS Alert" },
  { id: "uswdsComponents.button", title: "USWDS Button" },
  { id: "uswdsComponents.card", title: "USWDS Card" },
  { id: "uswdsComponents.footer", title: "USWDS Footer" },
  { id: "uswdsComponents.header", title: "USWDS Header" },
  {
    id: "lighthouse.desktopData.lhr.categories.performance.score",
    title: "(D) Performance Score",
  },
  {
    id: "lighthouse.desktopData.lhr.audits['speed-index'].score",
    title: "(D) Speed Index",
  },
  {
    id: "lighthouse.desktopData.lhr.audits['content-width'].score",
    title: "(D) Content Width Score",
  },
  {
    id: "lighthouse.desktopData.lhr.categories.seo.score",
    title: "(D) SEO Score",
  },
  {
    id: "lighthouse.mobileData.lhr.categories.performance.score",
    title: "(M) Performance Score",
  },
  {
    id: "lighthouse.mobileData.lhr.audits['speed-index'].score",
    title: "(M) Speed Index Score",
  },
  {
    id: "lighthouse.mobileData.lhr.audits['content-width'].score",
    title: "(M) Content Width Score",
  },
  {
    id: "lighthouse.mobileData.lhr.categories.seo.score",
    title: "(M) SEO Score",
  },
  {
    id: "lighthouse.desktopData.lhr.audits['content-width'].score",
    title: "Page Content Width Set",
  },
  {
    id: "lighthouse.desktopData.lhr.audits['meta-viewport'].score",
    title: "Meta Viewport Set",
  },
  {
    id: "lighthouse.desktopData.lhr.audits['meta-description'].score",
    title: "Meta Description Set",
  },
  {
    id: "lighthouse.desktopData.lhr.audits['document-title'].score",
    title: "Document Title Set",
  },
  {
    id: "lighthouse.desktopData.lhr.audits['html-has-lang'].score",
    title: "HTML Language Set",
  },
];
const csvWriter = createCsvWriter({
  path: `data/output_${formattedDate}.csv`,
  // create map of csv headers to json elements
  header: csvHeaders,
});

const condense = async function (folderName: string): Promise<void> {
  async function findFiles(folderName: string): Promise<void> {
    const files = await fs.readdir(folderName, {
      withFileTypes: true,
    });
    for (const file of files) {
      if (file.isDirectory()) {
        await findFiles(`${folderName}/${file.name}`);
      } else {
        if (path.extname(`${folderName}/${file.name}`) === ".json") {
          const data = JSON.parse(
            await fs.readFile(`${folderName}/${file.name}`, "utf-8")
          );

          const extract = await extractDataPoints(data);
          await csvWriter.writeRecords([extract]);
        }
      }
    }
  }
  await findFiles(folderName);
};

async function extractDataPoints(
  data: any
): Promise<{ [key: string]: string }> {
  let extract = {};
  for (const col in csvHeaders) {
    extract[csvHeaders[col].id] = _.get(data, csvHeaders[col].id);
  }
  return extract;
}

(async function () {
  const folderArray = ["20220331", "20220330", "20220329", "202203"];
  for (var folder in folderArray) {
    const dirName = `data/${folderArray[folder]}`;
    await condense(dirName);
  }
})();
