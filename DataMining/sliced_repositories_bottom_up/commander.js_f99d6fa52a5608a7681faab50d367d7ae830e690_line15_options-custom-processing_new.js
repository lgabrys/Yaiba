const commander = require('../'); // include commander in git clone of commander repo
const program = new commander.Command();
function myParseInt(value, dummyPrevious) {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidArgumentError('Not a number.');
  }
}
