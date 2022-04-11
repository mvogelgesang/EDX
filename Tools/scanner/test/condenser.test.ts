import * as condenser from "../src/condenser";

beforeEach(() => {
    //return initializeCityDatabase();
  });
  
  describe("condense", () => {
    test("url created with all options", async () => {
      const expectedReturn = {
        cookies: { name: "", value: "", domain: "", path: "" },
        searchNotReq: true,
        wwwPrefix: "www.",
        queryString: "?abc=123",
        urlPath: "/a/b/c/d",
        notes: "",
      };
      const spy = jest.spyOn(wmd, "getWebsiteMetadata");
      spy.mockReturnValue(expectedReturn);
  
      expect(await utils.createUrl("abc.gov")).toMatch(
        "https://www.abc.gov/a/b/c/d?abc=123"
      );
    });
});