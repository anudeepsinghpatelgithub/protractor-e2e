'use-strict';

const Header = require('./components/Header');

class FormBuilderPage extends Header {
  constructor() {
    super();
    this._filterByStatusButton = element(
      by.css(`[data-target="#filterStatusBody"]`)
    );
    this._statusButton = name =>
      element(
        by.xpath(
          `//div[@id="filterStatusBody"]/descendant::label[contains(text(),'${name}')]`
        )
      );
    this._search = element(by.css(`[data-target="#searchBody"]`));
    this._searchInput = element(by.css(`[placeholder="search for item"]`));
    this._formActionMenu = name =>
      element(
        by.xpath(
          `//div[text()='${name}']/preceding::div[@class='card-options dropdown'][1]`
        )
      );
    this._formActionOptions = (formName, actionName) =>
      element(
        by.xpath(
          `//div[text()='${formName}']/preceding::div[@class='card-options dropdown'][1]/following::button[text()='${actionName}']`
        )
      );
    this._formNameInput = element(by.css(`[id="name"]`));
    this._copyButton = element(by.xpath(`//button[text()="Copy"]`));
    this._formAction = name =>
      element(by.xpath(`//span[text()='${name}']/parent::button`));
    this._form = name => element(by.xpath(`//div[text()='${name}']`));
    this._forms = name => element.all(by.xpath(`//div[text()='${name}']`));
  }

  waitForPageToBeLoaded(name, isWaitForAngular = false) {
    this._helper.pageToBeReady(name);
    if (isWaitForAngular) {
      browser.waitForAngularEnabled(true);
    }
  }

  changeFilterByStatus(status) {
    this._helper.clickOnElement(this._filterByStatusButton);
    this._helper.clickOnElement(this._statusButton(status));
  }

  searchForm(formName) {
    this._searchInput.isDisplayed().then(visible => {
      if (visible) {
        this._helper.fillInput(this._searchInput, formName);
      } else {
        this._helper.clickOnElement(this._search);
        this._helper.fillInput(this._searchInput, formName);
      }
    });
  }

  clickOnFromCardOption(formName, optionName) {
    this._helper.scrollIntoView(this._formActionMenu(formName));
    this._helper.clickOnElement(this._formActionMenu(formName));
    this._helper.clickOnElement(this._formActionOptions(formName, optionName));
  }

  fillCopyFormModel(newFormName) {
    this._helper.fillInput(this._formNameInput, newFormName);
  }

  clickOnCopyButton() {
    this._helper.clickOnElement(this._copyButton);
  }

  clickOnForm(formName) {
    this._helper.clickOnElement(this._form(formName));
  }
  verifyFormDoesNotExist(formName) {
    this._forms(formName).then(function(forms) {
      expect(forms.length).toBe(0);
    });
  }
}

module.exports = FormBuilderPage;
