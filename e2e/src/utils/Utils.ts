'use-strict';

export class Utils {
  // we can use any other uuid/short id package e.g. shortid or uuid
  static getRandomNumber() {
    let text = '';
    let possible = '0123456789';

    for (let i = 0; i < 4; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
}
