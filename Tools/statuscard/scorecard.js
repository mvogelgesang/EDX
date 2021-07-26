import { createGuidance } from "./guidance.js";
// guidance.js holds all of the categories and specific guidance
var guidance = createGuidance();

// htmlBody is the ID that all of this content will be injected into
var htmlBody = document.getElementById("list");
var content = htmlBody.innerHTML;
var sideNav = "";

content += addDependencies();
// start by creating the header content for the scorecard
content += createScorecardHeader();
// loop over guidance categories
for (var i = 0; i < guidance.length; i++) {
  // create section header section for each category
  content += createCategory(guidance[i]);
  // start compiling lists of category names to create side navigation menu
  sideNav += createSideNavItem(guidance[i]);
  // loop through individual guidance records for the category
  for (var j = 0; j < guidance[i].element.length; j++) {
    // create the accordion element and append to the larger content string
    content += createAccordionElement(guidance[i].id, guidance[i].element[j], j);
  }
  // close off original div that was created at the start of the category section
  content += "</div>";
}
htmlBody.innerHTML = content;
//insert side nav onto page
document.getElementById("scorecard-sidenav").innerHTML = sideNav;

/* FUNCTIONS */

/**
 * dependencies
 */
function addDependencies() {
  return `
<link
  href="scorecard.css"
  type="text/css"
  rel="stylesheet"
/>
`
}

/**
 * 
 */
function createScorecardHeader() {
  return `<div class="grid-container">
    <div class="">
    <h1>Site Scorecard</h1>
    
    <div class="usa-alert usa-alert--info usa-alert--slim" >
  <div class="usa-alert__body">
    <p class="usa-alert__text">This page is in alpha and will change regularly.</p>
    </div>
  </div>
</div>
    <div class="grid-row grid-gap">
      <div class="grid-col-6">
        <form>
          <label class="usa-label" for="input-type-text">URL</label>
          <input
            class="usa-input"
            id="input-type-text"
            name="input-type-text"
            type="text"
          />
          <input class="usa-button usa-tooltip" data-position="right" title="We are still working on this portion of the functionality!" type="submit" value="Submit">
        </form>
      </div>
      <div class="grid-col-6">
        <h2>Site Score</h2>
        <h3 id="siteScore">55</h3>
      </div>
    </div>
    <div class="usa-summary-box" role="complementary" >
      <div class="usa-summary-box__body">
        <h4 class="usa-summary-box__heading">Note</h4>
        <div class="usa-summary-box__text">
        <p>This site scorecard attempts to identify and test all objective GSA and federal guidelines. A full listing of all requirements can be found at XXXXXXXX.</p>
        </div>
      </div>
    </div>
    <div class="grid-row grid-gap">
      <div class="tablet:grid-col-3">
        <nav aria-label="Secondary navigation" class="margin-top-4">
          <ul class="usa-sidenav" id="scorecard-sidenav">
          </ul>
        </nav>
      </div>
    <div class="tablet:grid-col-9">
  `;
}

/**
 * Constructs an individual list item which is comprised of a Category Id and Name
 * @param {*} category 
 */
function createSideNavItem(category) {
  return `<li class="usa-sidenav__item">
    <a href="#${category.id}" class="">${category.name}</a>
  </li>`;
}
/**
 * Starts construction of a new Category section.
 * note, this produces an open ended div that must be closed after other interior elements have been constructed.
 * @param {string} category 
 */
function createCategory(category) {
  return `
    <div class="usa-prose margin-top-4 margin-bottom-2">  
      <h2 id="${category.id}">${category.name}</h2>
      <p>${category.description}
        <br />
        For additional details, see <a href="${category.link}">${category.link}</a>
      </p>
    </div>
    <div
      class="usa-accordion usa-accordion--bordered"
      aria-multiselectable="true"
  >`;
}
/**
 * 
 * @param {string} categoryId ID value from the category object
 * @param {*} categoryElement An instance within the category element array
 * @param {number} i Iteration number within the category element array
 */
function createAccordionElement(categoryId, categoryElement, i) {
  var color = '';
  // this is temporary so as to demonstrate different colors

  color = (i % 2) ? "green" : (i % 3) ? "red": "navy";
  // the button.id naming convention is tied to the functionality built out in the ready() function
  return `
    <h4 class="usa-accordion__heading">
      <button id="${categoryId}-button${i}" 
        class="usa-accordion__button ${color}"
        aria-expanded="false"
        aria-controls="${categoryId}-${i}"
      >
        ${categoryElement.name}
      </button>
    </h4>
    <div id="${categoryId}-${i}" class="usa-accordion__content usa-prose ${color}">
        <h5>Guidance for Success</h5>
        <p>${categoryElement.guidance}</p>
    </div>`;
}

/**
 * Looks for all guidance that has been flagged as red and inserts a button into the accordion menu so that upon reading how to fix the first issue, the user can quickly jump to the second, third, etc
 */
var ready = function () {
  
  var badElements = document.getElementsByClassName(
    "usa-accordion__button red"
  );
  var badElementsLength = badElements.length;
  for (var i = 0; i < badElementsLength; i++) {
    if (badElementsLength - 1 != i) {
      var idname = badElements[i].id.replace("button", "");
      var a = document.createElement("a");
      var idnameNext = badElements[i + 1].id;
      a.href = "#" + idnameNext;
      var btn = document.createElement("button");
      btn.id = "next-" + idname;
      btn.classList.add("usa-button", "usa-button--outline", "margin-top-2");
      btn.innerText = "Jump to next issue";
      a.append(btn);
      document.getElementById(idname).append(a);
    }
  }
};
ready();
