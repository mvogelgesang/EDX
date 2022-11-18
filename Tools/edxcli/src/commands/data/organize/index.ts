import { Flags, CliUx } from '@oclif/core';
import BaseCommand from '../../../base';
import { output } from '../../../flags/flags';
import { OrganizeHelper } from '../../../helpers/data/organize';
export default class Organize extends BaseCommand<typeof Organize.flags> {
  static description = 'Copies scan data and organizes files by domain name';

  static examples = [
    `$ edxcli data organize`,
    `$ edxcli data organize -f "20220719,20220720"`,
    `$ edxcli data organize -o customDirectory`,
  ];

  static flags = {
    ...BaseCommand.flags,
    folders: Flags.string({
      char: 'f',
      description:
        'List of comma-separated folders within the /data/scans directory.',
      required: false,
    }),
    output: output({ default: 'data/organize' }),
  };

  static args = [];

  async run(): Promise<void> {
    const { flags } = await this.parse(Organize);

    const oh = new OrganizeHelper(BaseCommand.formattedDate(), flags);
    CliUx.ux.action.start(
      `Building reports with data from the following folders ${flags.folders} into ${flags.output}.`,
    );
    await oh.run();
    CliUx.ux.action.stop(' complete');
  }
}
