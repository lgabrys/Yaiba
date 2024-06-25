const packageJson = require('package-json');
const OFFICIAL_GENERATORS = [
];
function fetchGeneratorInfo(generator, cb) {
  packageJson(generator.name, {fullMetadata: true}).then(pkg => {
    const official = OFFICIAL_GENERATORS.includes(pkg.name);
  }).catch(cb);
}
