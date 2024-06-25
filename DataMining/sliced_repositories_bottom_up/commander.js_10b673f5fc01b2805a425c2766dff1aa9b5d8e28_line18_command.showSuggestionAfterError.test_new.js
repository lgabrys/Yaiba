const { Command } = require('../');
function getSuggestion(program, arg) {
  let message = '';
    .configureOutput({
      writeErr: (str) => { message = str; }
    });
  try {
    program.parse([arg], { from: 'user' });
  } catch (err) {
  }
  const match = message.match(/Did you mean (one of )?(.*)\?/);
}
