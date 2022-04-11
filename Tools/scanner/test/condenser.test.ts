import * as condenser from "../src/condenser";

beforeEach(() => {
});

describe("extractDataPoints()", () => {
  test("all csv header id's map to an input and are returned successfully", async () => {
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
  test("all csv header id's map to an input and are returned successfully", async () => {
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
    //"uswdsComponents.header": true,
    //"lighthouse.desktopData.lhr.audits['content-width'].score": 1,
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
