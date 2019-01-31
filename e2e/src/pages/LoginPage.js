'use-strict';

const HelperFunctions = require('./HelperFunctions');

class LoginPage {
  constructor() {
    this._helper = new HelperFunctions();
    this._emailInput = element(by.css(`[placeholder="Username"]`));
    this._passwordInput = element(by.css(`[placeholder="Password"]`));
    this._singInButton = element(
      by.xpath(`//button[contains(text(),"Sign In")]`)
    );
  }

  login(email, password) {
    this._helper.fillInput(this._emailInput, email);
    this._helper.fillInput(this._passwordInput, password);
    this._helper.clickOnElement(this._singInButton);
    this._helper.pageToBeReady(/v1/);
  }
}

module.exports = LoginPage;
