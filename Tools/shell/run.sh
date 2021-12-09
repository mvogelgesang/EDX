#!/bin/bash

now=$(date '+%Y-%m-%d_%H:%M:%S')
folder="data/$now"
logFile="log.txt"
dataFolder="$folder/pageData" #"test/$now" 
headersFolder="$folder/headersData" #"test/$now" 
outputs="$folder/output.txt" #"test/$now"
userAgent="GSA IT Performance Metric - SM10-1 GSA IT-Supported Websites Compliant with 21st Century Digital IDEA Act Principles"

mkdir -p $dataFolder $headersFolder

echo "New folder created in data/$now"
echo "domain, scan url, category" >> $outputs

strings=(
accessibility.18f.gov
18f.gsa.gov
usdigitalregistry.digitalgov.gov
8astars.fas.gsa.gov
acquisition.gov
aas.gsa.gov
analytics.usa.gov
demo.pra.digital.gov
all-sorns.app.cloud.gov
api.data.gov
buy.gsa.gov
agile-labor-categories.18f.gov
arm.fas.gsa.gov
amp.fas.gsa.gov
asis.search.usa.gov
digitalcorps.gsa.gov
1.usa.gov
paymentaccuracy.gov
atf-eregs.18f.gov
apps.ocfo.gsa.gov
gsaxcess.gov
ask.gsa.gov
staging.performance.gov
autoauctions.gsa.gov
www.pbs-billing.gsa.gov
autovendor.fas.gsa.gov
api.usa.gov
ussm.gsa.gov
blog.usa.gov
brand.18f.gov
private-eye.18f.gov
fmvrs.fas.gsa.gov
pra.digital.gov
federalistapp-staging.18f.gov
wdolhome.sam.gov
extportal.pbs.gsa.gov
usagov.platform.gsa.gov
calc.gsa.gov
mcm.fas.gsa.gov
accessibility.digital.gov
madeinamerica.gov
gsafleet.gov
fms.fas.gsa.gov
find.search.gov
cao.gov
tailored.fedramp.gov
chat.18f.gov
cars.fas.gsa.gov
connect.usa.gov
cfo.gov
join.tts.gsa.gov
citizenscience.gov
touchpoints.digital.gov
labs.gsa.gov
connect.digitalgov.gov
lop.gsa.gov
management.cio.gov
autochoice.fas.gsa.gov
demo.plainlanguage.gov
section508.gov
cloud.gov
catalog.data.gov
cloud.cio.gov
analytics-staging.app.cloud.gov
cio.gov
code.gov
cm-jira.usa.gov
cmls.gsa.gov
coe.gsa.gov
portfolios.18f.gov
computersforlearning.gov
conectate.gobiernousa.gov
tmf.cio.gov
staging.code.gov
playbooks.idmanagement.gov
staging.d2d.gsa.gov
challenge.gov
search.gov
search.usa.gov
content.fai.gov
contractdirectory.gov
corporateapps.gsa.gov
content-guide.18f.gov
reporting.gov
datacenters.cio.gov
cpsearch.fas.gsa.gov
dap.digitalgov.gov
demo.fedramp.gov
saferfederalworkforce.gov
derisking-guide.18f.gov
d2d.gsa.gov
itvmo.gsa.gov
thenamingcommission.gov
demo.10x.gsa.gov
cpars.gov
discovery.gsa.gov
digital.gov
realestatesales.gov
drivethru.gsa.gov
disposal.gsa.gov
devicepki.idmanagement.gov
digitaldashboard.gov
developers.login.gov
fedramp.gov
designsystem.digital.gov
agile.18f.gov
esrs.gov
facadatabase.gov
fai.gov
fdms.gov
federalist-proxy.app.cloud.gov
fedidcard.gov
eoffer.gsa.gov
ebuy.gsa.gov
federalist.18f.gov
fapiis.gov
fairs.reporting.gov
eng-hiring.18f.gov
engineering.18f.gov
fsrs.gov
fedsim.gsa.gov
federation.data.gov
financeweb.gsa.gov
go.usa.gov
fleeteur.fas.gsa.gov
finance.ocfo.gsa.gov
fleet.fas.gsa.gov
fellows-in-innovation.pif.gov
federalistapp.18f.gov
fsd.gov
ffms.fas.gsa.gov
fleet.gsa.gov
fedpay.gsa.gov
odp.gsa.gov
fedspecs.gsa.gov
feedback.usa.gov
fpc.gov
gsaelibrary.gsa.gov
staging.vote.gov
gsa.gov
10x.gsa.gov
frpg.gov
fpds.gov
gsaxcesspractice.fas.gsa.gov
ncrrecycles.gsa.gov
login.fr.cloud.gov
gsaauctions.gov
i14y.usa.gov
gsaadvantage.gov
idmanagement.gov
gsaglobalsupply.gsa.gov
i14y.search.usa.gov
handbook.tts.gsa.gov
oes.gsa.gov
itjobs.open.gsa.gov
inventory.data.gov
interact.gsa.gov
mobile.reginfo.gov
oasispet.gsa.gov/cpet/view
methods.18f.gov
navigator.gsa.gov
labs.usa.gov
mysmartplans.gsa.gov
open.gsa.gov
open-staging.usa.gov
playbook.cio.gov
regulations.gov
rocis.gov
ret.gsa.gov
pic.gov
sam.gov
paygap.pif.gov
performance.gov
mysales.fas.gsa.gov
public-sans.digital.gov
resources.data.gov
realpropertyprofile.gov
p3.cap.gsa.gov
open.usa.gov
evaluation.gov
login.gov
plainlanguage.gov
product-guide.18f.gov
marketplace.fedramp.gov
reginfo.gov
sat.reginfo.gov
presidentialinnovationfellows.gov
property.reporting.gov
techfarhub.cio.gov
vec.gsa.gov
sdg.data.gov
vcss.ocfo.gsa.gov
vsc.gsa.gov
tech.gsa.gov
training.rocis.gov
tophealth.pif.gov
vehicledispatch.fas.gsa.gov
smartpay.gsa.gov
sftool.gov
travel.reporting.gov
usmcservmart.gsa.gov
strategy.data.gov
usaccess-alp.gsa.gov
training.smartpay.gsa.gov
vehiclestd.fas.gsa.gov
usa.gov
str.gsa.gov
vote.gov
secure.login.gov
usability.gov
https.cio.gov
data.gov
api.acquisition.gov
spdatawarehouse.gsa.gov
wdol.gov
cic.gsa.gov
advantage.gsa.gov
ux-guide.18f.gov
www.slc.gsa.gov
courtsweb.gsa.gov
gsaadvantage.gsa.gov
dhsadvantage.gsa.gov
afadvantage.gov
usdaadvantage.gsa.gov
fbohome.sam.gov
partners.login.gov
cdo.gov
login.acquisition.gov
tams.gsa.gov
vaadvantage.gsa.gov
tmss.gsa.gov
design.login.gov
)

DAP () {
    
}
for i in "${strings[@]}"; do
    ## print full html of site to dataFolder, save final url (post redirects) to url var

    echo "$i, start, $(date '+%Y-%m-%d_%H:%M:%S')" >> "$folder/$logFile"
    url=`curl -A "$userAgent" -Ls -o $dataFolder/$i.html -w %{url_effective} "https://$i"`
    echo $url
    curl -A "$userAgent" -Is -o $headersFolder/$i.txt "$url"
    
    ##HSTS
    if grep -i -q Strict-Transport-Security $headersFolder/$i.txt
    then
        # if the keyword is in the conent
        echo "$i, $url, HSTS" >> $outputs
    fi

    ##Identifier
    if grep -i -q usa-identifier $dataFolder/$i.html
    then
        # if the keyword is in the conent
        echo "$i, $url, Identifier" >> "$outputs"
    fi

    ##Identifier - privacy policy & accessibility (accessibility is the same link)
    if grep -i -q 'https://www.gsa.gov/website-information/website-policies\|website-information/website-policies' $dataFolder/$i.html
    then
        # if the keyword is in the conent
        echo "$i, $url, Identifier Privacy" >> "$outputs"
        echo "$i, $url, Identifier Accessibility" >> "$outputs"
    fi

    ##Identifier - foia policy
    if grep -i -q 'https://www.gsa.gov/reference/freedom-of-information-act-foia' $dataFolder/$i.html
    then
        # if the keyword is in the conent
        echo "$i, $url, Identifier FOIA" >> "$outputs"
    fi

    ##USA Website Banner
    if grep -i -q 'usa-banner' $dataFolder/$i.html
    then
        # if the keyword is in the conent
        echo "$i, $url, Banner" >> "$outputs"
    fi

    ##Contact Us
        ### (?<!\-)Contact is used to exclude css classes like footer-contact-links
    if grep -i -q 'Contact Us\|(?<!\-)Contact\|Get in touch\|Email Us\|Help Desk\|\d+(\s|\-)\d+(\s|\-)\d+|\(\d+\)\s\d+\-\d+' $dataFolder/$i.html
    then
        # if the keyword is in the conent
        echo "$i, $url, Contact" >> "$outputs"
    fi

    ##DAP 
    if grep -i -q 'https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js' $dataFolder/$i.html
    then
        # if the keyword is in the conent
        echo "$i, $url, DAP" >> "$outputs"
    fi

    ##Search 
    if grep -i -q 'https:\/\/search.usa.gov\/search|https:\/\/search.gsa.gov\/search|<label.*?>Search<\/label>' $dataFolder/$i.html
    then
        # if the keyword is in the conent
        echo "$i, $url, Search" >> "$outputs"
    fi
    echo "$i, completed, $(date '+%Y-%m-%d_%H:%M:%S')" >> "$folder/$logFile"
done

compDate=$(date '+%Y-%m-%d_%H:%M:%S')
echo "Processing complete at $(date '+%Y-%m-%d_%H:%M:%S')" 

