N
o
 
l
i
n
e
s
import SpellChecker from 'spellchecker';
import languageCodes from '../../utils/language-codes';
const availableLanguages = SpellChecker.getAvailableDictionaries()
  .map((langCode) => {
    return {
      code: langCode,
      name: languageCodes[langCode.replace('-', '_')] || langCode
    };
  })
