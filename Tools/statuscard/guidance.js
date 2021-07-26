/* {
    "id": "",
    "name": "",
    "description": "",
    "link": "",
    "element": [
      {
        "name": "",
        "guidance": "",
        "truthy": ""
      },
      {
        "name": "",
        "guidance": "",
        "truthy": ""
      }
    ]
  },
  */
function createGuidance(){
  return [
    {
      "id": "example",
      "name": "Example Category",
      "description": "<p>This top section will briefly explain the category and why it is important.</p>",
      "link": "https://gsa.gov/link",
      "element": [
        {
          "name": "Testable Requirement #1",
          "guidance": "<p>This section provides more robust guidance as to how a development team or site manager can comply with the requirement. Guidance should be specific and testable.</p>",
          "truthy": ""
        },
        {
          "name": "Testable Requirement #2",
          "guidance": "<p>This section provides more robust guidance as to how a development team or site manager can comply with the requirement. Guidance should be specific and testable.</p>",
          "truthy": ""
        }
      ]
    },
    {
    "id": "analytics",
    "name": "2 - Analytics & User Feedback",
    "description": "",
    "link": "",
    "element": [
      {
        "name": "Uses Digital Analytics Program (DAP)",
        "guidance": "<p>All GSA public-facing websites must participate in the federal <a href='http://digital.gov/services/dap/'>Digital Analytics Program (DAP)</a> by including the DAP tracking code on your website. All GSA public-facing websites should review site usage and search metrics at least monthly, and use the data to make informed decisions on how to continuously improve your site and exceed customer expectations.</p><p>In addition to DAP, GSA sites have access to the free standard version of Google Analytics. GSA program offices should use <a href='https://support.google.com/analytics/answer/1008015?hl=en'>this version of Google Analytics</a> on your external and internal websites, if you need data capabilities above and beyond what DAP offers. </p>",
        "truthy": ""
      },
      {
        "name": "Feedback",
        "guidance": "Generally, the <a href='https://pra.digital.gov/'>Paperwork Reduction Act (PRA)</a> imposes procedural requirements on agencies that wish to collect information from the public. Any GSA office that wants to collect information or feedback from customers (including via website surveys that ask <a href='https://www.performance.gov/cx/A11-Companion-CX-Metrics-2019.pdf'>standardized questions, such as those identified on performance.gov</a>) may have to comply with the PRA. <br /><br />Staff should work with <a href='https://insite.gsa.gov/services-and-offices/office-of-governmentwide-policy/office-of-acquisition-policy/governmentwide-acquisition-policy/regulatory-secretariat-regsec-division#InformationCollectionsPRA'>GSA’s Regulatory Secretariat Division</a> to obtain required approvals. For website surveys, GSA may ask a single, open-ended question (such as 'Please let us know what you think of this website' or 'Please give us your feedback' or 'Was this page helpful?') without prior approval.<br /><h6>Resources</h6><ul><li>Qualtrics</li><li>Touchpoints</li></ul>",
        "truthy": ""
      }
    ]
  },
  {
    "id": "mobile",
    "name": "3 - Mobile",
    "description": "",
    "link": "",
    "element": [
      {
        "name": "Mobile Friendliness",
        "guidance": "All public-facing GSA websites must deliver content so it can be consumed on a variety of devices, browsers, and screen sizes (responsive design), per Public Law 115-114 (Connected Government Act), Public Law 115-336 (21st Century IDEA Act), and OMB policies for federal public websites M-17-06.<h6>Resources</h6><ul><li><a href='https://search.google.com/test/mobile-friendly'>Google Mobile Friendliness Test</a></li><li><a href='https://www.bing.com/webmaster/tools/mobile-friendliness'>Bing Mobile Friendly Test</a></li></ul>",
        "truthy": ""
      }
    ]
  },
  {
    "id": "privacy",
    "name": "4 - Privacy",
    "description": "",
    "link": "",
    "element": [
      {
        "name": "?????",
        "guidance": "",
        "truthy": ""
      }
    ]
  },
  {
    "id": "security",
    "name": "5 - Security",
    "description": "",
    "link": "",
    "element": [
      {
        "name": "HTTPS",
        "guidance": "",
        "truthy": ""
      },
      {
        "name": "HTTP Strict Transport Security (HSTS)",
        "guidance": "",
        "truthy": ""
      },
      {
        "name": "HSTS Preloaded",
        "guidance": "",
        "truthy": ""
      },
      {
        "name": "Outdated Cipher Suites",
        "guidance": "Disable RC4 and 3DES ciphers and SSLv2 and SSLv3 protocols",
        "truthy": ""
      },
      {
        "name": "DMARC Policy",
        "guidance": "Have a domain-level DMARC policy of “reject” to provide the strongest protection against spoofed email.",
        "truthy": ""
      },
      {
        "name": "Staging Site",
        "guidance": "Have a domain-level DMARC policy of “reject” to provide the strongest protection against spoofed email.",
        "truthy": ""
      }
    ]
  },
  {
    "id": "third-party",
    "name": "Third-Party Websites and Applications ",
    "description": "",
    "link": "",
    "element": [
      {
        "name": "Utilities and Plugins",
        "guidance": "Applications that require users to download a plugin burden customers. Only use them when they provide clear program value. Link to the authoritative source to download the plugin if it is required to view or access your content.",
        "truthy": ""
      },
      {
        "name": "Flash",
        "guidance": "Adobe no longer supports Flash Player after December 31, 2020 and blocked Flash content from running in Flash Player beginning January 12, 2021. Major browsers have also taken steps to prevent Flash content from rendering on the page.",
        "truthy": ""
      }
    ]
  },
  {
    "id": "information_quality",
    "name": "8 - Information Quality",
    "description": "",
    "link": "",
    "element": [
      {
        "name": "Linking Policy",
        "guidance": "<p>You may link to information created and maintained by other public and private organizations, as well as other SSORs and federal entities, according to legal and ethical considerations, and the requirements outlined in this Order.</p><p>Every GSA domain must develop and post a clear and comprehensive policy for linking to other websites. This policy must include criteria or guidelines for selecting and maintaining external links. At a minimum, these policies must be available from a “Web Policies and Important Links” page. The GSA.gov linking policy presents the policy, disclaimers, and link notifications of GSA.gov, and can serve as a model for all GSA websites.</p><p>Do not duplicate information maintained elsewhere; link to the source.</p><p>Sometimes, this means linking to related non-federal websites. If you link to non-federal sites, remind visitors that those websites do not necessarily operate under the same laws, regulations, and policies as federal websites by clearly identifying 'non-government' links.</p><p>Consider the following, when developing criteria for, or linking to, external sites:</p><ul><li>Is the link appropriate? Is the content mission-related? Is there a conflict of interest?</li><li>What value does it add for GSA’s customers?</li><li>Could a link to a commercial site give the appearance of favoritism or bias? If more than one commercial site offers similar products, information, or services, then you must either link to all sites, or none. You may link to commercial third-party websites if GSA has a formal relationship with the organization or business that operates the website, to increase awareness of the GSA activity. GSA must treat all business partners equally.</li><li>Does a site pose potential privacy issues because they collect PII?</li><li>Would it be easy for your team to monitor and validate the linked information on a regular basis, to ensure it remains relevant for GSA customers?</li><li>Have you consulted with the Office of General Counsel (OGC) to research and resolve any potential copyright issues (i.e., a news site with an article about a GSA program)? Contact OSC at oscweb@gsa.gov for guidance.</li></ul>",
        "truthy": ""
      },
      {
        "name": "Mark External Links",
        "guidance": "<p>US Web Design System provides an icon (<svg class='usa-icon' aria-hidden='true' focusable='false' role='img'><use xlink:href='uswds-2.11.1/img/sprite.svg#launch'></use></svg>) to help sites denote links that point outside of government domains.</p><p>So as not to burden content writers, a simple script can dynamically add the external link icon upon page load.</p>",
        "truthy": ""
      }
    ]
  },
  {
    "id": "section-508",
    "name": "9 - Section 508 Accessibility",
    "description": "Before publication or release: <ul> <li>Test every new piece of content (including web pages, documents, PDFs, videos, etc.) for accessibility.</li> <li>Test new functionality on your websites and apps for accessibility via screen readers and other assistive technologies.</li> <li>Quickly fix accessibility issues when discovered.</li></ul>",
    "link": "",
    "element": [
      {
        "name": "",
        "guidance": "",
        "truthy": ""
      },
      {
        "name": "",
        "guidance": "",
        "truthy": ""
      }
    ]
  },
  {
    "id": "records-management",
    "name": "10 - Records Management",
    "description": "<p>You must maintain your digital content and services in accordance with the standards described in applicable records laws, regulations, and management policies. One records management policy is to maintain a “web records schedule” for the content on your site. You may model it after the Web Records schedule for GSA.gov but it should address the content and schedule specific to your site. </p><p>Find GSA-specific records management guidance on InSite.  If you need additional guidance, contact <a href='mailto:Records@gsa.gov'>Records@gsa.gov</a>.</p>",
    "link": "",
    "element": [
      {
        "name": "",
        "guidance": "",
        "truthy": ""
      },
      {
        "name": "",
        "guidance": "",
        "truthy": ""
      }
    ]
  },
  {
    "id": "plain-language",
    "name": "12 - Plain Language",
    "description": "<p>You must maintain your digital content and services in accordance with the standards described in applicable records laws, regulations, and management policies. One records management policy is to maintain a “web records schedule” for the content on your site. You may model it after the Web Records schedule for GSA.gov but it should address the content and schedule specific to your site. </p><p>Find GSA-specific records management guidance on InSite.  If you need additional guidance, contact <a href='mailto:Records@gsa.gov'>Records@gsa.gov</a>.</p>",
    "link": "",
    "element": [
      {
        "name": "",
        "guidance": "",
        "truthy": ""
      },
      {
        "name": "",
        "guidance": "",
        "truthy": ""
      }
    ]
  },
  {
    "id": "site-search",
    "name": "17 - Site Search",
    "description": "<p>Every GSA website or digital service intended for use by the public must have a search box. This is required by <a href=\"https://www.congress.gov/bill/115th-congress/house-bill/5759/text\">Public Law 115-336, Section 3.a.4</a>.</p>",
    "link": "",
    "element": [
      {
        "name": "Sitemap.xml",
        "guidance": "Publish <a href=\"https://search.gov/manual/sitemaps.html\">XML sitemaps</a> for each domain and subdomain.",
        "truthy": ""
      },
      {
        "name": "Has Search",
        "guidance": "If search capabilities are not available out of the box with your site, Search.gov is a great (and free) resource. Publicly accessible websites that don’t have on-site search should contact Search.gov (search@support.digitalgov.gov) to get started. See also the Search,gov Launch Guide. ",
        "truthy": ""
      }
    ]
  },
  {
    "id": "appendix-1",
    "name": "Appendix 1",
    "description": "<p><b>Required Policy and Notices on GSA websites</b><br /> All public-facing federal websites are <a href='https://digital.gov/resources/required-web-content-and-links/'>required to provide, or link to, agency web policy information</a>. The table below explains how and where to link to the required policies and notices on your website. Instructions vary based on <a href='https://docs.google.com/spreadsheets/d/1YWfj7XmloQvFA8bA8tLC7YAj7BgZivK10hE_97mWuHA/edit#gid=0'>Digital Brand Categories</a>. Please contact <a href='mailto:OSCweb@gsa.gov'>OSCweb@gsa.gov</a> with any questions.</p>",
    "link": "",
    "element": [
      {
        "name": "About Page",
        "guidance": "<ul><li>Site must have own 'About' page that must clearly include affiliation with GSA (and other agencies if appropriate), purpose of site, and points of contact for issues with the site. </li> <li>Site should not reproduce the GSA org chart, but should provide a link to the org chart that is maintained on GSA.gov. (See 16.D in M-17-06 for content)</li> <li>Site 'About' page must link here and link to site-specific website policies</li>",
        "truthy": ""
      },
      {
        "name": "Accessibility Statement",
        "guidance": "",
        "truthy": ""
      },
      {
        "name": "Budget and Performance Reports",
        "guidance": "",
        "truthy": ""
      },
      {
        "name": "Equal Employment",
        "guidance": "",
        "truthy": ""
      },
      {
        "name": "External Links",
        "guidance": "",
        "truthy": ""
      },
      {
        "name": "Freedom of Information Act (FOIA)",
        "guidance": "<ul><li>Site should NOT have own FOIA statement</li><li>Site may redirect user through search best bet to <a href='https://www.gsa.gov/reference/freedom-of-information-act-foia'>GSA FOIA</a> page</li></ul>",
        "truthy": ""
      },
      {
        "name": "Government Customer Support",
        "guidance": "Site must link to <a href='https://usa.gov'>USA.gov</a> in appropriate context",
        "truthy": ""
      },
      {
        "name": "Privacy Policy",
        "guidance": "Site may have own site-specific privacy policy statement. <br />Site must direct users to GSA website policies page",
        "truthy": ""
      },
      {
        "name": "Report Fraud to the Inspector General",
        "guidance": "-Site should NOT have own IG page or statement. Site may redirect user through search best bet to <a href='https://www.gsa.gov/about-us/organization/gsa-office-of-inspector-general-overview'>GSA IG page</a>",
        "truthy": ""
      },
      {
        "name": "Other optional policies (e.g., open source, copyright, TOS)",
        "guidance": "Sites may have own site-specific policy page on which the above (or other) policy statements exist",
        "truthy": ""
      }
    ]
  }
];
}

export {createGuidance};