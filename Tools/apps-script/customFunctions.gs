/* Contains all custom functions. API/URLFetch calls made through api.gs */ 

// for testing purposes
function myFunction() {
  var siteURL = 'engineering.18f.gov';
  Logger.log(SITEMAPPAGECOUNT(siteURL));
}



/**
 * Retrieves a Google Mobile Friendliness designation for a given site
 *
 * @param {url} siteURL - URL of the site.
 * @return MOBILE_FRIENDLY or NOT_MOBILE_FRIENDLY	
 * @customfunction
 */
function MOBILETEST(siteURL) {
  var newURL = validateUrl(siteURL);
  var cacheKey = "mobiletest"+"_"+newURL;
  if (BUST_CACHE) {
    Logger.log("Busting cache, receiving fresh responses")
    CACHE.remove(cacheKey);
  }
  var cached = CACHE.get(cacheKey);
  var response;
  if (cached != null) {
    response = cached;
    return response;
  }
  else {
    try {
      var data = {
        'url': newURL
      };
      var params = {
        'payload': JSON.stringify(data),    
        'muteHttpExceptions': true,
        'method': 'post',
        'contentType': 'application/json',
        'escaping': false,
        'headers': {
          'Content-Type': 'application/json'
        }
      }
      var result = UrlFetchApp.fetch(GOOGLE_CONSOLE_URL + "?key=" + API_KEY, params);
    }
    catch(err) {
      return "";
    }
    Logger.log("new cache");
    response = JSON.parse(result.getContentText()).mobileFriendliness;
    CACHE.put(cacheKey,response);
    return response;
  } 
}

/**
 * Checks to see if a given site has a sitemap.xml file
 *
 * @param {url} siteURL - URL of the site.
 * @return True or False
 * @customfunction
 */
function HASSITEMAP(siteURL,json=true) {
  var destination = constructURL("sitemap", siteURL);
  var jsonResponse = callAPI(destination,"content",{},json);
  var bool = false;
  if (jsonResponse.data.status_code == 200) {
    return true;
  }
  return bool;
}

/**
 * Retrieves the USWDS Score for a given URL from Site Scanning
 *
 * @param {URL} siteURL - URL of the site to test
 * @return Numerical score - Empty string for no score
 * @customfunction
 */
function GETUSWDSSCORE(siteURL,json=true) {
  var destination = constructURL("uswds2", siteURL);
  var jsonResponse = callAPI(destination,"content",{},json);
  var totalScore = jsonResponse.data.total_score;
  return totalScore;
}

/**
 * Returns the USWDS Version as captured by Site Scanning
 *
 * @param {string} siteURL - Base URL of the site 
 * @returns {string} Empty string if none, otherwise returns in v#.##.## format
 * @customfunction
 */
function GETUSWDSVERSION(siteURL,json=true) {
  var destination = constructURL("uswds2", siteURL);
  var jsonResponse = callAPI(destination,"content",{},json);
  var uswdsVersion = jsonResponse.data.uswdsversion;
  return uswdsVersion;
}

/**
 * Checks to see if website has an /about, /aboutus, or /about-us page
 *
 * @param {URL} siteURL - URL of the site
 * @return {boolean} - True or False if site has page
 * @customfunction
 */
function ABOUTPAGE(siteURL) {
  var url = validateUrl(siteURL);
  var requestArray = [{
      'url': url + '/aboutus',
      'muteHttpExceptions': true
    },
    {
      'url': url + '/about-us',
      'muteHttpExceptions': true
    },
    {
      'url': url + '/about',
      'muteHttpExceptions': true
    }
  ];
  var results = UrlFetchApp.fetchAll(requestArray);
  var validAbout = false;
  results.forEach(function(result) {
    if (result.getResponseCode() == 200) {
      validAbout = true;
    }
  });
  return validAbout;
}

/**
 * Checks whether site links to GSA's Privacy Policy, https://www.gsa.gov/website-information/website-policies
 *
 * @param {URL} siteURL - URL of the site 
 * @param {link type} linkType - 
 * @returns true/ false
 * @customfunction
 */
function REQUIREDLINKS(siteURL,linkType) {
  var result = getObject(siteURL,"content");
  var regex;
  var linkShouldNotExist = false;
  if (linkType == "Privacy") {
    regex = /(https:\/\/www\.gsa\.gov\/website-information\/website-policies\/ | \/website-information\/website-policies\/)/gi;
  }
  if (linkType == "FOIA") {
    regex = /https:\/\/www\.gsa\.gov\/reference\/freedom-of-information-act-foia/;
  }
  if (linkType == "Accessibility") {
    regex = /https:\/\/www\.gsa\.gov\/website-information\/website-policies/;
  }
  if (linkType = "Budget") {
    regex = /https:\/\/www\.gsa\.gov\/reference\/reports\/budget-performance/;
        linkShouldNotExist = true;
  }
  if (linkType == "EEOC") {
    regex = /https:\/\/www\.gsa\.gov\/reference\/civil-rights-programs\/the-no-fear-act-library/;
    linkShouldNotExist = true;
  }
  if (regex.exec(result) && !linkShouldNotExist) {
    return true;
  }
  return false;
}

/**
 * Returns the final redirect location for a given starting URL
 *
 * @param {URL} siteURL - URL of the site 
 * @returns redirect location
 * @customfunction
 */
function REDIRECTLOCATION(siteURL) {
  var params = {
    'followRedirects': false,
    'muteHttpExceptions': true
  };
  var result = getObject(siteURL, 'headers', params);
  if (!result.Location) {
    return "";
  }
  return result.Location;
}

/**
 * Searches a given page for "login" or "log in" 
 *
 * @param {url} siteURL - url of website to test
 * @return True or False if website has text on the page
 * @customfunction
 */
function HASLOGIN(siteURL) {
  var result = getObject(siteURL,"content");
  var loginRegex = /([Ll]ogin|[Ll]og in)/;
  if (loginRegex.exec(result)) {
    return true;
  }
  return false;
}

/**
 * Searches a given page for claims of copyright. Govt websites are not subject to copyright and folks should not be saying as such. 
 *
 * @param {url} siteURL - url of website to test
 * @return True or False if website has text on the page
 * @customfunction
 */
function HASCOPYRIGHT(siteURL) {
  var result = getObject(siteURL,"content");
  var regex = /(©|Copyright)/;
  if (regex.exec(result)) {
    return false;
  }
  return true;
}

/** 
 * Evaluates a site to determing if google-site-verification metadata is present
 * @param {url} siteURL - url of website to test
 * @return True or False 
 * @customfunction
 */
function HASGOOGLESITEVERIFICATION(siteURL) {
  var result = getObject(siteURL,"content");
  var regex = /<meta.*name="google-site-verification".*?>/;
  if (regex.exec(result)) {
    return true;
  }
  return false;
}

/**
 * Pulls the <title> from a given Site
 *
 * @param {url} siteURL - url of website to test
 * @return {title} title of the homepage
 * @customfunction
 */
function SITETITLE(siteURL) {
  var result = getObject(siteURL,"content");
  var titleRegex = /<title>.*?<\/title>/;
  var titleTagRegex = /(<title>|<\/title>)/gi;
  var title = titleRegex.exec(result);
  if (title) {
    return title[0].replace(titleTagRegex,"");
  }
  return "";
}

/**
 * Given a URL, returns the HTTP Response Code. By default, redirects are followed.
 *
 * @param {url} siteURL - url of website to test
 * @param {TRUE} followRedirects - [optional] - (Default = TRUE). TRUE to follow redirects and report the final HTTP Response. FALSE to return first HTTP Response. 
 * @return {HTTP Response Code} 
 * @customfunction
 */
function RESPONSECODE(siteURL, followRedirects=true) {
  var params = {
    'followRedirects': followRedirects,
    'muteHttpExceptions': true
  };
  return getObject(siteURL, "responseCode", params);
}

/**
 * Given a URL, returns boolean to say if the site is served by a CDN.
 *
 * @param {url} siteURL - url of website to test
 * @param {TRUE} followRedirects - [optional] - (Default = TRUE). TRUE to follow redirects and report the final HTTP Response. FALSE to return first HTTP Response. 
 * @return {boolean} 
 * @customfunction
 */
function USESCDN(siteURL, followRedirects=true) {
  var params = {
    'followRedirects': followRedirects,
    'muteHttpExceptions': true
  };
  var headers = getObject(siteURL, "headers", params);
  if (headers['x-cache'] || headers['x-akamai-transformed']) {
    return true;
  }
  return false;
}

/**
 * Given a URL, returns the website platform (if determinable).
 *
 * @param {url} siteURL - url of website to test
 * @param {FALSE} followRedirects - [optional] - (Default = FALSE). TRUE to follow redirects and report the final HTTP Response. FALSE to return first HTTP Response. 
 * @return {Site Platform} 
 * @customfunction
 */
function GETSITEPLATFORM(siteURL, followRedirects=false) {
  var params = {
    'followRedirects': followRedirects,
    'muteHttpExceptions': true
  };
  var result = getObject(siteURL, "headers", params);

  // this is an ever growing list and should be updated as more information is identified
  // drupal
  if (result['x-drupal-cache'] || result['x-generator'] == 'Drupal 7 (https://www.drupal.org)') {
    // some drupal sites include a x-generator header, if so, pull that content which more specifically identifies the version
    if (result['x-generator']) {
      return result['x-generator'];
    }
    return 'Drupal';
  }
  // federalist
  if (result['x-server'] == 'Federalist') {
    return 'Federalist';
  }
  // salesforce
  if (result['X-Powered-By'] == 'Salesforce.com ApexPages') {
    return 'Salesforce';
  }
  // jboss
  if (result['Server'] == 'JBoss-EAP/7') {
    return result['Server'];
  }
  

  return "Could not determine based on site headers";

}
/**
 * Given a URL, returns boolean to say if the site uses DAP.
 *
 * @param {url} siteURL - url of website to test
 * @param {TRUE} followRedirects - [optional] - (Default = TRUE). TRUE to follow redirects and report the final HTTP Response. FALSE to return first HTTP Response. 
 * @return {boolean} 
 * @customfunction
 */
function USESDAP(siteURL, followRedirects=true) {
  var params = {
    'followRedirects': followRedirects,
    'muteHttpExceptions': true
  };
  var result = getObject(siteURL, "content", params);
  var regex = /(script.*id="_fed_an_ua_tag"|src="https:\/\/dap.digitalgov.gov\/Universal-Federated-Analytics-Min.js?agency=GSA")/;
  if (regex.exec(result)) {
    return true;
  }
  return false;
}

/**
 * Given a URL, returns boolean to say if the site uses Qualtrics feedback.
 *
 * @param {url} siteURL - url of website to test
 * @param {TRUE} followRedirects - [optional] - (Default = TRUE). TRUE to follow redirects and report the final HTTP Response. FALSE to return first HTTP Response. 
 * @return {boolean} 
 * @customfunction
 */
function USESFEEDBACK(siteURL, followRedirects=true) {
  var params = {
    'followRedirects': followRedirects,
    'muteHttpExceptions': true
  };
  var result = getObject(siteURL, "content", params);
  var regex = /(div class="QSIFeedbackButton|QSIFeedbackButton-btn|siteintercept\.qualtrics|touchpoints\.app\.cloud\.gov|touchpoints-form-body)/;
  if (regex.exec(result)) {
    return true;
  }
  return false;
}

/**
 * Given a URL, checks for a number of meta tags on the page. Returns a numerical score 0 - 1 representing the proportion of tags present on the page.
 *
 * @param {url} siteURL - url of website to test
 * @param {TRUE} followRedirects - [optional] - (Default = TRUE). TRUE to follow redirects and report the final HTTP Response. FALSE to return first HTTP Response. 
 * @return {number} 
 * @customfunction
 */
function USESMETATAGS(siteURL, followRedirects=true) {
  var params = {
    'followRedirects': followRedirects,
    'muteHttpExceptions': true
  };
  regexArray = [/\<title\>/,
    /\<meta name="description".*?\>/,
    /\<meta name="keywords".*?>/,
    /\<meta property="og:title".*?>/,
    /\<meta property="og:description".*?>/];
  
  var result = getObject(siteURL, "content", params);
  var n = 0;
  var count = regexArray.length;
  for (var i = 0; i < count; i++) {
    if (regexArray[i].exec(result)) {
      n++;
    }
  }
  if (n == 0) {
    return 0;
  }
  else {
    return n/count;
  }
  
}

/**
 * Given a URL, returns boolean to say if the site is served by a CDN.
 *
 * @param {url} siteURL - url of website to test
 * @param {TRUE} followRedirects - [optional] - (Default = TRUE). TRUE to follow redirects and report the final HTTP Response. FALSE to return first HTTP Response. 
 * @return {boolean} 
 * @customfunction
 */
function HSTS(siteURL, followRedirects=true) {
  var params = {
    'followRedirects': followRedirects,
    'muteHttpExceptions': true
  };
  var headers = getObject(siteURL, "headers", params);
  if (headers['Strict-Transport-Security']) {
    return true;
  }
  return false;
}


/**
 * Given a URL, returns boolean to say if the site sets cookies on the home page.
 *
 * @param {url} siteURL - url of website to test
 * @param {TRUE} followRedirects - [optional] - (Default = TRUE). TRUE to follow redirects and report the final HTTP Response. FALSE to return first HTTP Response. 
 * @return {boolean} 
 * @customfunction
 */
function USESCOOKIES(siteURL, followRedirects=true) {
  var params = {
    'followRedirects': followRedirects,
    'muteHttpExceptions': true
  };
  var headers = getObject(siteURL, "headers", params);
  if (headers['Set-Cookie']) {
    return true;
  }
  return false;
}

/**
 * checks to see whether the site has embedded tracking via GSA Eloqua tools
 * 
 * @param {url} url - url of the site
 * @returns {true,false}
 * @customFunction
 */
function USESTRACKING(siteURL) {
  // call site scanner first to see if site is using search.usa.gov
  var siteScannerResult = callSiteScanner(siteURL);
  Logger.log(siteScannerResult);
  var thirdPartyServiceArray = JSON.parse(siteScannerResult).third_party_service_domains;
  if (thirdPartyServiceArray.includes("img.en25.com") || thirdPartyServiceArray.includes("gsasolutionssecure.gsa.gov")) {
    return true;
  }
  return false;
}

/**
 * checks to see whether the site is included in the Site Scanning API
 * 
 * @param {url} url - url of the site
 * @returns {true,false}
 * @customFunction
 */
function INSITESCANNER(siteURL) {
  // call site scanner first to see if site is using search.usa.gov
  var siteScannerResult = callSiteScanner(siteURL);
  Logger.log(siteScannerResult);
  var inSiteScanner = JSON.parse(siteScannerResult).hasOwnProperty("scan_date");
  if (inSiteScanner) {
    return true;
  }
  return false;
}


