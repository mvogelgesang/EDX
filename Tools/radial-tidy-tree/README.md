# Radial Tidy Tree

## GSA INSTRUCTIONS

Export website URL and domains from Touchpoints as a CSV. Import into https://docs.google.com/spreadsheets/d/1wQc_L0cvof8MpGqTX6TdwJCoCtDlmrc314JglkdB1rg/edit#gid=1188711728. Follow instructions in sheet.

- Copy JSON from Google Sheet into `/files` in a file of your choice
- Update JSON file reference in `dendrogram.js` on Line 8

View this chart in your browser by running a web server in this folder. For
example:

```sh
python -m SimpleHTTPServer
```

If using Python 3 with Windows Command Prompt, use the following: 

```sh
python -m http.server
```

## Background

Originally from https://observablehq.com/@d3/radial-tidy-tree@200
