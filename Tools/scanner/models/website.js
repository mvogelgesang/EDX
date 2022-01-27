const UswdsComponents = require("./uswdsComponents");
const packagejson = require("../package.json");
/**
 * Class representing a full website report which consists of scan attributes and sub-classes
 */
class Website {
  constructor() {
    this.scanDate = "";
    this.startTime = "";
    this.endTime = "";
    /* over time, the contents of scans will change and should follow semantic versioning principles. Pulling from package.json reduces the total number of manual steps when updating the version number */
    this.scanVersion = packagejson.version;
    this.url = "";
    this.performanceMetric = new PerformanceMetric();
    this.uswdsComponents = new UswdsComponents.UswdsComponents();
    this.digitalAnalytics = new DigitalAnalytics();
    this.screenCapture = new GenericDataObj();
    this.siteScanner = new GenericDataObj();
    this.lighthouse = new Lighthouse();
  }
}

/**
 * Class representing FY22 GSA IT performance metric attributes
 */
class PerformanceMetric {
  constructor() {
    this.description = "Represents GSA IT FY22 performance metrics";
    this.hsts = false;
    this.dap = false;
    this.contact = false;
    this.banner = false;
    this.identifier = false;
    this.identifierAccessibility = false;
    this.identifierFOIA = false;
    this.identifierPrivacy = false;
    this.search = false;
  }
}

/**
 * Class to hold Lighthouse outputs for both desktop and mobile devices. Note, this is very loosely defined as Lighthouse's object model can change over time and is quite lengthy.
 */
class Lighthouse {
  constructor() {
    this.description = "Lighthouse outputs for both desktop and mobile devices";
    this.desktopData = {};
    this.mobileData = {};
  }
}

/**
 * Class to store a variety of reports from Google Analytics
 */
class DigitalAnalytics {
  constructor() {
    this.dailyTraffic = new GenericDataObj(
      "summary level data by day showing visitors by domain"
    );
    this.topPages = new GenericDataObj(
      "list of pages and total hits/ visits per page"
    );
    this.ingress = new GenericDataObj(
      "list of links or domains that send traffic to a given domain along with counts"
    );
    this.departures = new GenericDataObj(
      "list of pages that folks are on when they leave the site. Page url and departure count."
    );
    this.landingPages = new GenericDataObj(
      "list of landing pages along with hit counts"
    );
    this.egressGov = new GenericDataObj(
      "list of Govt websites who use DAP that a given domain sends traffic to. "
    );
  }
}

class GenericDataObj {
  constructor(description) {
    this.description = description;
    this.data = [];
  }
}

module.exports = {
  Website: Website,
  PerformanceMetric: PerformanceMetric,
};
