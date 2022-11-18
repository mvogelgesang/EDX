import { Flags, CliUx } from '@oclif/core';
import BaseCommand from '../../../base';
import { output } from '../../../flags/flags';
import { ReportHelper } from '../../../helpers/data/report';
export default class Report extends BaseCommand<typeof Report.flags> {
  static description =
    'Consolidates json output from website scans into CSV files';

  static examples = [
    `$ edxcli data report`,
    `$ edxcli data report -f "20220719,20220720"`,
    `$ edxcli data report -o customDirectory`,
    `$ edxcli data report -p "lighthouse accessibility"`,
  ];

  static flags = {
    ...BaseCommand.flags,
    folders: Flags.string({
      char: 'f',
      description:
        'List of comma-separated folders within the /data/scans directory.',
      required: false,
    }),
    output: output({ default: '/data/reports' }),
    preset: Flags.string({
      char: 'p',
      description: 'A collection of fields to extract into CSV',
      default: 'default',
      required: false,
    }),
  };

  static args = [];

  async run(): Promise<void> {
    const { flags } = await this.parse(Report);

    const ch = new ReportHelper(BaseCommand.formattedDate(), flags);
    CliUx.ux.action.start(
      `Building reports with data from the following folders ${flags.folders} into ${flags.output}.`,
    );
    await ch.run();
    CliUx.ux.action.stop(' complete');
  }
}
