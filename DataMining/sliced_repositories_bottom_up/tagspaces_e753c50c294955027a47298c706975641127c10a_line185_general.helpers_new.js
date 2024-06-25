import { expect } from '@playwright/test';
import { delay } from './hook';
import { firstFile, toContainTID } from './test-utils';
import AppConfig from '../../src/renderer/AppConfig';
import { dataTidFormat } from '../../src/renderer/services/test';

export const defaultLocationPath =
  './testdata-tmp/file-structure/supported-filestypes';
export const defaultLocationName = 'supported-filestypes';





export async function getGridFileName(fileIndex) {
  try {
    const filesList = await global.client.$$(selectorFile);
    if (filesList.length > 0) {
      let file =
        fileIndex < 0
          ? filesList[filesList.length + fileIndex]
          : filesList[fileIndex];
      const fileNameElem = await file.$('div div div:nth-child(2) p');
      const fileName = await fileNameElem.getAttribute('title');
      return fileName.replace(/ *\[[^\]]*]/, '');
    }
  } catch (e) {
}
