import { expect as pExpect } from '@playwright/test';
describe('TST50** - Right button on a file', () => {
  test('TST5016 - Open file [web,minio,electron]', async () => {
    await pExpect
      .poll(
        async () => {
        },
        {
          message: 'make sure bodyTxt contain etete&5435', // custom error message
          timeout: 10000
        }
      )
  });
});
