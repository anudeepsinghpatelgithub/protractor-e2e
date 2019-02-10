'use-strict';

import { Header } from '../pages/components/Header';
import { element, by } from 'protractor';

export class MultiPage extends Header {
  constructor() {
    super();
  }
  _formActionButton = (name: string) =>
    element(by.xpath(`//span[text()='${name}']/parent::button`));
  _orderInfoSection = (name: string) =>
    element(by.xpath(`//a[text()="${name}"]`));
  _selectOptions = (name: string) =>
    element(
      by.xpath(
        `//a[text()="${name}"]/following::div[@data-ng-model="model.value"]`
      )
    );
  _status = (name: string) => element(by.xpath(`//div[text()="${name}"]`));
  _deleteConfirmYesButton = element(by.css(`[id="bot2-Msg1"]`));

  clickOnMultiFormAction(actionName: string) {
    this._helper.clickOnElement(this._formActionButton(actionName));
  }

  changeStatusForOrderSection(orderSection: string, statusName: string) {
    this._helper.scrollIntoView(this._orderInfoSection(orderSection));
    this._helper.clickOnElementUsingActions(this._selectOptions(orderSection));
    this._helper.clickOnElement(this._status(statusName));
    this._helper.clickOnElement(this._formActionButton('Save'));
  }

  deleteCurrentForm() {
    this._helper.clickOnElement(this._formActionButton('Delete'));
    this._helper.clickOnElement(this._deleteConfirmYesButton);
  }

  getFormId(url: string) {
    const ulrParts = url.split('admin/forms/')[1];
    return Number(ulrParts.split('/')[0]);
  }
}
