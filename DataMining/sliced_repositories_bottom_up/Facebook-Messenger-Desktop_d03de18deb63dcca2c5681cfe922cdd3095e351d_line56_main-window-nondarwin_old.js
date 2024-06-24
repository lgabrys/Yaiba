import $ from 'browser/menus/expressions';
export default {
  submenu: [{
  }, {
    click: $.all(
      $.hideTaskbarBadge($.key('checked'))
    ),
  }]
};
