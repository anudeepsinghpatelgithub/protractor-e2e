'use-strict';

const protractor = require('protractor');
const EC = protractor.ExpectedConditions;
const protractorConf = require('../conf/protractor.conf');
const explicitWait = protractorConf.timeouts.explicitWait;

class HelperFunctions {
  constructor() {}

  static elementToBeClickable(element, wait = null) {
    return browser.wait(
      EC.elementToBeClickable(element),
      wait ? wait : explicitWait,
      'Element "' + element.locator() + '" is not clickable'
    );
  }

  static elementToBeVisible(element, wait = null) {
    return browser.wait(
      EC.visibilityOf(element),
      wait ? wait : explicitWait,
      'Element "' + element.locator() + '" is not visible'
    );
  }

  static elementToBePresent(element, wait = null) {
    return browser.wait(
      EC.presenceOf(element),
      wait ? wait : explicitWait,
      'Element "' + element.locator() + '" is not present'
    );
  }

  static pageToBeReady(pageName, wait = null) {
    return browser.wait(
      () => {
        return browser.getCurrentUrl().then(url => {
          return pageName.test(url);
        });
      },
      wait ? wait : explicitWait
    );
  }
}

module.exports = HelperFunctions;
