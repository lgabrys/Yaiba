import AppConfig from '../../app/AppConfig';
export async function expectMetaFilesExist(
  arrMetaFiles,
  exist = true,
  subFolder = undefined
) {
  await checkSettings('[data-tid=settingsSetShowUnixHiddenEntries]', true);
  if (exist || (await isDisplayed(getGridFileSelector(AppConfig.metaFolder)))) {
    await expectElementExist(
      getGridFileSelector(AppConfig.metaFolder),
      exist,
      10000
    );
  }
}
