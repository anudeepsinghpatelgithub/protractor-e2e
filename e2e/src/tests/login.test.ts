'use-strict';

import { timeouts } from '../conf/protractor.conf';
import { LoginPage } from '../pages/LoginPage';
import { Header } from '../pages/components/Header';
import { TestConstants } from '../TestConstants';

describe('Executing login tests', () => {
  const loginPage = new LoginPage();

  beforeAll(() => {
    console.log('Starting login tests...');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = timeouts.timeoutInterval;
  });

  it('Login with valid user and password', () => {
    loginPage.login(TestConstants.EMAIL, TestConstants.PASSWORD);
    new Header().verifyInDashboard();
  });
});
