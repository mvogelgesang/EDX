import fs from 'node:fs/promises';

export class OrganizeHelper {
  formattedDate: string;
  outputDirectory: string;
  folderList: string;

  constructor(formattedDate: string, flags: any) {
    this.formattedDate = formattedDate;
    this.outputDirectory = flags.output;
    this.folderList = flags.folders;
  }

  async findFiles(folderName: string, destFolder: string): Promise<void> {
    const files = await fs.readdir(folderName, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) {
        // eslint-disable-next-line no-await-in-loop
        await this.findFiles(`${folderName}/${file.name}`, destFolder);
      } else {
        const regex = /_\w*(\.png|\.json)*/;
        const domainName = file.name.replace(regex, '');
        // eslint-disable-next-line no-await-in-loop
        await fs.mkdir(`${destFolder}/${domainName}`, { recursive: true });
        fs.copyFile(
          `${folderName}/${file.name}`,
          `${destFolder}/${domainName}/${file.name}`,
        );
      }
    }
  }

  async run(): Promise<void> {
    const folderArray = this.folderList ? this.folderList.split(',') : [];
    const destination = this.outputDirectory
      ? this.outputDirectory
      : `data/organize/${this.formattedDate}`;
    await fs.mkdir(destination, { recursive: true });
    if (folderArray.length > 0) {
      for (const folder in folderArray) {
        if (Object.prototype.hasOwnProperty.call(folderArray, folder)) {
          // eslint-disable-next-line no-await-in-loop
          await this.findFiles(folderArray[folder], destination);
        }
      }
    } else {
      console.log(`copying contents of the entire data/ directory. You can specify a subset of folders by passing the --folders parameter. 
    `);

      const dirName = `data/`;
      await this.findFiles(dirName, destination);
    }
  }
}
