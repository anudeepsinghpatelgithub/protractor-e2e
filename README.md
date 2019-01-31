# Pre-requisite

Node.js should be installed and chrome browser

# How to run

1. Clone the project
2. Go to root directory of the project

   **Option 1**

   run command `npm run e2e default` this will run all tests for sanity suite which contains login and copy form tests against hardcoded application, after creating copy form it delete it from ui and making api call for double sure and nothing is left

   **Option 2**

   run command `npm run e2e` press enter and provide arugment asked to run the program

   Enter Application url: https://applicationurl.com

   Enter suite Name: `sanity or smoke` any one of them

   Note: if host is changed then user has to change the password and user name on TestConstants.js file, these are hardcoded but can be exposed to excel or property file so we don't need to change the code.

   **Option 3**

   run command `npm run e2e` press enter and don't provide values for arugment asked just press enter that will again run tests as option1

# !Note:

- All below timeouts can be increased and descreased based on application need and performance

- We should add retry mechanism for faild tests but for this test, I am not doing here for this test
- We should use data provider to run same tests with multiple datasets and avoid duplicate code, I am not doing here for this test
- Test will run on headless mode, if wnat to run with UI then please uncomment the headless property or pass as argument in the command
  chromeOptions: {
  args: [
  'disable-extensions',
  'disable-web-security',
  '--start-fullscreen', // enable for Mac OS
  //'--headless', // start on background
  '--disable-gpu',
  '--window-size=2880,1800'
  ]
  }

# Sample report

![alt text](https://github.com/anudeepsinghpatelgithub/protractor-e2e/blob/master/test-report.png)
