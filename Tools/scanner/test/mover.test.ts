const path = require("path");
const fsTest = require("fs").promises;
const csv = require("csv-parser");
const folder = path.join("data", "xyzmover");
const destinationFolder = path.join("data", "xyzmoverdestination");
// this needs to come before the mover module is imported
process.argv.push("--folders=data/xyzmover");
// this replicates the submission of CLI-based args. The folder chosen is one that would never normally be created
const mover = require("../src/mover/mover.module");

beforeAll(async () => {
  // generates dummy files which can be consumed by the condenser
  const jsonContent = {
    domain: "developers.login.gov",
    url: "developers.login.gov",
  };
  const image =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC";

  await fsTest.mkdir(folder, { recursive: true });

  for (let i = 0; i < 5; i++) {
    // change a small portion of the file to ensure there are differences for comparison
    jsonContent.domain += i;
    // write a json file
    await fsTest.writeFile(
      path.join(folder, `site${i}_20220425.json`),
      JSON.stringify(jsonContent),
      {
        flag: "w+",
      }
    );
    // write a png file
    await fsTest.writeFile(path.join(folder, `site${i}_20220425.png`), image, {
      flag: "w+",
    });
    // write another file type (negative case)
    await fsTest.writeFile(path.join(folder, `site${i}_20220425.pdf`), "", {
      flag: "w+",
    });
  }
});
describe("mover.module", () => {
  describe("fildFiles()", () => {
    test("files moved to specific destination folder", async () => {
      await mover.findFiles(folder, destinationFolder);
      const movedFiles = await fsTest.readdir(destinationFolder);
      //15 files written, only 10 are relevant file types
      expect(movedFiles.length).toEqual(10);
    });
  });
  describe("run()", () => {
    test("files moved to default destination folder", async () => {
      const defaultDestinationFolder = path.join(
        "data",
        "mover",
        mover.formattedDate
      );
      await mover.run();
      const movedFiles = await fsTest.readdir(defaultDestinationFolder);
      //15 files written, only 10 are relevant file types
      expect(movedFiles.length).toEqual(10);
      await fsTest.rm(defaultDestinationFolder, { recursive: true });
    });
  });
  afterEach((done) => {
    fsTest.rm(destinationFolder, { recursive: true, force: true });
    done();
  });
});
afterAll((done) => {
  fsTest.rm(folder, { recursive: true });
  done();
});
