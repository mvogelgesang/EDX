import { CliUx } from '@oclif/core';
import BaseCommand from '../../../base';
import {
  domainsList,
  facets,
  headless,
  output,
  preset,
} from '../../../flags/scan';
import { createHttpsUrl } from '../../../helpers/global/utils';
import { scanHelper, scan } from '../../../helpers/websites/scan';

export default class Scan extends BaseCommand<typeof Scan.flags> {
  static description =
    'Scans websites using various modules to capture information about the sites';

  static examples = [
    `$ edxcli websites scan -d gsa.gov`,
    `$ edxcli websites scan -d buy.gsa.gov -f screenshot -o ~/some/other/directory`,
    `$ edxcli websites scan -d sftool.gov -p Performance Metric`,
    `$ edxcli websites scan -d 18f.gsa.gov --headless false`,
  ];

  static flags = {
    ...BaseCommand.flags,
    domains: domainsList(),
    facets: facets(),
    headless: headless,
    output: output(),
    preset: preset(),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Scan);
    let domainArray: string[] = [];
    if (flags.domains) {
      domainArray = flags.domains.split(',');
    }

    CliUx.ux.action.start(`Scanning ${domainArray.length} websites`);
    // const sh = new ScanHelper(BaseCommand.formattedDate(), flags);
    // iterate over list of domains
    for (const item of domainArray) {
      // construct a scanner
      // eslint-disable-next-line no-await-in-loop
      const sh = await scanHelper(BaseCommand.formattedDate(), flags);
      // produce outputs
      // eslint-disable-next-line no-await-in-loop
      await scan(sh, await createHttpsUrl(item));
    }

    // write results
    CliUx.ux.action.stop(`Hey, we did the thing`);
  }
}
