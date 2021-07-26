/* In order to speed up requests, this set of scripts leverages CacheService. You can bypass the cache by toggling the BUST_CACHE variable */

var SITE_SCANNER_URL = "https://api.gsa.gov/technology/site-scanning/v1/websites";
// register for a Site Scanning API key at https://open.gsa.gov/api/site-scanning-api/
var SITE_SCANNER_API_KEY = PropertiesService.getScriptProperties().getProperty('SITE_SCANNER_API_KEY');

var GOOGLE_CONSOLE_URL = 'https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run';
// Google Search Console API Key can be registered at https://developers.google.com/webmaster-tools/search-console-api/v1/configure
var GOOGLE_SEARCH_CONSOLE_API_KEY = PropertiesService.getScriptProperties().getProperty('GOOGLE_SEARCH_CONSOLE_API_KEY');

var CACHE = CacheService.getScriptCache();
var BUST_CACHE = false;


/** function to quickly evaluate the results of a given function */
function apiTEST() {
  var siteURL = 'cio.gov';
  Logger.log(GETUSWDSSCORE(siteURL));
}


/**
 * Attempts to fetch data from cache, if it does not exist or cache is busted, makes necessary api call
 * 
 * @param {string} key - the cache key
 * @param {string} resultType - [Optional] The api response (content, headers, responseCode)
 * @param {object} params - [Optional] Any key value pairs that are specific to the UrlFetchApp class (https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app#fetch(String,Object))
 * @param {boolean} json - [Optional] Boolean value to denote whether or not the expected response is JSON or not
 * 
 * @returns {string|object|number}
 */
function getObject(url, resultType = "content", params={}, json = false) {
  var key = constructCacheKey(url, resultType, json);
  // fetch the value from cache, if it does not exist, null is returned
  var object = CACHE.get(key);
  // if bust cache is on or object is null, make the api call
  if (BUST_CACHE || object == null) {
    Logger.log("bust cache is on");
    // fetch the latest
    object = callAPI(url, resultType, params, json);
    // cache it
    try {
      CACHE.put(key,object);
    Logger.log("caching new object with key: " + key);
    }
    catch(e) {
      return `An error occurred while caching the request. URL: ${url}
    resultType: ${resultType}
    params: ${params}
    json: ${json}`;
    }
  }
  return object;
}

function constructCacheKey(url, resultType, json = false) {
  var url = validateUrl(url);
  var json = ((json) ? 'json' : '');
  return resultType+json+"_"+url;
}

/**
 * Submits a GET request
 * 
 * @param {string} url - The api endpoint
 * @param {string} resultType - [Optional] The api response (content, headers, responseCode)
 * @param {object} params - [Optional] Any key value pairs that are specific to the UrlFetchApp class (https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app#fetch(String,Object))
 * @param {boolean} json - [Optional] Boolean value to denote whether or not the expected response is JSON or not
 * 
 * @returns {string|object|number}  
 */
function callAPI(url, resultType = "content", params={}, json = false) {
  var url = validateUrl(url);
  var response;
  
  try {
    var result = UrlFetchApp.fetch(url, params);
  }
  catch(err) {
    return `An error occurred while making the URL Fetch request. URL: ${url}
    resultType: ${resultType}
    params: ${params}
    json: ${json}`;
  }
  
  if (resultType == "content" && json) {
    response = JSON.parse(result.getContentText());
    return response;
  }
  if (resultType == "content") {
    response = result.getContentText();
    return response;
  }
  if (resultType == "headers") {
    response =  result.getHeaders();
    return response;
  }
  if (resultType == "responseCode") {
    response =  result.getResponseCode();
    return response;
  }
}

/**
 * given a URL (gsa.gov, http://gsa.gov, https://gsa.gov), returns a string with a fully qualified https protocol and domain
 * 
 * @param {string} url 
 * @returns {string} complete https url
 */
function validateUrl(url) {
  var httpRegex = /http:\/\//i;
  var httpsRegex = /https:\/\//i;
  
  var url = url.replace(httpRegex, 'https://');
  if (!httpsRegex.exec(url)) {
    return 'https://' + url;
  }
  return url;
}

/**
 * Call Site Scanner
 */
function callSiteScanner(url) {
  var key = constructCacheKey(url, "sitescanner");
  // fetch the key from Cache
  var object = CACHE.get(key);
  // if bust cache is on or object is null, make the api call
  if (BUST_CACHE || object == null) {
    Logger.log("bust cache is on");
    // fetch the latest
    try {
      var object = UrlFetchApp.fetch(SITE_SCANNER_URL + "/" + url + "?API_KEY=" + SITE_SCANNER_API_KEY);
      Logger.log(object);
      CACHE.put(key,object);
      Logger.log("caching new object with key: " + key);
    }
    catch(err) {
      return `An error occurred while making the URL Fetch request against Site Scanner for URL: ${url}. Errors include: ${err}`;
    }   
  }
  return object;
}

