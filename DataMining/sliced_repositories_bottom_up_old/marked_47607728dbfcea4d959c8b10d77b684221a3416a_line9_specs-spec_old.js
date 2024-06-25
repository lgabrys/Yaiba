var specTests = require('../../');
it('should run spec tests', () => {
  if (!specTests(['', '', '--stop'])) {
    specTests();
  }
});
