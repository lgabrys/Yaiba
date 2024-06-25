const path = require('path');
const fs = require('fs');
const sinon = require('sinon');
const defaults = require('./defaults');
const testHelpers = require('./make-badge-test-helpers');
function registerTests(fontPath, skip) {
  const displayName = path.basename(fontPath, path.extname(fontPath));
  describe(`QuickTextMeasurer with ${displayName}`, function () {
    let sandbox;
    if (! skip) {
      beforeEach(function () {
        sandbox = sinon.sandbox.create();
      });
    }
  });
};
