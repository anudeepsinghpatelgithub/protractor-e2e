'use strict';
import request from 'sync-request';

export class RestClient {
  delete(url: string, token: any) {
    console.log('delete url :' + url);
    const response = request('DELETE', url, {
      headers: { 'X-Auth-Token': token }
    });

    if (response.statusCode === 200) {
      const data = JSON.parse(response.getBody('utf8'));
      console.log('delete call response-->' + JSON.stringify(data));
    } else {
      console.log('Deleteing form by api failed: url' + url);
    }
  }
}
