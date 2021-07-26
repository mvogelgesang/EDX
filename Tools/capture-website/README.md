# Capture Website

## To Run

Install lib

`npm install capture-website`

Open siteCapture.js, update list as necessary. Format is an array of arrays:

```js
let siteList = [["1.usa.gov","FAS TTS/SOL"],
["10x.gsa.gov","FAS TTS/SOL"]];
```

Run

`node siteCapture.js`

A new folder will be created with the timestamp of the run. Each website will have a file with the following naming convention {organization name}_url.png. For example `FAS CASE_interact.gsa.gov.png`

## Notes

- The script performs screen captures asynchronously which places heavy load onto the machine as a number of screen captures are attempted at once. Slowing down the loop through the list of websites results in a larger number of captures.