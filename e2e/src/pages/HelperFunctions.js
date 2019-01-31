'use-strict';

const protractor = require('protractor');
const EC = protractor.ExpectedConditions;
const protractorConf = require('../conf/protractor.conf');
const explicitWait = protractorConf.timeouts.explicitWait;

class HelperFunctions {
  elementToBeClickable(element, wait = null) {
    return browser.wait(
      EC.elementToBeClickable(element),
      wait ? wait : explicitWait,
      'Element "' + element.locator() + '" is not clickable'
    );
  }

  elementToBeVisible(element, wait = null) {
    return browser.wait(
      EC.visibilityOf(element),
      wait ? wait : explicitWait,
      'Element "' + element.locator() + '" is not visible'
    );
  }

  elementToBePresent(element, wait = null) {
    return browser.wait(
      EC.presenceOf(element),
      wait ? wait : explicitWait,
      'Element "' + element.locator() + '" is not present'
    );
  }

  pageToBeReady(pageName, wait = null) {
    return browser.wait(
      () => {
        return browser.getCurrentUrl().then(url => {
          return pageName.test(url);
        });
      },
      wait ? wait : explicitWait
    );
  }

  clickOnElementFromList(elementList, itemName) {
    elementList
      .filter(function(elem, index) {
        return elem.getText().then(function(text) {
          return text.trim() === itemName;
        });
      })
      .first()
      .click();
  }

  scrollIntoView(element) {
    browser.executeScript('arguments[0].scrollIntoView()', element);
  }

  fillInput(element, value) {
    this.elementToBeVisible(element);
    element.clear().sendKeys(value);
  }

  clickOnElementUsingActions(element) {
    this.elementToBeVisible(element);
    browser
      .actions()
      .mouseMove(element)
      .doubleClick()
      .perform();
  }

  clickOnElement(element) {
    this.elementToBeClickable(element);
    element.click();
  }
}

module.exports = HelperFunctions;
