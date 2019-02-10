'use-strict';

import { browser, ExpectedConditions } from 'protractor';
import { timeouts } from '../conf/protractor.conf';
const explicitWait = timeouts.explicitWait;
const EC = ExpectedConditions;

export class HelperFunctions {
  elementToBeClickable(element: any, wait: any = null) {
    return browser.wait(
      EC.elementToBeClickable(element),
      wait ? wait : explicitWait,
      'Element "' + element.locator() + '" is not clickable'
    );
  }

  elementToBeVisible(element: any, wait: any = null) {
    return browser.wait(
      EC.visibilityOf(element),
      wait ? wait : explicitWait,
      'Element "' + element.locator() + '" is not visible'
    );
  }

  elementToBePresent(element: any, wait: any = null) {
    return browser.wait(
      EC.presenceOf(element),
      wait ? wait : explicitWait,
      'Element "' + element.locator() + '" is not present'
    );
  }

  pageToBeReady(pageName: any, wait: any = null) {
    return browser.wait(
      () => {
        return browser.getCurrentUrl().then(url => {
          return pageName.test(url);
        });
      },
      wait ? wait : explicitWait
    );
  }

  clickOnElementFromList(elementList: any, itemName: any) {
    elementList
      .filter(function(elem: any, index: any) {
        return elem.getText().then(function(text: any) {
          return text.trim() === itemName;
        });
      })
      .first()
      .click();
  }

  scrollIntoView(element: any) {
    browser.executeScript('arguments[0].scrollIntoView()', element);
  }

  fillInput(element: any, value: any) {
    this.elementToBeVisible(element);
    element.clear().sendKeys(value);
  }

  clickOnElementUsingActions(element: any) {
    this.elementToBeVisible(element);
    browser
      .actions()
      .mouseMove(element)
      .doubleClick()
      .perform();
  }

  clickOnElement(element: any) {
    this.elementToBeClickable(element);
    element.click();
  }
}
