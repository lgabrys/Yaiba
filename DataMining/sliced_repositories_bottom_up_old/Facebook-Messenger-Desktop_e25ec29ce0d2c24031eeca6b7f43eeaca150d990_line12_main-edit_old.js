import languageCodes from 'browser/utils/language-codes';
const availableLanguages = getAvailableDictionaries()
  .map((langCode) => {
    return {
      code: langCode,
      name: languageCodes[langCode] || langCode
    };
  })
