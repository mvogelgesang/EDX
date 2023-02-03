import { expect, test } from '@oclif/test'; // should be your first require

import { WebsiteMetadata } from '../../../src/helpers/websites/websites-metadata';
import { scanHelper } from '../../../src/helpers/websites/scan';
import { itPerfMetricReport } from '../../../src/helpers/websites/it-performance-metric';
// const dummyWebsite = `file://${__dirname}/../../../testsite.html`;

describe('IT Performance Metric', () => {
  const sneakyWebsite = `file://${__dirname}/../../sneakysite.html`;
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${
    date.getMonth() < 9 ? '0' : ''
  }${date.getMonth() + 1}${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;

  describe('negative regex results', () => {
    const websiteMetadata = new WebsiteMetadata(sneakyWebsite);
    test.it(
      `should return false for IT Performance 'Contact' attribute`,
      async (ctx, done) => {
        return scanHelper(formattedDate, {
          domains: '',
          preset: '',
          headless: true,
          auth: false,
        })
          .then((sh) => {
            expect(
              sh.formattedDate,
              `${sh.formattedDate} is equivalent to ${formattedDate}`,
            ).to.eq(formattedDate);
            return (
              itPerfMetricReport(sh, websiteMetadata)
                // eslint-disable-next-line max-nested-callbacks
                .then((data) => {
                  sh.browser.close();
                  expect(data.contact).to.equal(false);
                  done();
                })
                // eslint-disable-next-line max-nested-callbacks
                .catch((error) => done(error))
            );
          })
          .catch((error) => done(error));
      },
    );
  });
});
