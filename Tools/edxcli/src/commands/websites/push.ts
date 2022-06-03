import { Flags, CliUx } from '@oclif/core';
import BaseCommand from '../../base';
import { FetchHelper, TouchpointsRecord } from '../../helpers/websites/fetch';
import * as Airtable from '../../helpers/airtable/index';
import { isCountedSite, writeJSONFile } from '../../helpers/global/utils';
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

  /* retrieves a list of domains from touchpoints, checks airtable for a record with the same domain, if it exists, issues a PATCH (only update fields specified), if not exists, creates record */
  async run(): Promise<void> {
    const { flags } = await this.parse(Push);

    CliUx.ux.action.start(`Fetching Touchpoints data`);
    const fh = new FetchHelper(BaseCommand.formattedDate(), flags);
    // fh > input > file location, number of rows
    const tpData = await fh
      .getTouchpointsWebsites()
      .then((result: TouchpointsRecord[]) => {
        return result.map((obj: TouchpointsRecord) => {
          return {
            'Touchpoints URL': `https://touchpoints.app.cloud.gov/admin/websites/${obj.id}`,
            Site: obj.attributes.domain,
            Office: obj.attributes.office,
            'Sub-Office': obj.attributes.sub_office,
            'Prod Status': obj.attributes.production_status,
            'Type of Domain': obj.attributes.type_of_site,
            'Digital Brand Category': obj.attributes.digital_brand_category,
          };
        });
      });
    CliUx.ux.action.stop(`Fetched ${tpData.length} records from Touchpoints`);
    CliUx.ux.action.start('Comparing records between Airtable and Touchpoints');
    const newWebsiteRecords: Airtable.ATListResponseType[] = [];
    const preUpdateWebsiteRecords: any[] = [];
    const postUpdateWebsiteRecords: any[] = [];
    const websitesToCreate: Airtable.ATWebsiteFields[] = [];
    const websitesToUpdate: Airtable.ATWebsite[] = [];
    const promisesArray: Promise<void>[] = [];
    const upsertPromisesArray: Promise<void>[] = [];
    /* The pattern to follow is creating a function which wraps the loop
     That function returns a promise
     Within the loop though, all Promise-based functions get added to an array that holds the promises "let valuesArray: Promise<any>[] = []"
     At the very end, you Promise.all(valuesArray).then(whatever) to resolve
     */
    for (const item in tpData) {
      if (Object.prototype.hasOwnProperty.call(tpData, item)) {
        promisesArray.push(
          Airtable.retrieveWebsite(tpData[item].Site)
            .then((websiteRecord) => {
              // if a record was found, update it
              if (websiteRecord.records.length > 0) {
                preUpdateWebsiteRecords.push(websiteRecord);
                const updateRecord = {
                  id: websiteRecord.records[0].id,
                  fields: tpData[item],
                };
                websitesToUpdate.push(updateRecord);
              } else if (isCountedSite(tpData[item])) {
                // if no record found, we need to insert
                // add to an array and we can do a mass insert later
                websitesToCreate.push(tpData[item]);
              }
            })
            .catch((error: any) => {
              console.error(error);
            }),
        );
      }
    }

    Promise.all(promisesArray).then(() => {
      for (const element of websitesToUpdate) {
        upsertPromisesArray.push(
          Airtable.updateWebsites([element])
            .then((updatedWebsiteRecord) => {
              postUpdateWebsiteRecords.push({
                id: updatedWebsiteRecord[0].id,
                Site: updatedWebsiteRecord[0].fields.Site,
                Active: updatedWebsiteRecord[0].fields.Active,
                'Touchpoints URL':
                  updatedWebsiteRecord[0].fields['Touchpoints URL'],
                Office: updatedWebsiteRecord[0].fields.Office,
                'Sub-Office': updatedWebsiteRecord[0].fields['Sub-Office'],
                'Prod Status': updatedWebsiteRecord[0].fields['Prod Status'],
                'Digital Brand Category':
                  updatedWebsiteRecord[0].fields['Digital Brand Category'],
                'Type of Domain':
                  updatedWebsiteRecord[0].fields['Type of Domain'],
              });
            })
            .catch((error: any) => {
              console.error(error);
            }),
        );
      }

      if (websitesToCreate.length > 0) {
        for (const element of websitesToCreate) {
          upsertPromisesArray.push(
            Airtable.createWebsites(element)
              .then((newWebsiteRecord) => {
                newWebsiteRecords.push(newWebsiteRecord);
              })
              .catch((error: any) => {
                console.error(error);
              }),
          );
        }
      }

      Promise.all(upsertPromisesArray).then(() => {
        writeJSONFile(
          postUpdateWebsiteRecords,
          'data',
          'airtablePostUpdate',
          BaseCommand.formattedDate(),
        );

        writeJSONFile(
          preUpdateWebsiteRecords,
          'data',
          'airtablePreUpdateWebsiteRecords',
          BaseCommand.formattedDate(),
        );

        writeJSONFile(
          postUpdateWebsiteRecords,
          'data',
          'airtableNewWebsiteRecords',
          BaseCommand.formattedDate(),
        );

        CliUx.ux.action.stop(
          `\nCreated ${newWebsiteRecords.length} records in Airtable\nUpdated ${postUpdateWebsiteRecords.length} records in Airtable.\nDone.`,
        );
      });
    });
    // this pushes both updateWebsite and createWebsite calls into the array since push accepts multiple arguments
  }
}
