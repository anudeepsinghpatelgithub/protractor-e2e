'use-strict';

const protractorConf = require('../conf/protractor.conf');
const LoginPage = require('../pages/LoginPage');

describe('Executing login tests', () => {
  const loginPage = new LoginPage();
  beforeAll(() => {
    console.log('Starting login tests...');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = protractorConf.timeouts.timeoutInterval;
    loginPage.login('qa2test@mailinator.com', 'Prim0tus!');
  });

  it('Login with valid user and password', () => {});
});
