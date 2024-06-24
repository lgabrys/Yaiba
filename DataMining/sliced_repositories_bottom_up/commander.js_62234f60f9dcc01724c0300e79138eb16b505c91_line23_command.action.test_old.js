const commander = require('../');
test('when .action called then program.args only contains args', () => {
  const program = new commander.Command();
  expect(program.args).toEqual(['my-file']);
});
