'use strict';
import { Config, browser } from 'protractor';
import { TestSuites } from './TestSuites';
declare const allure: any;
/**
 * Note: All below timeouts can be increased and descreased based on application need and performance
 * We should add retry mechanism for faild tests but for this test, I have not added it here
 * All timeouts are in milliseconds
 */
// Maximum time to wait for a page load generally first time
const pageLoadTimeout = 300000; //5 min . qa app is slow
const implicitlyWait = 5000; //should not be more than 5 seconds, this will impact over all execution time
// Maximum time to wait for an element visible
const explicitWait = 60000; // Wait for maximum 30 sec for any element to be present
// Protractor waits until there are no pending asynchronous tasks in your Angular
const allScriptsTimeout = 90000; // maximum 1.5 min to finish all asynchronous network call
// Total time before throwing NO ACTIVE SESSION_ID, Please doc for more info
const timeoutInterval = 3600000; //60 min for now(just a arbitrary number for now, need to add based on overall tests)
// Wait after page is loaded
const pageResolveTimeout = 1000;

export let timeouts = {
  explicitWait: explicitWait,
  pageResolveTimeout: pageResolveTimeout,
  timeoutInterval: timeoutInterval
};
export let config: Config = {
  framework: 'jasmine2',
  allScriptsTimeout: allScriptsTimeout,
  directConnect: false,
  baseUrl: 'http://localhost:3000', // default url if nothing provided
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 1,
    chromeOptions: {
      args: [
        'disable-extensions',
        'disable-web-security',
        '--start-fullscreen', // enable for Mac OS
        //'--headless', // start on background
        '--disable-gpu',
        '--window-size=2880,1800'
      ]
    },
    'moz:firefoxOptions': {
      args: ['--headless']
    }
  },
  jasmineNodeOpts: {
    defaultTimeoutInterval: timeoutInterval,
    isVerbose: true,
    showTiming: true,
    includeStackTrace: true,
    realtimeFailure: true,
    showColors: true
  },
  suites: {
    smoke: TestSuites.SMOKE,
    sanity: TestSuites.SANITY
  },
  onPrepare: () => {
    browser
      .manage()
      .timeouts()
      .pageLoadTimeout(pageLoadTimeout);
    browser
      .manage()
      .timeouts()
      .implicitlyWait(implicitlyWait);

    // Allure reporter start
    let AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(
      new AllureReporter({
        resultsDir: 'target/allure-results'
      })
    );
    // Add screenshot to allure report. screenshot are taken after each test
    jasmine.getEnv().afterEach(function(done) {
      browser.takeScreenshot().then(function(png) {
        allure.createAttachment(
          'Screenshot',
          function() {
            return new Buffer(png, 'base64');
          },
          'image/png'
        )();
        done();
      });
    });

    console.log('browser.baseUrl--' + browser.baseUrl);
    browser.get(browser.baseUrl);
    return browser.wait(() => {
      return browser.getCurrentUrl().then(url => {
        return /login/.test(url);
      });
    }, pageResolveTimeout);
  }
};
