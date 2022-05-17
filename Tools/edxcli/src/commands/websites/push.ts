import { Flags, CliUx } from '@oclif/core';
import BaseCommand from '../../base';
import FetchHelper from '../../helpers/websites/fetch';
import * as Airtable from '../../helpers/airtable/index';
import { pathToFileURL } from 'url';

export default class Push extends BaseCommand<typeof Push.flags> {
    static description =
        'Grabs an extract of Touchpoints data and upserts it into Airtable';

    static examples = [
        `$ edxcli websites push`,
        `$ edxcli websites push -o ~/mydirectory`,
    ];

    static flags = {
        ...BaseCommand.flags,
        output: Flags.string({
            char: 'o',
            description: 'Output directory. Defualts to current directory',
            default: '.',
            required: false,
        }),
    };

    /* retrieves a list of domains from touchpoints, checks airtable for a record with the same domain, it exists, issues a PATCH (only update fields specified), if not exists, creates record */
    async run(): Promise<void> {
        const { args, flags } = await this.parse(Push);
        CliUx.ux.action.start(`Fetching Touchpoints data`);
        const fh = new FetchHelper(BaseCommand.formattedDate(), flags);
        // fh > input > file location, number of rows
        let data = await fh.getTouchpointsWebsites().then((result) => {
            return result.map((obj) => {
                return {
                    domain: obj.attributes.domain,
                    office: obj.attributes.office,
                    sub_office: obj.attributes.sub_office,
                    production_status: obj.attributes.production_status,
                    type_of_site: obj.attributes.type_of_site,
                    digital_brand_category: obj.attributes.digital_brand_category,
                    cms_platform: obj.attributes.cms_platform
                };
            });
        });
        CliUx.ux.action.start(`Fetched ${data.length} records from Touchpoints`);

        // is there a record?
        Airtable.

            // yes, update
            // no, check TP data, ensure its something we want to create
                // if so, create
                // otherwise skip


        

    }

    const csv = new CSV(
        BaseCommand.formattedDate(),
        flags.output,
        args.source,
        [{ id: 'domain', title: 'Domain' }],
    );
    csv.write(data).then((msg) => this.log(msg, 'info'));
CliUx.ux.action.stop(' complete');
  }
}
