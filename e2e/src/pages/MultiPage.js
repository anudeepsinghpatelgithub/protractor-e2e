'use-strict';

const Header = require('../pages/components/Header');

class MultiPage extends Header {
  constructor() {
    super();
    this._formActionButton = name =>
      element(by.xpath(`//span[text()='${name}']/parent::button`));
    this._orderInfoSection = name => element(by.xpath(`//a[text()="${name}"]`));
    this._selectOptions = name =>
      element(
        by.xpath(
          `//a[text()="${name}"]/following::div[@data-ng-model="model.value"]`
        )
      );
    this._status = name => element(by.xpath(`//div[text()="${name}"]`));
    this._deleteConfirmYesButton = element(by.css(`[id="bot2-Msg1"]`));
  }

  clickOnMultiFormAction(actionName) {
    this._helper.clickOnElement(this._formActionButton(actionName));
  }

  changeStatusForOrderSection(orderSection, statusName) {
    this._helper.scrollIntoView(this._orderInfoSection(orderSection));
    this._helper.clickOnElementUsingActions(this._selectOptions(orderSection));
    this._helper.clickOnElement(this._status(statusName));
    this._helper.clickOnElement(this._formActionButton('Save'));
  }

  deleteCurrentForm() {
    this._helper.clickOnElement(this._formActionButton('Delete'));
    this._helper.clickOnElement(this._deleteConfirmYesButton);
  }

  getFormId(url) {
    const ulrParts = url.split('admin/forms/')[1];
    return ulrParts.split('/')[0];
  }
}
module.exports = MultiPage;
