'use strict';
import { RestClient } from './RestClient';

export class ApiHelper {
  deleteCreatedForm(baseUrl: string, formId: number, token: any) {
    let url = '';
    if (baseUrl.endsWith('/')) {
      url = baseUrl + 'api/forms/definitions/delete/' + formId;
    } else {
      url = baseUrl + '/api/forms/definitions/delete/' + formId;
    }
    new RestClient().delete(url, token);
  }
}
