import platform from 'common/utils/platform';
import $ from 'browser/menus/expressions';
export default {
  submenu: [{
  }, {
    click: $.all(
      platform.isLinux ? $.hideDockBadge($.key('checked')) : $.hideTaskbarBadge($.key('checked'))
    ),
  }]
};
