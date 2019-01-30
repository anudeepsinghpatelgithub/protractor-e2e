'use-strict';

const HelperFunctions = require('./HelperFunctions');

class LoginPage {
  constructor() {
    this._emailInput = element(by.model(`ctrl.model.user`));
    this._passwordInput = element(by.model(`ctrl.model.pass`));
    this.singInButton = element(
      by.xpath(`//button[contains(text()," Sign In")]`)
    );
  }

  login(email, password) {
    HelperFunctions.elementToBeVisible(this._emailInput);
    this._emailInput.clear().sendKeys(email);

    HelperFunctions.elementToBeVisible(this._passwordInput);
    this._passwordInput.clear().sendKeys(password);

    HelperFunctions.elementToBeClickable(this.singInButton);
    this.singInButton.click();
    HelperFunctions.pageToBeReady('/');
  }
}

module.exports = LoginPage;
