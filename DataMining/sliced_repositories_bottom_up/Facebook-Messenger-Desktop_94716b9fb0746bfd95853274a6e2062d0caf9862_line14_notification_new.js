import platform from 'common/utils/platform';
const nativeNotifier = remote.require('common/bridges/native-notifier').default;
window.Notification = (function (Html5Notification) {
  const Notification = function (title, options) {
    if (!nativeNotifier.isImplemented || !platform.isDarwin && !platform.isWindows7) {
    }
  };
})(window.Notification);
