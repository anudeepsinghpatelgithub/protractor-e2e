'use-strict';

const HelperFunctions = require('../HelperFunctions');

class Header {
  constructor() {
    this._helper = new HelperFunctions();
    this._logo = element(by.css(`[data-ng-if="menu.brand.image]`));
    this._navItems = element.all(by.repeater('item in items'));
    this._navItems = element.all(by.repeater('item in items'));
    this._siteSetupItems = element.all(by.repeater('item in subItems'));
  }

  verifyLogo() {
    // This does assertions as well.
    this._helper.elementToBeVisible(this._logo);
  }

  clickOnSiteSetup() {
    this._helper.clickOnElementFromList(this._navItems, 'Site Setup');
  }

  clickOnFormBuilder() {
    this._helper.clickOnElementFromList(this._siteSetupItems, 'Form Builder');
  }
}

module.exports = Header;
