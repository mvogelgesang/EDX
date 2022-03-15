import { Flags, CliUx } from '@oclif/core';
import BaseCommand from '../../base';
import AnalyticsHelper from '../../helpers/analytics/index';

export default class Analytics extends BaseCommand<typeof Analytics.flags> {
  static description =
    "Consumes Google Analytics reports and returns consolidated files containing the most 'n' visited pages on each hostname";

  static examples = [
    `$ edxcli analytics myfile.csv`,
    `$ edxcli analytics myfile.csv -o ~/documents`,
    `$ edxcli analytics myfile.csv -n 5`,
  ];

  static flags = {
    ...BaseCommand.flags,
    number: Flags.integer({
      char: 'n',
      description: 'Top n pages per hostname',
      required: false,
      default: 2,
    }),
    output: Flags.string({
      char: 'o',
      description: 'Output directory',
      required: true,
    }),
  };

  static args = [
    {
      name: 'file',
      description: 'File which will be consumed',
      required: true,
    },
  ];

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Analytics);
    CliUx.ux.action.start('Running report');
    const ah = new AnalyticsHelper(BaseCommand.formattedDate(), flags.output);
    ah.csvInput(args.file);
    CliUx.ux.action.stop('complete');
  }
}
