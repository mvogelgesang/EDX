# Apps Script

The following files contain a backup of Google Apps Scripts which can be utilized in Google Sheets to automate data collection on websites.

`API.gs` - manages API calls to either Site Scanning (https://api.gsa.gov/technology/site-scanning) or makes URL Fetch requests against a domain. To setup, establish relevant API keys and store in the Properties Service within the spreadsheet.
`customFunctions.gs` - a number of custom Google Sheet functions which accept a website domain and return status for a given test.