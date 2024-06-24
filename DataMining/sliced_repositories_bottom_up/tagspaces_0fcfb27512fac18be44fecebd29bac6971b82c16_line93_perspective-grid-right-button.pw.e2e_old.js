import { expect as pExpect } from '@playwright/test';
import {
  defaultLocationPath,
  renameFileFromMenu,
  deleteFileFromMenu,
  createPwMinioLocation,
  createPwLocation
} from './location.helpers';
import { searchEngine } from './search.helpers';
import { openContextEntryMenu, toContainTID } from './test-utils';
import {
} from './general.helpers';
const testTagName = 'testTag'; // TODO fix camelCase tag name
describe('TST50** - Right button on a file', () => {
  test('TST5016 - Open file [web,minio,electron]', async () => {
    await pExpect
      .poll(
        async () => {
        },
        {
          message: 'make sure bodyTxt contain etete&5435', // custom error message
          timeout: global.isWeb ? 40000 : 10000
        }
      )
  });
});
