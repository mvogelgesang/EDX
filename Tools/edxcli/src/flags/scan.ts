import { Flags } from '@oclif/core';

export const output = Flags.build({
  char: 'o',
  description: 'Output directory. Defualts to current directory',
  required: false,
});

export const domainsList = Flags.build({
  char: 'd',
  description: 'Comma-separated list of domains to scan.',
  required: true,
});

export const domainsSource = Flags.build({
  char: 'd',
  description: 'Name of the system to pull the list of domains',
  required: false,
  options: ['Airtable', 'Touchpoints'],
});

export const facets = Flags.build({
  char: 'f',
  description:
    'Comma-separated list of facets to use for the scan. e.g. (-f "screenshot,lighthouse,it metric").\n<options: | cui banner|screenshot|lighthouse desktop|lighthouse mobile|it performance metric|site scanner|uswds components>',
  multiple: true,
  helpValue: '<options>',
  required: false,
  default: '',
});

export const preset = Flags.build({
  char: 'p',
  description:
    'Run a pre-configured suite of scan facets whose results will be output into a single file.',
  options: ['', 'all', 'edx scan'],
  required: false,
  default: '',
});

export const headless = Flags.boolean({
  description:
    'Boolean flag, whether or not to run scans in headless mode. Defaults to true',
  default: true,
  allowNo: true,
});
