'use-strict';

const protractorConf = require('../conf/protractor.conf');
const LoginPage = require('../pages/LoginPage');
const Header = require('../pages/components/Header');
const Contants = require('../TestConstants');
describe('Executing login tests', () => {
  const loginPage = new LoginPage();

  beforeAll(() => {
    console.log('Starting login tests...');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = protractorConf.timeouts.timeoutInterval;
  });

  it('Login with valid user and password', () => {
    loginPage.login(Contants.LOGIN_INFO.EMAIL, Contants.LOGIN_INFO.PASSWORD);
    new Header().verifyLogo();
  });
});
