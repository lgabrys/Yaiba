import languageCodes from 'browser/utils/language-codes';
const availableLanguages = getAvailableDictionaries()
  .map((langCode) => {
    return {
      code: langCode,
      name: languageCodes[langCode] || languageCodes[langCode.replace('-', '_').split('_')[0]]
    };
  })
