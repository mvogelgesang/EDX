// @ts-check

const fs = require("fs").promises;
const path = require("path");
import * as utils from "../utils";
let args = require("minimist")(process.argv.slice(2), {
  string: ["folders", "destination"],
  alias: { f: "folders", d: "destination" },
});

export const formattedDate = utils.getFormattedDate();

export const findFiles = async function (
  folderName: string,
  destFolder: string
) {
  const files = await fs.readdir(folderName, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      await findFiles(`${folderName}/${file.name}`, destFolder);
    } else {
      const regex = /_\w*(\.png|\.json)*/;
      const domainName = file.name.replace(regex, "");
      await fs.mkdir(`${destFolder}/${domainName}`, { recursive: true });
      fs.copyFile(
        `${folderName}/${file.name}`,
        `${destFolder}/${domainName}/${file.name}`
      );
    }
  }
};

export const run = async function () {
  const folderArray = args.folders ? args.folders.split(",") : [];
  const destination = args.destination
    ? args.destination
    : `data/mover/${formattedDate}`;
  if (folderArray.length > 0) {
    for (let folder in folderArray) {
      await findFiles(folderArray[folder], destination);
    }
  } else {
    console.log(`copying contents of the entire data/ directory. You can specify a subset of folders by passing the --folders parameter. 
    npm run move -- --folders="folder1,folder2"
    `);

    const dirName = `data/`;
    await findFiles(dirName, destination);
  }
};
