'use-strict';

const HelperFunctions = require('../HelperFunctions');

class Header {
  constructor() {
    this._helper = new HelperFunctions();
    this._dashboard = element(by.xpath(`//span[text()="Dashboard"]`));
    this._navItems = element.all(by.repeater('item in items'));
    this._navItems = element.all(by.repeater('item in items'));
    this._siteSetupItems = element.all(by.repeater('item in subItems'));
  }

  verifyInDashboard() {
    // This does assertions as well.
    this._helper.elementToBeVisible(this._dashboard);
  }

  clickOnSiteSetup() {
    this._helper.clickOnElementFromList(this._navItems, 'Site Setup');
  }

  clickOnFormBuilder() {
    this._helper.clickOnElementFromList(this._siteSetupItems, 'Form Builder');
  }
}

module.exports = Header;
