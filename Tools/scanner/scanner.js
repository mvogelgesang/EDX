const puppeteer = require("puppeteer");
const crawler = require("crawler");
require("dotenv").config();
const fs = require("fs");
const Website = require("./models/website");
const lighthouse = require("lighthouse");
const fetch = require("node-fetch");
const UswdsComponents = require("./models/uswdsComponents");

const date = new Date();
const formattedDate = `${date.getFullYear()}${date.getMonth() < 10 ? "0" : ""}${
  date.getMonth() + 1
}${date.getDate()}`; //_${date.getHours()}${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
const path = `data/${formattedDate}/`;

const devices = {
  mobile: puppeteer.devices["iPhone 11 Pro"],
  desktop: {
    name: "Windows Desktop",
    viewport: {
      width: 1920,
      height: 940,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: true,
    },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
  },
};

/**
 * Scan fires off a number of functions which return results which are then composed in the buildOutput() function
 * @param {string} domain
 * @param {boolean} headless
 * @param {Date} date
 */
async function scan(domain, headless = true) {
  console.log("Scanning", domain);
  const start = new Date();
  console.log("Start time", start);
  fs.mkdir(path, { recursive: true }, function (dirErr) {
    if (dirErr) return;
  });

  // browser gets passed to all functions utilizing puppeteer
  const browser = await puppeteer.launch({ headless: headless });

  // mapping data elements
  const website = new Website.Website();
  website.scanDate = formattedDate;
  website.startTime = start;
  website.url = domain;
  website.setScreenCapture = await screenshots(browser, domain);
  website.setLighthouse(await lighthouseReport(browser, domain));
  website.setPerformanceMetric(await itPerfMetricReport(browser, domain));
  website.setUswdsComponents(await uswdsComponentsReport(browser, domain));
  website.setSiteScanner(await siteScannerReport(domain));
  website.endTime = new Date();
  // now that we are done, close the browser instance
  await browser.close();
  await buildOutput(domain, website);
  console.log("Scan Complete", website.endTime);
}

const lighthouseReport = async function (browser, domain) {
  const data = {};
  const url = await createUrl(domain);
  for (var device in devices) {
    const page = await browser.newPage();
    await page.emulate(devices[device]);
    await page.goto(url, { waitUntil: "networkidle2" });
    const options = {
      port: new URL(browser.wsEndpoint()).port,
      output: "json",
    };

    data[device] = await lighthouse(url, options);
    delete data[device].lhr.stackPacks;
    delete data[device].lhr.i18n;
    delete data[device].lhr.timing;
    delete data[device].lhr.categoryGroups;
    delete data[device].artifacts;
    delete data[device].report;
  }
  return data;
};

const screenshots = async function (browser, domain) {
  let imgCaptures = [];
  for (var device in devices) {
    const page = await browser.newPage();
    await page.emulate(devices[device]);
    await page.goto(await createUrl(domain), { waitUntil: "networkidle2" });
    const imgPath = `data/${formattedDate}/${domain}_${device}.png`;

    await page.screenshot({
      path: imgPath,
    });
    imgCaptures.push({
      domain: domain,
      imgPath: imgPath,
      device: device,
    });
  }
  return imgCaptures;
};

const itPerfMetricReport = async function (browser, domain) {
  const regexs = {
    identifier: new RegExp("usa-identifier"),
    identifierPrivacy: new RegExp(
      "https://www.gsa.gov/website-information/website-policies|website-information/website-policies"
    ),
    identifierAccessibility: new RegExp(
      "https://www.gsa.gov/website-information/website-policies|website-information/website-policies"
    ),
    identifierFoia: new RegExp(
      "https://www.gsa.gov/reference/freedom-of-information-act-foia"
    ),
    dap: new RegExp(
      "https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js"
    ),
    search: new RegExp(
      "https://search.usa.gov/search|https://search.gsa.gov/search|<label.*?>Search</label>"
    ),
    banner: new RegExp("usa-banner"),
    contact: new RegExp(
      "Contact Us|(?<!-)Contact|Get in touch|Email Us|Help Desk|d+(s|-)d+(s|-)d+|(d+)sd+-d+"
    ),
  };

  const data = new Website.PerformanceMetric();
  const page = await browser.newPage();
  page.once("response", (response) => {
    data.hsts = response.headers().hasOwnProperty("strict-transport-security");
  });
  await page.goto(await createUrl(domain), { waitUntil: "networkidle2" });

  //data.hsts = httpResponse.headers()
  for (let regex in regexs) {
    const content = await page.content();
    data[regex] = regexs[regex].test(content);
  }
  return data;
};

const uswdsComponentsReport = async function (browser, domain) {
  const data = new UswdsComponents.UswdsComponents();
  const page = await browser.newPage();
  await page.goto(await createUrl(domain), { waitUntil: "networkidle2" });
  const content = await page.content();

  data.accordion = /usa-accordion__heading/.test(content);
  data.alert = /usa-alert/.test(content);
  data.banner = /usa-banner/.test(content);
  data.breadcrumb = /usa-breadcrumb/.test(content);
  data.button = /usa-button/.test(content);
  data.buttonGroup = /usa-button-group/.test(content);
  data.card = /usa-card-group|usa-card__container/.test(content);
  data.characterCount = /usa-character-count/.test(content);
  data.checkbox = /usa-checkbox/.test(content);
  data.collection = /usa-collection/.test(content);
  data.comboBox = /usa-combo-box/.test(content);
  data.dateInput = /usa-memorable-date/.test(content);
  data.datePicker = /usa-date-picker/.test(content);
  data.dateRangePicker = /usa-date-range-picker/.test(content);
  data.dropdown = /usa-select/.test(content);
  data.fileInput = /usa-file-input/.test(content);
  data.footer = /usa-footer/.test(content);
  data.grid = /grid-container/.test(content);
  data.header = /usa-header/.test(content);
  data.icon = /usa-icon/.test(content);
  data.iconList = /usa-icon-list/.test(content);
  data.identifier = /usa-identifier/.test(content);
  data.inputPrefix = /usa-input-prefix/.test(content);
  data.inputSuffix = /usa-input-suffix/.test(content);
  data.link = /usa-link/.test(content);
  data.list = /usa-list/.test(content);
  data.modal = /usa-modal/.test(content);
  data.pagination = /usa-pagination/.test(content);
  data.processList = /usa-process-list/.test(content);
  data.prose = /usa-prose/.test(content);
  data.radioButton = /usa-radio|usa-radio__input/.test(content);
  data.rangeSlider = /usa-range/.test(content);
  data.search = /usa-search/.test(content);
  data.sideNavigation = /usa-sidenav/.test(content);
  data.siteAlert = /usa-site-alert/.test(content);
  data.stepIndicator = /usa-step-indicator/.test(content);
  data.summaryBox = /usa-summary-box/.test(content);
  data.table = /usa-table/.test(content);
  data.tag = /usa-tag/.test(content);
  data.textInput = /usa-input/.test(content);
  data.timePicker = /usa-time-picker/.test(content);
  data.tooltip = /usa-tooltip/.test(content);
  data.validation = /usa-alert--validation/.test(content);
  return data;
};

const siteScannerReport = async function (domain) {
  const response = await fetch(
    `https://api.gsa.gov/technology/site-scanning/v1/websites/${domain}?api_key=${process.env.API_KEY}`
  );
  const data = await response.json();
  return data;
};

const buildOutput = async function (domain, website) {
  fs.writeFile(`${path}${domain}.json`, JSON.stringify(website), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const createUrl = async function (domain) {
  if (domain.includes("http")) {
    return domain;
  } else {
    return `https://${domain}`;
  }
};

const domains = ["gsa.gov"];

(async () => {
  for (let domain in domains) {
    await scan(domains[domain], false, formattedDate);
  }
})();
