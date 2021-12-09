# Shell Scripts

The `run.sh` file contains a list of domains which require scanning for the EDX program. Upon scanning a domain, the request headers and request body are saved locally and are later searched via grep for specific keywords and content.

## Running

From a unix-y terminal,
`./run.sh`

The script will output final destination URLs terminal (the script follows redirects until a 200 response is received).

## Output Data

Data is output as a csv file and contains three columns. Sites that appear in the csv file are those who 'pass' the scan for a particular category.

```csv
domain, scan url, category
accessibility.18f.gov, https://accessibility.18f.gov, HSTS
accessibility.18f.gov, https://accessibility.18f.gov, Identifier
accessibility.18f.gov, https://accessibility.18f.gov, Identifier FOIA
accessibility.18f.gov, https://accessibility.18f.gov, Banner
accessibility.18f.gov, https://accessibility.18f.gov, DAP
18f.gsa.gov, https://18f.gsa.gov, HSTS
18f.gsa.gov, https://18f.gsa.gov, Identifier
18f.gsa.gov, https://18f.gsa.gov, Identifier FOIA
18f.gsa.gov, https://18f.gsa.gov, Banner
```
