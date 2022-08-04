# Design Consults

This microsite provides a means by which EDX can engage with teams across GSA to provide examples of how an existing site might start to adopt the US Web Design System.

## Development

Install dependencies

    npm install

Run development

    npm run dev

Format

    npm run format

Build

    npm run build

Preview build

    npm run preview

Check types

    npm run check-types

## Deploy

Changes to the `main` branch in the `design-consults` directory will kick off a deploy with GitHub Actions.

## Adding new consults

1. Create new directories.

- Create `public/consult_assets/<consult_domain>` e.g. `public/consult_assets/govtservice_gsa` for govtservice.gsa.gov.
- Create `src/consult_assets/<consult_domain>` using the same name
- Add the name to `SLUGS` in `constants.ts` (this dynamically generates consult pages from those directories).

2. Download the consult site assets and move into the microsite.

- Navigate to homepage of site, right click and save the page with the "Webpage, Complete" format. Alternatively, if `wget` is available, download all content via `wget -p https://<consult_domain>.gov`
- Move downloaded html to `public/consult_assets/<consult_domain>/current/index.html`.
- Move site resources (`Website Name_files`) to `public/consult_assets/<consult_domain>/<consult_domain>_files`.
- Update links to assets in `current/index.html` to use `<consult_domain>_files`.
- The consult page and current tab should be visible running locally, but will not have working styles or scripts.

*Potential Stumbling Block*
- Some sites use JS to load/ change assets onHover, onClick, etc. As a result, you may find that upon running `npm run dev` that a slew of 404 errors are presented in the console:

```
04:05:02 PM [serve]    404 /consult_assets/reginfo/current/reginfo_files/vert_spacer.gif
04:05:02 PM [serve]    404 /consult_assets/reginfo/current/reginfo_files/spacer.gif
files in the public directory are served at the root path.
Instead of /public/img/main/bx_rm.png, use /img/main/bx_rm.png.
04:05:02 PM [serve]    404               /public/img/main/bx_rm.png
files in the public directory are served at the root path.
Instead of /public/img/main/bx_bg.png, use /img/main/bx_bg.png.
```

- If that is the case, running `wget` is your best bet. Mac users can install wget via homebrew.

1. Make proposed changes.

- Copy `current/index.html` to `proposed/index.html`.
- Make proposed changes, using USWDS assets from `public/vendor/uswds` and images from `public/assets/img`.

4. Create diff.

- TODO: instructions for generating diff saved in `src/pages/consult_assets/<consult_name>/diff.md`
- Add temporary "Yet to launch" message to `src/pages/consult_assets/<consult_name>/production.md`, this will later show finished work.

5. Update production tab.

- After site has been updated, follow the same process for adding `current.html` with the updated site, moving new html to `public/consult_assets/<consult_name>/production/index.html`.
- Remove temporary `src/pages/consult_assets/<consult_name>/production.md`

## Project structure

```
.
├── public
│   ├── assets // shared across site
│   ├── consult_assets // static project assets (html, built js, css etc.)
│   └── vendor
│       └── uswds
├── src
│   ├── components
│   ├── constants.ts // includes list of design consults
│   ├── layouts
│   ├── pages
│   │   ├── consult_assets // dynamic project assets (md)
│   │   ├── design-consults // generates pages from list of design consults
│   │   └── index.astro
│   └── styles // custom site styles
└── tsconfig.json
```
