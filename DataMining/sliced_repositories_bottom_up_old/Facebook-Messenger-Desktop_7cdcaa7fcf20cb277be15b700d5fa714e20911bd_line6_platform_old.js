export default {
  isDarwin: process.platform === 'darwin',
  isNonDarwin: process.platform !== 'darwin',
  isWindows: process.platform === 'win32',
  isLinux: process.platform === 'linux',
  isWindows7: process.platform === 'win32' && window.navigator &&
};
