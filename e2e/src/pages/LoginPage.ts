'use-strict';

//const HelperFunctions = require('./HelperFunctions');
import { HelperFunctions } from './HelperFunctions';
import { element, by } from 'protractor';

export class LoginPage {
  _helper = new HelperFunctions();
  _emailInput = element(by.css(`[placeholder="Username"]`));
  _passwordInput = element(by.css(`[placeholder="Password"]`));
  _singInButton = element(by.xpath(`//button[contains(text(),"Sign In")]`));

  login(email: string, password: string) {
    this._helper.fillInput(this._emailInput, email);
    this._helper.fillInput(this._passwordInput, password);
    this._helper.clickOnElement(this._singInButton);
    //this._helper.pageToBeReady(/v1/); // This is not present today i.e. 10/02/2019.
  }
}
