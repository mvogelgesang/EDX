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
}${date.getDate() < 10 ? "0" : ""}`; //_${date.getHours()}${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
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
  website.setScreenCapture(await screenshots(browser, domain));
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
    await page.goto(url, { waitUntil: "networkidle2" }).catch((e) => {
      console.error("Lighthouse error: ", e);
      return;
    });
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
    await page
      .goto(await createUrl(domain), { waitUntil: "networkidle2" })
      .catch((e) => {
        console.error("screenshots error: ", e);
        return;
      });

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
  await page.setCacheEnabled(false);
  const response = await page
    .goto(await createUrl(domain), {
      waitUntil: "networkidle2",
    })
    .catch((e) => {
      console.error("IT Metric error: ", e);
      return;
    });
  data.hsts = response.headers().hasOwnProperty("strict-transport-security");

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
  await page
    .goto(await createUrl(domain), { waitUntil: "networkidle2" })
    .catch((e) => {
      console.error("USWDS error: ", e);
      return;
    });
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

const domains = [
  "accessibility.18f.gov",
  "18f.gsa.gov",
  "usdigitalregistry.digitalgov.gov",
  "8astars.fas.gsa.gov",
  "acquisition.gov",
  "fmitservices.gsa.gov",
  "aas.gsa.gov",
  "analytics.usa.gov",
  "kibana.search.usa.gov",
  "api.data.gov",
  "idp.dev.identitysandbox.gov",
  "agile-labor-categories.18f.gov",
  "arm.fas.gsa.gov",
  "amp.fas.gsa.gov",
  "asis.search.usa.gov",
  "digitalcorps.gsa.gov",
  "1.usa.gov",
  "paymentaccuracy.gov",
  "atf-eregs.18f.gov",
  "apps.ocfo.gsa.gov",
  "staging.login.gov",
  "gsaxcess.gov",
  "ask.gsa.gov",
  "autoauctions.gsa.gov",
  "roads.fas.gsa.gov",
  "autovendor.fas.gsa.gov",
  "pbs-billing.gsa.gov",
  "api.usa.gov",
  "ussm.gsa.gov",
  "markdown-helper.18f.gov",
  "blog.usa.gov",
  "brand.18f.gov",
  "private-eye.18f.gov",
  "fmvrs.fas.gsa.gov",
  "hallways.cap.gsa.gov",
  "techradar.gsa.gov",
  "pra.digital.gov",
  "wdolhome.sam.gov",
  "extportal.pbs.gsa.gov",
  "usagov.platform.gsa.gov",
  "calc.gsa.gov",
  "fleet.gov",
  "mcm.fas.gsa.gov",
  "accessibility.digital.gov",
  "madeinamerica.gov",
  "fms.fas.gsa.gov",
  "find.search.gov",
  "cao.gov",
  "tailored.fedramp.gov",
  "identitysandbox.gov",
  "chat.18f.gov",
  "fmseec.fas.gsa.gov",
  "cars.fas.gsa.gov",
  "connect.usa.gov",
  "idp.staging.login.gov",
  "scopereview.gsa.gov",
  "cfo.gov",
  "join.tts.gsa.gov",
  "citizenscience.gov",
  "touchpoints.digital.gov",
  "labs.gsa.gov",
  "tscportal.fas.gsa.gov",
  "connect.digitalgov.gov",
  "lop.gsa.gov",
  "management.cio.gov",
  "autochoice.fas.gsa.gov",
  "section508.gov",
  "pivcac.staging.login.gov",
  "cloud.gov",
  "portal.eos.gsa.gov",
  "catalog.data.gov",
  "pivcac.prod.login.gov",
  "cloud.cio.gov",
  "cio.gov",
  "code.gov",
  "preview.login.gov",
  "app.cloud.gov",
  "resque.search.usa.gov",
  "cmls.gsa.gov",
  "coe.gsa.gov",
  "cm-jira.usa.gov",
  "portfolios.18f.gov",
  "computersforlearning.gov",
  "conectate.gobiernousa.gov",
  "tmf.cio.gov",
  "playbooks.idmanagement.gov",
  "challenge.gov",
  "search.gov",
  "search.usa.gov",
  "content.fai.gov",
  "contractdirectory.gov",
  "corporateapps.gsa.gov",
  "content-guide.18f.gov",
  "reporting.gov",
  "datacenters.cio.gov",
  "cpsearch.fas.gsa.gov",
  "dap.digitalgov.gov",
  "saferfederalworkforce.gov",
  "derisking-guide.18f.gov",
  "d2d.gsa.gov",
  "itvmo.gsa.gov",
  "thenamingcommission.gov",
  "cpars.gov",
  "discovery.gsa.gov",
  "digital.gov",
  "realestatesales.gov",
  "drivethru.gsa.gov",
  "disposal.gsa.gov",
  "files.18f.gov",
  "devicepki.idmanagement.gov",
  "digitaldashboard.gov",
  "developers.login.gov",
  "fedramp.gov",
  "designsystem.digital.gov",
  "agile.18f.gov",
  "esrs.gov",
  "facadatabase.gov",
  "fai.gov",
  "dev.identitysandbox.gov",
  "fdms.gov",
  "federalist-proxy.app.cloud.gov",
  "fedidcard.gov",
  "eoffer.gsa.gov",
  "ebuy.gsa.gov",
  "federalist.18f.gov",
  "fapiis.gov",
  "fairs.reporting.gov",
  "eng-hiring.18f.gov",
  "engineering.18f.gov",
  "fsrs.gov",
  "federation.data.gov",
  "fedsim.gsa.gov",
  "financeweb.gsa.gov",
  "go.usa.gov",
  "fleeteur.fas.gsa.gov",
  "finance.ocfo.gsa.gov",
  "federalist-builder.18f.gov",
  "fleet.fas.gsa.gov",
  "fellows-in-innovation.pif.gov",
  "federalistapp.18f.gov",
  "fsd.gov",
  "ffms.fas.gsa.gov",
  "fleet.gsa.gov",
  "fedpay.gsa.gov",
  "odp.gsa.gov",
  "fedspecs.gsa.gov",
  "feedback.usa.gov",
  "fpc.gov",
  "gsaelibrary.gsa.gov",
  "gsa.gov",
  "10x.gsa.gov",
  "frpg.gov",
  "fpds.gov",
  "gsaxcesspractice.fas.gsa.gov",
  "ncrrecycles.gsa.gov",
  "login.fr.cloud.gov",
  "gsaauctions.gov",
  "i14y.usa.gov",
  "gsaadvantage.gov",
  "idmanagement.gov",
  "gsaglobalsupply.gsa.gov",
  "i14y.search.usa.gov",
  "handbook.tts.gsa.gov",
  "oes.gsa.gov",
  "inventory.data.gov",
  "interact.gsa.gov",
  "mobile.reginfo.gov",
  "oasispet.gsa.gov/cpet/view",
  "methods.18f.gov",
  "navigator.gsa.gov",
  "labs.usa.gov",
  "mysmartplans.gsa.gov",
  "open.gsa.gov",
  "open.sam.gov",
  "open-staging.usa.gov",
  "playbook.cio.gov",
  "regulations.gov",
  "rocis.gov",
  "ret.gsa.gov",
  "pic.gov",
  "sam.gov",
  "paygap.pif.gov",
  "performance.gov",
  "mysales.fas.gsa.gov",
  "public-sans.digital.gov",
  "resources.data.gov",
  "realpropertyprofile.gov",
  "open.usa.gov",
  "evaluation.gov",
  "login.gov",
  "plainlanguage.gov",
  "product-guide.18f.gov",
  "marketplace.fedramp.gov",
  "reginfo.gov",
  "sat.reginfo.gov",
  "presidentialinnovationfellows.gov",
  "property.reporting.gov",
  "techfarhub.cio.gov",
  "sdg.data.gov",
  "vsc.gsa.gov",
  "tech.gsa.gov",
  "training.rocis.gov",
  "tophealth.pif.gov",
  "vehicledispatch.fas.gsa.gov",
  "smartpay.gsa.gov",
  "sftool.gov",
  "travel.reporting.gov",
  "usmcservmart.gsa.gov",
  "strategy.data.gov",
  "usaccess-alp.gsa.gov",
  "training.smartpay.gsa.gov",
  "vehiclestd.fas.gsa.gov",
  "usa.gov",
  "str.gsa.gov",
  "vote.gov",
  "secure.login.gov",
  "usability.gov",
  "https.cio.gov",
  "data.gov",
  "api.acquisition.gov",
  "spdatawarehouse.gsa.gov",
  "wdol.gov",
  "cic.gsa.gov",
  "advantage.gsa.gov",
  "slc.gsa.gov",
  "ux-guide.18f.gov",
  "courtsweb.gsa.gov",
  "gsaadvantage.gsa.gov",
  "dhsadvantage.gsa.gov",
  "afadvantage.gov",
  "usdaadvantage.gsa.gov",
  "fbohome.sam.gov",
  "partners.login.gov",
  "cdo.gov",
  "login.acquisition.gov",
  "tams.gsa.gov",
  "vaadvantage.gsa.gov",
  "tmss.gsa.gov",
  "design.login.gov",
];

(async () => {
  for (let domain in domains) {
    await scan(domains[domain], false, formattedDate);
  }
})();
