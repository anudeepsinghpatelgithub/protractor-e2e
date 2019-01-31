'use strict';
const RestClient = require('./RestClient');
class ApiHelper {
  deleteCreatedForm(baseUrl, formId, token) {
    let url = '';
    if (baseUrl.endsWith('/')) {
      url = baseUrl + 'api/forms/definitions/delete/' + formId;
    } else {
      url = baseUrl + '/api/forms/definitions/delete/' + formId;
    }
    new RestClient().delete(url, token);
  }
}

module.exports = ApiHelper;
