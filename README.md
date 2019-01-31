# Pre-requisite

Node.js should be installed and chrome browser

# How to run

1. Clone the project
2. Go to root directory of the project
   **Option 1**
   run command `npm run e2e default` this will run all tests for sanity suite which contains login and copy form tests against hardcoded application
   **Option 2**
   run command `npm run e2e` press enter and provide arugment asked to run the program
   Enter Application url: https://applicationurl.com
   Enter suite Name: `sanity or smoke` any one of them
   **Option 3**
   run command `npm run e2e` press enter and don't provide values for arugment asked just press enter that will again run tests as option1

# !Note:

- All below timeouts can be increased and descreased based on application need and performance

- We should add retry mechanism for faild tests but for this test, I am not doing here for this test
- We should use data provider to run same tests with multiple datasets and avoid duplicate code, I am not doing here for this test
