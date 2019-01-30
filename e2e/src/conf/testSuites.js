// Test cases for suite smoke
const SMOKE = ['tests/login.test.js'];
// Test cases for suite sanity which contains smoke tests as well
const SANITY = [...SMOKE, 'tests/formCopyAndStatusChange.test.js'];

module.exports = {
  SMOKE,
  SANITY
};
