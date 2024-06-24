import {
  addSearchCommand
} from './search.helpers';
test.describe('TST06 - Test Search in file structure:', () => {
  test('TST0627 - Search q. comp - +tag -tag |tag [web,electron]', async () => {
    const tags1 = ['test-tag1'];
    await addSearchCommand('|' + tags1[0], false);
  });
});
