import crypto from "crypto";
const hash = crypto.createHash("md5");
import * as wmd from "./websitesMetadata";

export type dateString = "YYYYMMDD" | "YYYYMMDD_HHMM" | null;

/**
 * Constructs a url consisting of scheme, subdomain, domain, tld, path, and query string
 * @param {string} domain
 * @returns {string} full web URL containing relevant prefix, url path, and query string
 */
export const createUrl = async function (domain: string): Promise<string> {
  const regex = /(http:\/\/|https:\/\/)/;
  // strip out http/https if it exists
  domain = domain.replace(regex, "");
  const { wwwPrefix, queryString, urlPath } = wmd.getWebsiteMetadata(
    wmd.websiteMetaData,
    domain
  );

  return `https://${wwwPrefix}${domain}${urlPath}${queryString}`;
};

/**
 * Given a url such as gsa.gov/blah, returns domain without path: gsa.gov
 * @param url
 * @returns {Promise<string>}
 */
export const getDomain = async function (url: string): Promise<string> {
  return url.replace(/\/.*/, "");
};

/**
 *
 * @returns {string} - Current date as string in YYYYMMDD or YYYYMMDD_HHMM format
 */
export function getFormattedDate(format: dateString = "YYYYMMDD"): string {
  const date = new Date();
  if (format === "YYYYMMDD_HHMM") {
    return `${date.getFullYear()}${leadingZeros(
      date.getMonth() + 1
    )}${leadingZeros(date.getDate())}_${leadingZeros(
      date.getHours()
    )}${leadingZeros(date.getMinutes())}`;
  } else {
    return `${date.getFullYear()}${leadingZeros(
      date.getMonth() + 1
    )}${leadingZeros(date.getDate())}`;
  }
}

/**
 * Adds a leading zero to a given number if it is less than 10
 * @param number
 * @returns 01, 02, 08, 09, 10, 11
 */
export function leadingZeros(number: number): string {
  return `${number < 10 ? 0 : ""}${number}`;
}

/**
 * Given text input, returns a MD5 Hexidecimal hash
 * @param text
 * @returns {string}
 */
export const printHash = async function (text: string): Promise<string> {
  hash.update(text);
  return hash.copy().digest("hex");
};

export * from "./utils";
