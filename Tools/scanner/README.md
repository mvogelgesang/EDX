# Scanner

## Requirements

- Node >=14.8.0
- api.data.gov API key (https://api.data.gov/)

## Installation

Install all node dependencies:

`npm i`

Create a .env file and add api.data.gov key.

`echo "API_KEY=" >> .env`

## Running Scripts

Directory contains a primary `scanner.js` script which performs scans of websites using Puppeteer and saves relevant output in the `data/` directory. Output is organized by date of scan, website domain name, and a unique hash (md5) of the page which was scanned. For example:

```
data
│
└───20220131
│   │   mysite.gsa.gov_3888d0bdca29e1ee9b4e8bf31af13a33.json
│   │   mysite.gsa.gov_desktop_3888d0bdca29e1ee9b4e8bf31af13a33.png
│   │   mysite.gsa.gov_mobile_3888d0bdca29e1ee9b4e8bf31af13a33.png
│   │   anothersite.gsa.gov_eef43cee08182ff071924710f380e8d4.json
│   │   anothersite.gsa.gov_desktop_eef43cee08182ff071924710f380e8d4.png
│   │   anothersite.gsa.gov_mobile_eef43cee08182ff071924710f380e8d4.png
│   │   ...
│
└───20211220
│   │   mysite.gsa.gov_49f19d2991daf234309a99566370019a.json
│   │   mysite.gsa.gov_desktop_49f19d2991daf234309a99566370019a.png
│   │   mysite.gsa.gov_mobile_49f19d2991daf234309a99566370019a.png
```

## Output to CSV

`condenser.js` recursively consumes specified folder of data and organizes the results in a CSV file.
