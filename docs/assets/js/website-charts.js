/**
* Gives a CSS custom property value applied at the element
* element {Element}
* varName {String} without '--'
*
* For example:
* readCssVar(document.querySelector('.box'), 'color');
*/
function readCssVar(element, varName){
    const elementStyles = getComputedStyle(element);
    return elementStyles.getPropertyValue(`--${varName}`).trim();
  }
  
  /**
  * Writes a CSS custom property value at the element
  * element {Element}
  * varName {String} without '--'
  *
  * For example:
  * readCssVar(document.querySelector('.box'), 'color', 'white');
  */
  function writeCssVar(element, varName, value){
    return element.style.setProperty(`--${varName}`, value);
  }
  
  console.log(readCssVar(document.querySelector(".graph .one"), "value"));
  
  writeCssVar(document.querySelector(".graph .one"), "value", 2 )