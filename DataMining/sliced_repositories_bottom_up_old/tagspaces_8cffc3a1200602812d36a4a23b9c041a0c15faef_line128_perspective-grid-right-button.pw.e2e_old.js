describe('TST50** - Right button on a file', () => {
  test('TST5018 - Delete file [web,minio,electron]', async () => {
    const fileName = 'sample.html'; // await getGridFileName(-1);
    await expectElementExist(getGridFileSelector(fileName), false);
  });
});
