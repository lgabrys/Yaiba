import platform from 'common/utils/platform';
remote.getCurrentWebContents().on('context-menu', function (event, params) {
  params.isWindows7 = platform.isWindows7;
});
