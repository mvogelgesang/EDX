const fsTest = require("fs/promises");
const createReadStream = require("fs").createReadStream;
const csv = require("csv-parser");
const folder = "data/xyz/";
process.argv.push("--folders=xyz");
const condenser = require("../src/condenser/condenser.module");

describe("Condenser", () => {
  beforeAll((done) => {
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
    try {
      fsTest.mkdir(folder, { recursive: true });
      for (let i = 0; i < 5; i++) {
        // change a small portion of the file to ensure there are differences for comparison
        content.domain += i;
        fsTest.writeFile(`${folder}site${i}.json`, JSON.stringify(content));
      }
    } catch (err) {
      console.error(err);
    }
    done();
  });
  describe("fildFiles()", () => {
    test("file condensed", async () => {
      const results = [];
      await condenser.findFiles(folder);
      const outputPath = condenser.outputPath;
      createReadStream(outputPath)
        .pipe(csv())
        .on("data", (data: any) => results.push(data))
        .on("end", () => {
          expect(results.length).toEqual(5);
        });
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
  afterAll((done) => {
    fsTest.rm(folder, { recursive: true });
    fsTest.rm(condenser.outputPath);
    done();
  });
});
