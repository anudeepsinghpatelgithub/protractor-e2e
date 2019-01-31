'use strict';
const request = require('sync-request');

class RestClient {
  delete(url, token) {
    console.log('delete url :' + url);
    const response = request('DELETE', url, {
      headers: { 'X-Auth-Token': token }
    });

    if (response.statusCode === 200) {
      const data = JSON.parse(response.getBody());
      console.log('delete call response-->' + JSON.stringify(data));
    } else {
      console.log('Deleteing form by api failed: url' + url);
    }
  }
}

module.exports = RestClient;
