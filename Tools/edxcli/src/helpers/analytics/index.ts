/* eslint-disable node/no-missing-import */
import * as fs from 'node:fs';
import * as fsp from 'node:fs/promises';
import csv from 'csv-parser';
import path from 'node:path';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

interface WebAnalyticsRecord {
  hostname: string;
  page: string;
  pageviews: string;
  uniqueageviews: string;
  avgtimeonpage: string;
  entrances: string;
  bouncerate: string;
  exit: string;
  pagevalue: string;
}

export default class AnalyticsHelper {
  formattedDate: string;
  outputDirectory: string;
  csvWriter: any;

  constructor(formattedDate: string, outputDirectory: string) {
    this.formattedDate = formattedDate;
    this.outputDirectory = outputDirectory;
    this.csvWriter = createCsvWriter({
      path: path.join(
        outputDirectory,
        `mostviewedpages_${this.formattedDate}.csv`,
      ),
      // create map of csv headers to json elements
      header: [
        { id: 'hostname', title: 'Hostname' },
        { id: 'page', title: 'Page' },
        { id: 'pageviews', title: 'Pageviews' },
        { id: 'uniquepageviews', title: 'Unique Pageviews' },
        { id: 'avgtimeonpage', title: 'Avg. Time on Page' },
        { id: 'entrances', title: 'Entrances' },
        { id: 'bouncerate', title: 'Bounce Rate' },
        { id: 'exit', title: '% Exit' },
        { id: 'pagevalue', title: 'Page Value' },
      ],
    });
  }

  // Hostname,Page,Pageviews,Unique Pageviews,Avg. Time on Page,Entrances,Bounce Rate,% Exit,Page Value
  async csvInput(inputFilePath: string, topNPages = 2): Promise<void> {
    const dataObj: Record<string, WebAnalyticsRecord[]> = {};

    fs.createReadStream(inputFilePath)
      .pipe(
        csv({
          mapHeaders: ({ header }) =>
            header.replace(/[\s%.]/gi, '').toLowerCase(),
        }),
      )
      .on('data', (row: WebAnalyticsRecord) => {
        // if the property is present
        if (Object.prototype.hasOwnProperty.call(dataObj, row.hostname)) {
          // push the entry onto the array
          // sort it
          // drop last all but the first two elements
          dataObj[row.hostname].push(row);
          dataObj[row.hostname].sort(this.comparePageviews);
          while (dataObj[row.hostname].length > topNPages) {
            dataObj[row.hostname].pop();
          }
        } else {
          dataObj[row.hostname] = [row];
        }
      })
      .on('end', () => {
        fs.writeFile(
          `${this.outputDirectory}/mostviewedpages_${this.formattedDate}.json`,
          JSON.stringify(dataObj),
          { flag: 'w' },
          (err) => {
            if (err) throw err;
            this.csvOutput();
          },
        );
      });
  }

  comparePageviews(
    first: WebAnalyticsRecord,
    second: WebAnalyticsRecord,
  ): number {
    if (
      Number.parseInt(first.pageviews, 10) >
      Number.parseInt(second.pageviews, 10)
    ) {
      return -1;
    }

    if (
      Number.parseInt(first.pageviews, 10) <
      Number.parseInt(second.pageviews, 10)
    ) {
      return 1;
    }

    return 0;
  }

  /* CSV OPERATIONS */

  extractDataPoints(
    data: Record<string, WebAnalyticsRecord[]>,
  ): WebAnalyticsRecord[] {
    const extract = [];
    // fix this loop
    for (const item in data) {
      if (Object.prototype.hasOwnProperty.call(data, item)) {
        for (const i in data[item]) {
          if (Object.prototype.hasOwnProperty.call(data[item], i)) {
            extract.push(data[item][i]);
          }
        }
      }
    }

    return extract;
  }

  /// MIGRATE THIS TO CSV GLOBAL
  async csvOutput(): Promise<void> {
    const data = JSON.parse(
      (
        await fsp.readFile(
          `${this.outputDirectory}/mostviewedpages_${this.formattedDate}.json`,
        )
      ).toString(),
    );
    const extract = await this.extractDataPoints(data);
    await this.csvWriter.writeRecords(extract);
    console.log(`CSV saved`);
  }
}
