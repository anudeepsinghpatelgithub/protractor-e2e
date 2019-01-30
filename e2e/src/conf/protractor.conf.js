"use strict";
/**
 * Note: All below timeouts can be increased and descreased based on application need and performance
 */
// Maximum time to wait for a page load
const pageLoadTimeout = 30000;
// Wait before each command
const implicitlyWait = 1000;
// Maximum time to wait for an element visible
const explicitWait = 30000;
// Protractor waits until there are no pending asynchronous tasks in your Angular
const allScriptsTimeout = 180000; // maximum 3 min, generally on first laod
// Total time before throwing NO ACTIVE SESSION_ID, Please doc for more info
const timeoutInterval = 3600000; //60 min for now
// Wait after page is loaded
const pageResolveTimeout = 1000;

exports.timeouts = {
  explicitWait: explicitWait,
  pageResolveTimeout: pageResolveTimeout,
  timeoutInterval: timeoutInterval
};
exports.config = {
  framework: "jasmine2",
  allScriptsTimeout: allScriptsTimeout,
  useAllAngular2AppRoots: true,
  baseUrl: "http://localhost:3000", // default url if nothing provided
  capabilities: {
    browserName: "chrome",
    shardTestFiles: true,
    maxInstances: 1,
    chromeOptions: {
      args: [
        "disable-extensions",
        "disable-web-security",
        "--start-fullscreen", // enable for Mac OS
        "--headless", // start on background
        "--disable-gpu",
        "--window-size=2880,1800"
      ]
    },
    "moz:firefoxOptions": {
      args: ["--headless"]
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
    smoke: testSuites.SMOKE,
    sanity: testSuites.SANITY
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
    let AllureReporter = require("jasmine-allure-reporter");
    jasmine.getEnv().addReporter(
      new AllureReporter({
        resultsDir: "target/allure-results"
      })
    );
    // Add screenshot to allure report. screenshot are taken after each test
    jasmine.getEnv().afterEach(function(done) {
      browser.takeScreenshot().then(function(png) {
        allure.createAttachment(
          "Screenshot",
          function() {
            return new Buffer(png, "base64");
          },
          "image/png"
        )();
        done();
      });
    });
    // Allure reporter done
    jasmine.getEnv().addReporter(
      new function() {
        this.specDone = function(result) {
          if (result.status !== "passed") {
            logger.debug("Test is failed: " + JSON.stringify(result.testInfo));
            // Add custom logic to do if test failed ad etc...
          }
        };
      }()
    );

    browser.get(browser.baseUrl);
    return browser.wait(() => {
      return browser.getCurrentUrl().then(url => {
        return /login/.test(url);
      });
    }, pageResolveTimeout);
  }
};
