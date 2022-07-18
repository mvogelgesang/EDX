// @ts-check

export interface WebsiteMetadata {
  cookies: Cookies;
  customPrivacyPolicy: boolean;
  searchNotReq: boolean;
  wwwPrefix: String;
  queryString: String;
  urlPath: String;
  notes: String;
}

export interface Cookies {
  name: String;
  value: String;
  domain: String;
  path: String;
}

/**
 * Given a list of websites and a domain name, returns a WebsiteMetadata object. If no record was found, an empty object is returned.
 * @param websiteList
 * @param domain {string} a bare domain such as "gsa.gov" or "something.gsa.gov". Protocol (http) or url path (/do/something) are not applicable.
 * @returns {WebsiteMetadata} object
 */
export const getWebsiteMetadata = function (
  websiteList: Record<string, WebsiteMetadata>,
  domain: string
): WebsiteMetadata {
  return Object.prototype.hasOwnProperty.call(websiteList, domain)
    ? websiteList[domain]
    : emptyWebsiteMetadata();
};

/**
 * Returns an empty WebsiteMetadata object
 * @returns {WebsiteMetadata}
 */
export const emptyWebsiteMetadata = function (): WebsiteMetadata {
  return {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: false,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  };
};

export const websiteMetaData: Record<string, WebsiteMetadata> = {
  TEMPLATE: {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "www.",
    queryString: "?abc=123",
    urlPath: "/a/b/c/d",
    notes: "",
  },
  "1.usa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "10x.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: true,
    searchNotReq: false,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "amp.fas.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "apps.ocfo.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "?warning=0",
    urlPath: "",
    notes: "",
  },
  "arm.fas.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "autochoice.fas.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "autovendor.fas.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "cars.fas.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "cm-jira.usa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "extportal.pbs.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "fairs.reporting.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "fdms.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "federalistapp.18f.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "fedpay.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "financeweb.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "find.search.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "?utf8=✓&affiliate=usasearch&query=example",
    urlPath: "/search",
    notes:
      "find.search.gov/ redirects to search.gov while /search+querystring yeilds results",
  },
  "fleet.fas.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "fleeteur.fas.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "fms.fas.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "fmseec.fas.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: false,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "frpg.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: false,
    wwwPrefix: "www.",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "gsaadvantage.gov": {
    cookies: {
      name: "QSI_SI_bxYHdkLDIHcniGp_intercept",
      value: "true",
      domain: "www.gsaadvantage.gov",
      path: "/",
    },
    customPrivacyPolicy: false,
    searchNotReq: false,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "gsasolutionssecure.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "LP=303",
    notes: "",
  },
  "inventory.data.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes:
      "A number of internal links appear on home but all require login before navigating",
  },
  "login.fr.cloud.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "mysales.fas.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: false,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "It's a login page but with a lot of public content.",
  },
  "pbs-billing.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: false,
    wwwPrefix: "www.",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "portal.eos.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "property.reporting.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "realpropertyprofile.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "reporting.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "sat.reginfo.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: false,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "scopereview.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "secure.login.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "slc.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: false,
    wwwPrefix: "www.",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "str.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "training.rocis.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "travel.reporting.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "tscportal.fas.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: false,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "usaccess-alp.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "vec.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
  "vehicledispatch.fas.gsa.gov": {
    cookies: { name: "", value: "", domain: "", path: "" },
    customPrivacyPolicy: false,
    searchNotReq: true,
    wwwPrefix: "",
    queryString: "",
    urlPath: "",
    notes: "",
  },
};

export * from "./websitesMetadata";
