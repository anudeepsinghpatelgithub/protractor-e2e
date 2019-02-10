'use-strict';

//const HelperFunctions = require('../HelperFunctions');
import { HelperFunctions } from '../HelperFunctions';
import { element, by } from 'protractor';

export class Header {
  _helper = new HelperFunctions();
  _dashboard = element(by.xpath(`//span[text()="Dashboard"]`));
  _navItems = element.all(by.repeater('item in items'));
  _siteSetupItems = element.all(by.repeater('item in subItems'));

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
