export class TestSuites {
  public static SMOKE = ['../tests/login.test.js'];
  public static SANITY = [...TestSuites.SMOKE, '../tests/formBuilder.test.js'];
}
