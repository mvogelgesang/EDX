---
layout: design-consult
title: Contract Directory
type: current
collection: contractdirectory
css: contractdirectory
---

<!-- markdownlint-disable MD033 -->
<!--<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
 saved from url=(0048)https://contractdirectory.gov/contractdirectory/ -->
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=windows-1252" />

    <meta name="ROBOTS" content="INDEX, NOFOLLOW" />
    <meta
      name="Keywords"
      content="Interagency Contract Directory, Federal spending, Search Federal Procurement Data, Search Government, Search Government Contracts, FPDS, Federal Procurement Data System, Transparency in Government, Contract Spending, Government Contracts"
    />
    <meta
      name="Description"
      content="Welcome to the Interagency Contract Directory Portal"
    />
    <title>Interagency Contract Directory Portal</title>
    <!--<link
      href="../../assets/design-consults/contractdirectory/default.css"
      rel="stylesheet"
      type="text/css"
    />-->
    <script
      type="text/javascript"
      id="www-widgetapi-script"
      src="../../assets/design-consults/contractdirectory/www-widgetapi.js"
      async=""
    ></script>
    <script src="../../assets/design-consults/contractdirectory/player_api"></script>
    <script
      async=""
      src="../../assets/design-consults/contractdirectory/analytics.js"
    ></script>
    <script type="text/javascript">
      var currentDomain = document.domain;
      function ClearText() {
        document.getElementsByName("q").innerHTML = "";
      }
      function SubmitForm() {
        var toPage = "";
        if (document.pressed == "Search") {
          // Try some input validation here for RTC 58367
          toPage = "icd?q=" + document.getElementById("q").value;
          document.form1.action = toPage;
        } else if (document.pressed == "Advanced Search") {
          document.getElementById("as").value = "true";
          toPage = "icd?q=" + document.getElementById("q").value;
          document.form1.action = toPage;
        } else if (document.pressed == "Clear") {
          document.getElementsByName("q").innerHTML = "";
        } else if (document.pressed === undefined) {
          toPage = "icd?q=" + document.getElementById("q").value;
          document.form1.action = toPage;
        }
        //if(toPage == "") {
        //toPage="icd";
        //document.form1.action=toPage;
        //}
      }
      function ClearAS() {
        document.getElementById("as").value = "";
      }
    </script>
    <script
      language="javascript"
      id="_fed_an_ua_tag"
      src="../../assets/design-consults/contractdirectory/Universal-Federated-Analytics.1.0.js"
    ></script>

  </head>
  <body onload="ClearAS()" onunload="ClearAS()" style="background: #ebebeb">
    <center>
      <div style="width: 720px; background: #ffffff">
        <br />
        <table border="0" valign="middle">
          <tbody>
            <tr>
              <td align="center">
                <img
                  width="700"
                  alt="Interagency Contract Directory"
                  title="Interagency Contract Directory"
                  src="../../assets/design-consults/contractdirectory/Interagency-Contract-Directory.png"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table border="0" width="600" valign="middle">
          <tbody>
            <tr>
              <td colspan="3">
                <br />
                <p style="text-align: left">
                  <b><span style="color: #5486be">About ICD</span></b>
                </p>
                <p style="text-align: justify">
                  <span style="color: black"
                    >The <b>Interagency Contract Directory (ICD) </b> is a
                    central repository of Indefinite Delivery Vehicles (IDV)
                    awarded by the Federal agencies where the IDV is available
                    for use at both the intra agency and interagency levels.
                    IDVs include Government-Wide Acquisition Contracts (GWAC),
                    Multi-Agency Contracts, Other Indefinite Delivery Contracts
                    (IDC), Federal Supply Schedules (FSS), Basic Ordering
                    Agreements (BOA), and Blanket Purchase Agreements
                    (BPA).</span
                  >
                </p>
              </td>
            </tr>
            <tr>
              <td colspan="3" align="center">
                <br />
                <br />
                <p style="text-align: justify">
                  <span style="color: #5486be"
                    >&nbsp;&nbsp;&nbsp;Enter keyword(s) to search</span
                  >
                </p>
                <form name="form1" method="get" onsubmit="SubmitForm();">
                  <input
                    alt="Search Text"
                    title="Search Text"
                    type="text"
                    id="q"
                    name="q"
                    style="width: 95%"
                    tabindex="1"
                  />
                  <p style="height: 5px"></p>
                </form>
              </td>
            </tr>
            <tr align="center">
              <!--   <td><input type="submit" id="button_search" value="Search" onclick="document.pressed=this.value" class="green_button" /></td>-->
              <td>
                <input
                  id="button_search"
                  align="center"
                  type="image"
                  height="24"
                  style="position: relative; top: -2px"
                  value="Search"
                  onclick="document.pressed=this.value"
                  alt="Search"
                  title="Search"
                  src="../../assets/design-consults/contractdirectory/Search.png"
                />
              </td>
              <td>
                <input
                  id="button_clear_text"
                  type="image"
                  height="24"
                  value="Clear"
                  onclick="document.pressed=this.value"
                  alt="Clear"
                  title="Clear"
                  src="../../assets/design-consults/contractdirectory/clear.png"
                />
              </td>
              <td>
                <input
                  type="image"
                  id="button_advanced_search"
                  height="24"
                  value="Advanced Search"
                  onclick="document.pressed=this.value"
                  alt="Advanced Search"
                  title="Advanced Search"
                  src="../../assets/design-consults/contractdirectory/advanced_search.png"
                />
              </td>
              <td><input type="hidden" id="as" name="as" value="" /></td>

              <!--   <form name="form2" method="get" action="/test">

<input type="hidden" name="advSearch" value="true"/></td>

   <td><input type="submit" id="button_advanced_search" value="Advanced Search" class="green_button" />
    </td>

      <input width="123" align="center" type="image" height="24" alt="search" src="images/Search.png" tabindex="2" />
    </form>-->
            </tr>
          </tbody>
        </table>
        <br />
        <p style="height: 10px; width: 100%"></p>
        <hr class="horizontal_line" style="height: 2px; width: 100%" />
        <p style="height: 10px; width: 100%"></p>
        <table id="footer_table" style="width: 100%">
          <tbody>
            <tr>
              <td style="width: 20%">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <img
                          id="iae-logo"
                          align="left"
                          alt="IAE"
                          title="IAE"
                          src="../../assets/design-consults/contractdirectory/iae_logo_65.gif"
                        />
                      </td>
                      <td>
                        <img
                          id="usa-logo"
                          align="left"
                          alt="USA.gov"
                          title="USA.gov"
                          src="../../assets/design-consults/contractdirectory/firstgovlogo.gif"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <td>
                        <img
                          id="e-gov-logo"
                          style="position: relative; left: 40px"
                          src="../../assets/design-consults/contractdirectory/egov_30.gif"
                          alt="E-Gov Logo"
                          title="E-Gov"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td style="width: 70%">
                <ul></ul>
                <table
                  id="gwacs_table"
                  style="
                    position: relative;
                    left: 40px;
                    width: 100%;
                    font-size: 10px;
                  "
                >
                  <tbody>
                    <tr>
                      <td
                        align="left"
                        style="text-align: left position: relative; left: 40px; font-size: 10px; "
                        title="Government-Wide Contracts"
                      >
                        GWACs
                      </td>
                      <td
                        align="left"
                        style="text-align: left position: relative; left: 40px; font-size: 10px; "
                        title="Government-Wide Contracts"
                      >
                        ICD/IDIQ/BPA
                      </td>
                      <td
                        align="left"
                        style="position: relative; left: 40px; font-size: 10px"
                      ></td>
                    </tr>
                    <tr></tr>
                    <tr></tr>
                    <tr>
                      <td align="left">
                        <li>
                          <a
                            href="https://www.gsa.gov/technology/technology-purchasing-programs/governmentwide-acquisition-contracts-gwacs"
                            target="_new"
                            title="Streamlined Technology Acquisition Resources for Services"
                            id="anch_0"
                          >
                            8(a) STARS II
                          </a>
                        </li>
                      </td>
                      <td align="left">
                        <li>
                          <a
                            href="https://www.gsa.gov/buying-selling/purchasing-programs/gsa-schedule/schedule-features/blanket-purchase-agreements"
                            target="_new"
                            title="Governmentwide Schedule BPAs"
                            id="anch_1"
                          >
                            Governmentwide Schedule BPAs
                          </a>
                        </li>
                      </td>
                      <td align="left" style="width: 30%">
                        <li>
                          <a
                            title="FAQs"
                            target="_new"
                            href="https://contractdirectory.gov/contractdirectory/FAQs.html"
                            id="anch_2"
                            >FAQs</a
                          >
                        </li>
                      </td>
                    </tr>
                    <tr>
                      <td align="left">
                        <li>
                          <a
                            href="https://www.gsa.gov/technology/technology-purchasing-programs/governmentwide-acquisition-contracts-gwacs"
                            target="_new"
                            title="Streamlined Technology Acquisition Resources for Services"
                            id="anch_3"
                          >
                            8(a) STARS III
                          </a>
                        </li>
                      </td>
                      <td align="left">
                        <li>
                          <a
                            href="https://nitaac.nih.gov/services/cio-cs"
                            target="_new"
                            title="Electronic Commodities Store III"
                            id="anch_4"
                          >
                            ECS III
                          </a>
                        </li>
                      </td>
                      <td align="left">
                        <li>
                          <a
                            title="Help"
                            target="_new"
                            href="https://contractdirectory.gov/contractdirectory/ICD-Help.pdf"
                            id="anch_5"
                            >Help</a
                          >
                        </li>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="width: 30%">
                        <li>
                          <a
                            href="https://www.gsa.gov/technology/technology-purchasing-programs/governmentwide-acquisition-contracts-gwacs"
                            target="_new"
                            title="Alliant 2"
                            id="anch_6"
                          >
                            Alliant 2
                          </a>
                        </li>
                      </td>
                      <td align="left">
                        <li>
                          <a
                            href="https://www.gsa.gov/technology/technology-purchasing-programs/telecommunications-and-network-services"
                            title="Enterprise Infrastructure Solutions (EIS)"
                            id="anch_7"
                          >
                            Enterprise Infrastructure Solutions (EIS)</a
                          >
                        </li>
                      </td>
                      <td align="left">
                        <li>
                          <a
                            href="https://www.fpds.gov/fpdsng_cms/index.php/en/?option=com_content&amp;view=article&amp;id=21"
                            alt="Submit Comments"
                            title="Submit Comments"
                            class="style30"
                            id="anch_8"
                            >Submit Comments</a
                          >
                        </li>
                      </td>
                    </tr>
                    <tr>
                      <td align="left">
                        <li>
                          <a
                            href="http://nitaac.nih.gov/nitaac/"
                            target="_new"
                            title="Chief Information Officer-Solutions and Partners 3 Innovations"
                            id="anch_9"
                          >
                            CIO SP3
                          </a>
                        </li>
                      </td>
                      <td align="left">
                        <li>
                          <a
                            href="https://www.gsa.gov/technology/technology-purchasing-programs/mas-information-technology"
                            title="MAS Information Technology"
                            id="anch_10"
                          >
                            MAS Information Technology</a
                          >
                        </li>
                      </td>
                      <td align="left">
                        <li>
                          <a
                            href="https://www.fpds.gov/fpdsng_cms/index.php/en/?option=com_content&amp;view=article&amp;id=21"
                            title="Contact Information"
                            id="anch_11"
                          >
                            Contact Information</a
                          >
                        </li>
                      </td>
                    </tr>
                    <tr>
                      <td align="left">
                        <li>
                          <a
                            href="http://nitaac.nih.gov/nitaac/"
                            target="_new"
                            title="Chief Information Officer-Solutions and Partners 3 Innovations Small Business"
                            id="anch_12"
                          >
                            CIO SP3 Small Business
                          </a>
                        </li>
                      </td>
                      <td align="left">
                        <li>
                          <a
                            href="https://www.gsa.gov/technology/technology-purchasing-programs/telecommunications-and-network-services"
                            title="Satellite Communications (SATCOM)"
                            id="anch_13"
                          >
                            Satellite Communications (SATCOM)</a
                          >
                        </li>
                      </td>
                      <td align="left">
                        <li>
                          <a
                            href="https://contractdirectory.gov/contractdirectory/"
                            title="Copyright Information"
                            id="anch_14"
                            >Copyright Information</a
                          >
                        </li>
                      </td>
                    </tr>
                    <tr>
                      <td align="left">
                        <li>
                          <a
                            href="http://www.sewp.nasa.gov/index.shtml"
                            target="_new"
                            title="Solutions for Enterprise Wide Procurement"
                            id="anch_15"
                          >
                            SEWP 4
                          </a>
                        </li>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td style="width: 20%" align="left">
                        <li>
                          <a
                            href="https://www.gsa.gov/technology/technology-purchasing-programs/governmentwide-acquisition-contracts-gwacs"
                            target="_new"
                            title="Veterans Technology Services 2"
                            id="anch_16"
                          >
                            VETS 2
                          </a>
                        </li>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td style="width: 10%" align="center">
                <img
                  id="gsa-logo"
                  align="right"
                  src="/assets/design-consults/contractdirectory/gsa_logo_40.gif"
                  alt="GSA"
                  title="GSA"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <center style="font-size: 10px">
          **********************************WARNING***********************************
        </center>
        <center style="font-size: 10px">
          This is a U.S. General Services Administration Federal Government
          computer system that is "FOR OFFICIAL USE ONLY." This system is
          subject to monitoring. Individuals found performing unauthorized
          activities are subject to disciplinary action including criminal
          prosecution.
        </center>
      </div>
    </center>
    <script type="text/javascript">
      document.all.form1.q.focus();
    </script>

  </body>
</html>
