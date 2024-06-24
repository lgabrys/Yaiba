const isSimpleWindowsTerm = process.platform === 'win32' && !process.env.TERM.toLowerCase().startsWith('xterm');
