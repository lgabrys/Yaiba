var marked = require('../../../lib/marked.js');
var cmSpec = require('./commonmark.0.28.json');
var HtmlDiffer = require('@markedjs/html-differ').HtmlDiffer,
    htmlDiffer = new HtmlDiffer({ignoreSelfClosingSlash: true});
var since = require('jasmine2-custom-message');

var Messenger = function() {};

Messenger.prototype.message = function(spec, expected, actual) {
  return 'CommonMark (' + spec.section + '):\n' + spec.markdown + '\n------\n\nExpected:\n' + expected + '\n------\n\nMarked:\n' + actual;
};

Messenger.prototype.test = function(spec, section, ignore) {
  if (spec.section === section) {
    var shouldFail = ~ignore.indexOf(spec.example);
    it('should ' + (shouldFail ? 'fail' : 'pass') + ' example ' + spec.example, function() {
      var expected = spec.html;
      var actual = marked(spec.markdown, { headerIds: false, xhtml: true });
      since(messenger.message(spec, expected, actual)).expect(
        htmlDiffer.isEqual(expected, actual)
      ).toEqual(!shouldFail);
    });
  }
};

var messenger = new Messenger();
/*
|Section                                 |Count      |Percent |
|:---------------------------------------|:---------:|-------:|
|Tabs                                    | 10 of  11 |     91%|
|Precedence                              |  1 of   1 |    100%|
|Thematic breaks                         | 19 of  19 |    100%|
|ATX headings                            | 14 of  18 |     78%|
|Setext headings                         | 21 of  26 |     81%|
|Indented code blocks                    | 12 of  12 |    100%|
|Fenced code blocks                      | 21 of  28 |     75%|
|HTML blocks                             | 43 of  43 |    100%|
|Link reference definitions              | 22 of  23 |     96%|
|Paragraphs                              |  8 of   8 |    100%|
|Blank lines                             |  1 of   1 |    100%|
|Block quotes                            | 21 of  25 |     84%|
|List items                              | 32 of  48 |     67%|
|Lists                                   | 12 of  24 |     50%|
|Inlines                                 |  1 of   1 |    100%|
|Backslash escapes                       | 10 of  13 |     77%|
|Entity and numeric character references |  9 of  12 |     75%|
|Code spans                              | 11 of  17 |     65%|
|Emphasis and strong emphasis            | 79 of 128 |     61%|
|Links                                   | 69 of  84 |     82%|
|Images                                  | 15 of  22 |     68%|
|Autolinks                               | 15 of  19 |     79%|
|Raw HTML                                | 19 of  21 |     90%|
|Hard line breaks                        | 15 of  15 |    100%|
|Soft line breaks                        |  2 of   2 |    100%|
|Textual content                         |  3 of   3 |    100%|
*/

describe('CommonMark 0.28 Tabs', function() {
  var section = 'Tabs';

  // These examples probably should pass but don't for some reason.
  // This is the easiest way to demonstrate limitations  or defects
  // within Marked. Toggle comments for next two lines to see which examples
  // are known failures. Note: If all arrays are empty, it means Marked is
  // 100% compliant with that section of the given specification.
  //
  // var shouldPassButFails = [];
  var shouldPassButFails = [7];

  // Identifies examples that the Marked core team has determined beyond
  // the ability or desire to correct; thereby, implicitly requesting
  // outside help and assistance.
  var willNotBeAttemptedByCoreTeam = [];

  // Combine known failures and skips.
  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    // Run test.
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Precedence', function() {
  var section = 'Precedence';

  // var shouldPassButFails = [];
  var shouldPassButFails = [];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Thematic breaks', function() {
  var section = 'Thematic breaks';

  // var shouldPassButFails = [];
  var shouldPassButFails = [];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 ATX headings', function() {
  var section = 'ATX headings';

  // var shouldPassButFails = [];
  var shouldPassButFails = [40, 45, 46, 49];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Setext headings', function() {
  var section = 'Setext headings';

  // var shouldPassButFails = [];
  var shouldPassButFails = [51, 52, 56, 62, 64];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Indented code blocks', function() {
  var section = 'Indented code blocks';

  // var shouldPassButFails = [];
  var shouldPassButFails = [];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Fenced code blocks', function() {
  var section = 'Fenced code blocks';

  var shouldPassButFails = [];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 HTML blocks', function() {
  var section = 'HTML blocks';

  var shouldPassButFails = [];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Link reference definitions', function() {
  var section = 'Link reference definitions';

  // var shouldPassButFails = [];
  var shouldPassButFails = [167];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Paragraphs', function() {
  var section = 'Paragraphs';

  // var shouldPassButFails = [];
  var shouldPassButFails = [];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Blank lines', function() {
  var section = 'Blank lines';

  // var shouldPassButFails = [];
  var shouldPassButFails = [];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Block quotes', function() {
  var section = 'Block quotes';

  // var shouldPassButFails = [];
  var shouldPassButFails = [198, 199, 200, 201];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 List items', function() {
  var section = 'List items';

  // var shouldPassButFails = [];
  var shouldPassButFails = [237, 236, 227, 218, 243, 259, 241, 239, 247, 246, 225, 220, 258, 260, 244];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Lists', function() {
  var section = 'Lists';

  // var shouldPassButFails = [];
  var shouldPassButFails = [282, 270, 280, 278, 273, 274, 264, 265, 276, 279, 267, 269];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Inlines', function() {
  var section = 'Inlines';

  // var shouldPassButFails = [];
  var shouldPassButFails = [];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Backslash escapes', function() {
  var section = 'Backslash escapes';

  // var shouldPassButFails = [];
  var shouldPassButFails = [300, 301];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Entity and numeric character references', function() {
  var section = 'Entity and numeric character references';

  // var shouldPassButFails = [];
  var shouldPassButFails = [311, 309, 310];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Code spans', function() {
  var section = 'Code spans';

  var shouldPassButFails = [322, 323];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Emphasis and strong emphasis', function() {
  var section = 'Emphasis and strong emphasis';

  // var shouldPassButFails = [];
  var shouldPassButFails = [334, 342, 348, 349, 352, 353, 360, 368, 369, 371, 372, 378, 380, 381, 382, 387, 388, 392, 393, 394, 395, 396, 402, 403, 409, 416, 419, 420, 421, 422, 423, 424, 428, 431, 432, 433, 434, 435, 436, 443, 444, 445, 448, 449, 453, 454, 455, 457, 458];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Links', function() {
  var section = 'Links';

  // var shouldPassButFails = [];
  var shouldPassButFails = [474, 478, 483, 489, 490, 491, 495, 496, 497, 499, 503, 504, 507, 508, 509];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Images', function() {
  var section = 'Images';

  // var shouldPassButFails = [];
  var shouldPassButFails = [544, 545, 546, 547, 548, 556, 560];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Autolinks', function() {
  var section = 'Autolinks';

  // var shouldPassButFails = [];
  var shouldPassButFails = [582, 573, 579, 583];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Raw HTML', function() {
  var section = 'Raw HTML';

  // var shouldPassButFails = [];
  var shouldPassButFails = [597, 598];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Hard line breaks', function() {
  var section = 'Hard line breaks';

  // var shouldPassButFails = [];
  var shouldPassButFails = [];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Soft line breaks', function() {
  var section = 'Soft line breaks';

  // var shouldPassButFails = [];
  var shouldPassButFails = [];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});

describe('CommonMark 0.28 Textual content', function() {
  var section = 'Textual content';

  // var shouldPassButFails = [];
  var shouldPassButFails = [];

  var willNotBeAttemptedByCoreTeam = [];

  var ignore = shouldPassButFails.concat(willNotBeAttemptedByCoreTeam);

  cmSpec.forEach(function(spec) {
    messenger.test(spec, section, ignore);
  });
});
