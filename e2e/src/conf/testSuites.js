// Test cases for suite smoke
const SMOKE = ['../tests/login.test.js'];
// Test cases for suite sanity which contains smoke tests as well
const SANITY = [...SMOKE, '../tests/formBuilder.test.js'];

module.exports = {
  SMOKE,
  SANITY
};
