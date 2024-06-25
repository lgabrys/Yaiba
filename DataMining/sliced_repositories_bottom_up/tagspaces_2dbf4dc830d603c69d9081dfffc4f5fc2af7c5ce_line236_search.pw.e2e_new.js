import {
} from './search.helpers';
import { clearDataStorage, closeWelcomePlaywright } from './welcome.helpers';
import { openContextEntryMenu } from './test-utils';
test.afterEach(async ({ page }, testInfo) => {
});
test.describe('TST06 - Test Search in file structure:', () => {
  test('TST0627 - Search q. comp - +tag -tag |tag [web,electron]', async () => {
    const tags1 = ['test-tag1'];
    await addSearchCommand('|' + tags1[0], false, false);
  });
});
