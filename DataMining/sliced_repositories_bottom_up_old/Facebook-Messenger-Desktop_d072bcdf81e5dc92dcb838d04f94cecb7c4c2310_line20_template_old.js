let template = [
];
template = (function parseTemplate(menu, parent) {
  return menu.filter(item => {
    // Filter by platform
    if (item.platform !== undefined && !item.platform) {
      return false;
    }
    if (item.parse) {
      item.parse(item).bind(parent);
    }
  });
})(template, null);
