'use-strict';

import { Header } from './components/Header';
import { browser, element, by } from 'protractor';

export class FormBuilderPage extends Header {
  constructor() {
    super();
  }
  _filterByStatusButton = element(by.css(`[data-target="#filterStatusBody"]`));
  _statusButton = (name: string) =>
    element(
      by.xpath(
        `//div[@id="filterStatusBody"]/descendant::label[contains(text(),'${name}')]`
      )
    );
  _search = element(by.css(`[data-target="#searchBody"]`));
  _searchInput = element(by.css(`[placeholder="search for item"]`));
  _formActionMenu = (name: string) =>
    element(
      by.xpath(
        `//div[text()='${name}']/preceding::div[@class='card-options dropdown'][1]`
      )
    );
  _formActionOptions = (formName: string, actionName: string) =>
    element(
      by.xpath(
        `//div[text()='${formName}']/preceding::div[@class='card-options dropdown'][1]/following::button[text()='${actionName}']`
      )
    );
  _formNameInput = element(by.css(`[id="name"]`));
  _copyButton = element(by.xpath(`//button[text()="Copy"]`));
  _formAction = (name: string) =>
    element(by.xpath(`//span[text()='${name}']/parent::button`));
  _form = (name: string) => element(by.xpath(`//div[text()='${name}']`));
  _forms = (name: string) => element.all(by.xpath(`//div[text()='${name}']`));

  waitForPageToBeLoaded(name: any, isWaitForAngular: boolean = false) {
    this._helper.pageToBeReady(name);
    if (isWaitForAngular) {
      browser.waitForAngularEnabled(true);
    }
  }

  changeFilterByStatus(status: string) {
    this._helper.clickOnElement(this._filterByStatusButton);
    this._helper.clickOnElement(this._statusButton(status));
  }

  searchForm(formName: string) {
    this._searchInput.isDisplayed().then(visible => {
      if (visible) {
        this._helper.fillInput(this._searchInput, formName);
      } else {
        this._helper.clickOnElement(this._search);
        this._helper.fillInput(this._searchInput, formName);
      }
    });
  }

  clickOnFromCardOption(formName: string, optionName: string) {
    this._helper.scrollIntoView(this._formActionMenu(formName));
    this._helper.clickOnElement(this._formActionMenu(formName));
    this._helper.clickOnElement(this._formActionOptions(formName, optionName));
  }

  fillCopyFormModel(newFormName: string) {
    this._helper.fillInput(this._formNameInput, newFormName);
  }

  clickOnCopyButton() {
    this._helper.clickOnElement(this._copyButton);
  }

  clickOnForm(formName: string) {
    this._helper.clickOnElement(this._form(formName));
  }
  verifyFormDoesNotExist(formName: string) {
    this._forms(formName).then(function(forms) {
      expect(forms.length).toBe(0);
    });
  }
}
