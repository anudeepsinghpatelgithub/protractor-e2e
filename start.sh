#!/bin/bash
rm -rf target
npm install
npm run tsc

default=$1
if [[ ! -z $default ]]
then node_modules/protractor/bin/protractor ./e2e/src/conf/protractor.conf.js --baseUrl="<URL>" --suite="sanity"
else
    echo "default not given"
    read -p "Enter Application url: "  baseUrl
    read -p "Enter suite Name: "  suiteName
    if [ -z $baseUrl ]
    then baseUrl="<URL>"
    fi

    if [ -z $suiteName ]
    then suiteName="sanity"
    fi
    #protractor ./e2e/src/conf/protractor.conf.js --baseUrl=$baseUrl --suite=$suiteName
    # if protractor is not installed globally
    node_modules/protractor/bin/protractor e2eOutputJs/conf/protractor.conf.js --baseUrl=$baseUrl --suite=$suiteName
fi


#generate report
### uncomment line number 20 and comment line number 19 if this code is running on CI server(jenkins/bamboo/travis/)
DIRECTORY=target/allure-results
if [ -d "$DIRECTORY" ]; then
  node_modules/allure-commandline/bin/allure serve target/allure-results --clean -o target/allure-report || true
  # if allure is insatlled globbaly then below command else above
  #allure serve target/allure-results --clean -o target/allure-report || true
fi