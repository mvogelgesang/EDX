import * as path from "path";
import { promises as fsPromises } from "fs";

const folder = path.join("data", "xyz");
// this replicates the submission of CLI-based args. The folder chosen is one that would never normally be created
process.argv.push("--folders=xyz");
const condenser = require("../src/condenser/condenser.module");

beforeAll(async () => {
  // generates dummy files which can be consumed by the condenser
  const content = {
    domain: "developers.login.gov",
    url: "developers.login.gov",
    scanVersion: "0.0.9",
    scanDate: "20220412",
    scanStatus: "Page loaded successfully",
    performanceMetric: {
      search: false,
    },
    siteScanner: {
      data: {
        scan_date: "2022-04-12T00:35:47.361Z",
        uswds_usa_classes: 35,
      },
    },
    uswdsComponents: {
      header: true,
    },
    lighthouse: {
      desktopData: {
        lhr: {
          audits: {
            "content-width": {
              score: 1,
            },
          },
          categories: {
            seo: {
              score: 1,
            },
          },
        },
      },
    },
  };
  await fsPromises.mkdir(folder, { recursive: true });
  for (let i = 0; i < 5; i++) {
    // change a small portion of the file to ensure there are differences for comparison
    content.domain += i;
    await fsPromises.writeFile(
      path.join(folder, `site${i}.json`),
      JSON.stringify(content),
      {
        flag: "w+",
      }
    );
  }
  const files = await fsPromises.readdir(folder);
});

describe("Condenser", () => {
  describe("fildFiles()", () => {
    test("file condensed", async () => {
      const results = [];
      await condenser.findFiles(folder);
      const outputPath = condenser.outputPath;
      const outputFile = await fsPromises.readFile(outputPath, "utf-8");
      //5 records written, 1 header, and a blank line at the end results in 7 total lines expected
      expect(outputFile.split("\n").length).toEqual(7);
    });
  });
  describe("extractDataPoints()", () => {
    test("All csv header id's map to an input and are returned successfully", async () => {
      const inputWithAllHeaders = {
        domain: "developers.login.gov",
        url: "developers.login.gov",
        scanVersion: "0.0.9",
        scanDate: "20220412",
        scanStatus: "Page loaded successfully",
        performanceMetric: {
          search: false,
        },
        siteScanner: {
          data: {
            scan_date: "2022-04-12T00:35:47.361Z",
            uswds_usa_classes: 35,
          },
        },
        uswdsComponents: {
          header: true,
        },
        lighthouse: {
          desktopData: {
            lhr: {
              audits: {
                "content-width": {
                  score: 1,
                },
              },
              categories: {
                seo: {
                  score: 1,
                },
              },
            },
          },
        },
      };
      const expectedData = {
        domain: "developers.login.gov",
        url: "developers.login.gov",
        scanDate: "20220412",
        scanVersion: "0.0.9",
        scanStatus: "Page loaded successfully",
        "performanceMetric.search": false,
        "siteScanner.data.scan_date": "2022-04-12T00:35:47.361Z",
        "siteScanner.data.uswds_usa_classes": 35,
        "uswdsComponents.header": true,
        "lighthouse.desktopData.lhr.audits['content-width'].score": 1,
        "lighthouse.desktopData.lhr.categories.seo.score": 1,
      };

      expect(await condenser.extractDataPoints(inputWithAllHeaders)).toEqual(
        expectedData
      );
    });
    test("Some csv header id's map to an input and are returned successfully", async () => {
      const inputWithSomeHeaders = {
        domain: "developers.login.gov",
        url: "developers.login.gov",
        scanVersion: "0.0.9",
        scanDate: "20220412",
        scanStatus: "Page loaded successfully",
        performanceMetric: {
          search: false,
        },
        siteScanner: {
          data: {
            scan_date: "2022-04-12T00:35:47.361Z",
            uswds_usa_classes: 35,
          },
        },
        uswdsComponents: {},
        lighthouse: {
          desktopData: {
            lhr: {
              audits: {
                "content-width": {},
              },
              categories: {
                seo: {
                  score: 1,
                },
              },
            },
          },
        },
      };
      const expectedData = {
        domain: "developers.login.gov",
        url: "developers.login.gov",
        scanDate: "20220412",
        scanVersion: "0.0.9",
        scanStatus: "Page loaded successfully",
        "performanceMetric.search": false,
        "siteScanner.data.scan_date": "2022-04-12T00:35:47.361Z",
        "siteScanner.data.uswds_usa_classes": 35,
        "lighthouse.desktopData.lhr.categories.seo.score": 1,
      };
      expect(await condenser.extractDataPoints(inputWithSomeHeaders)).toEqual(
        expectedData
      );
    });
  });
});

afterAll((done) => {
  fsPromises.rm(folder, { recursive: true });
  fsPromises.rm(condenser.outputPath);
  done();
});
