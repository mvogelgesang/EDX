require("dotenv").config();
const yaml = require("js-yaml");
const fs = require("fs").promises;
import * as utils from "./utils";
const formattedDate = utils.getFormattedDate();
const FIELD_MAP = {
  "website-evals": {
    Site: "fldEJKjLyRz34tQzh",
  },
};
const AIRTABLE_BASE = "appaxAzqTVnbOf7cm";
const WEBSITE_EVAL_TABLE = "tblEc5CVjvlElEz8l";
const base = require("airtable").base(AIRTABLE_BASE);
var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: `${process.env.AIRTABLE_API_KEY}`,
});

/**
 * generates dummy data until the real thing is available
 * @param max
 * @returns
 */
const getRandNo = function (max) {
  return Math.floor(Math.random() * max);
};
const orgNames = ["FAS", "PBS", "GSA IT", "OCE", "OSC", "OGP", "OCFO"];
const platforms = [
  "Salesforce",
  "Drupal",
  "Wordpress",
  "Elixr",
  "Jekyll",
  "Gatsby",
  ".NET",
];
///////////////////////

let data = [];
base(WEBSITE_EVAL_TABLE)
  .select({
    // Selecting the first 3 records in Grid view:
    view: "Grid view",
  })
  .eachPage(
    function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function (record) {
        data.push(genDummyData(record.get("Site")));
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    },
    function done(err) {
      if (err) {
        console.error(err);
        return;
      }
      fs.writeFile(
        `../../docs/_data/legacy/websites_${formattedDate}.yml`,
        yaml.dump(data),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
      fs.writeFile(`../../docs/_data/websites.yml`, yaml.dump(data), (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
  );

const genDummyData = function (siteName) {
  return {
    name: siteName,
    org: orgNames[getRandNo(7)],
    platform: platforms[getRandNo(7)],
    datapointA: {
      val: getRandNo(10),
      max: 10,
    },
    datapointB: { val: getRandNo(10), max: 10 },
    datapointC: { val: getRandNo(7), max: 7 },
    datapointD: { val: getRandNo(12), max: 12 },
    datapointE: { val: getRandNo(12), max: 12 },
    datapointF: { val: getRandNo(6), max: 6 },
  };
};
