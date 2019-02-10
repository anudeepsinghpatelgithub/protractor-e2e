'use-strict';

import { TestConstants } from '../TestConstants';
import { Utils } from '../utils/Utils';
import { timeouts } from '../conf/protractor.conf';

import { LoginPage } from '../pages/LoginPage';

import { FormBuilderPage } from '../pages/FormBuilderPage';
import { MultiPage } from '../pages/MultiPage';

import { ApiHelper } from '../api/ApiHelper';
import { browser } from 'protractor';

/**
 * This test will create a copy of form and change the status to On hold and
 * then delete that and verify, Apart from this also make a api call to delete for double sure nothing left
 * and don't clutter the application
 */
describe('Executing form builder tests', () => {
  let formId: number;
  let token: any;
  beforeAll(() => {
    console.log('Starting form builder tests...');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = timeouts.timeoutInterval;
    const loginPage = new LoginPage();
    loginPage.login(TestConstants.EMAIL, TestConstants.PASSWORD);
  });
  beforeEach(() => {
    // disabling the test to wait for angular i.e. waitForAngularEnabled,
    // it was taking too much time to execute tests, refer: https://www.protractortest.org/#/timeouts
    // All the defined timeouts are undercontrol, might be somethinging is missing
    /**
       * AngularJS
        If your AngularJS application continuously polls $timeout or $http,
        Protractor will wait indefinitely and time out.
        You should use the $interval for anything that polls continuously (introduced in Angular 1.2rc3).

      Angular
      For Angular apps, Protractor will wait until the Angular Zone stabilizes.
      This means long running async operations will block your test from continuing.
      To work around this, run these tasks outside the Angular zone. For example:
       */
    browser.waitForAngularEnabled(false);
  });

  afterEach(() => {
    // Re-enabling the test to wait for angular
    // Delete the created form using API for safer side
    if (formId) {
      new ApiHelper().deleteCreatedForm(browser.baseUrl, formId, token);
    }
    browser.waitForAngularEnabled(true);
  });
  it('Test copy form and change status to onHold', () => {
    const formBuilder = new FormBuilderPage();
    browser.waitForAngularEnabled(true);
    formBuilder.clickOnSiteSetup();
    browser.waitForAngularEnabled(false);
    formBuilder.clickOnFormBuilder();
    formBuilder.waitForPageToBeLoaded(/forms/);
    formBuilder.changeFilterByStatus(TestConstants.STATUS);
    formBuilder.searchForm(TestConstants.SEARCH_KEYWORD);
    formBuilder.clickOnFromCardOption(
      TestConstants.FORM_NAME,
      TestConstants.FORM_OPTION
    );
    const copyFormName =
      'qa-asp-' + Utils.getRandomNumber() + '-' + TestConstants.FORM_NAME;
    console.log(copyFormName);
    formBuilder.fillCopyFormModel(copyFormName);
    formBuilder.clickOnCopyButton();
    formBuilder.waitForPageToBeLoaded(/multi/, true);
    browser.waitForAngularEnabled(false);
    const multiPage = new MultiPage();
    // Get form id from current url
    browser.getCurrentUrl().then(url => {
      formId = multiPage.getFormId(url);
      console.log('formId----' + formId);
      // Get token
      browser
        .executeScript("return localStorage.getItem('clienttoken');")
        .then(value => {
          token = value;
          console.log('token----' + token);
        });
    });
    multiPage.clickOnMultiFormAction(TestConstants.OPEN);
    formBuilder.waitForPageToBeLoaded(/forms/);
    formBuilder.searchForm(copyFormName);
    formBuilder.clickOnForm(copyFormName);
    formBuilder.waitForPageToBeLoaded(/multi/, true);
    multiPage.changeStatusForOrderSection('Workflow Status', 'On Hold');
    multiPage.deleteCurrentForm();
    // Search the deleted form and make sure it doesn't appear in forms
    formBuilder.waitForPageToBeLoaded(/forms/, true);
    browser.waitForAngularEnabled(false);
    formBuilder.searchForm(copyFormName);
    formBuilder.verifyFormDoesNotExist(copyFormName);
  });
});
