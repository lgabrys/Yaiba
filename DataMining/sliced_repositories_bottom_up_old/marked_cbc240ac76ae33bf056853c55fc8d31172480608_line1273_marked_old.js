;(function(root) {
function Parser(options) {
}
Parser.parse = function(src, options) {
};
Parser.prototype.parse = function(src) {
};
Parser.prototype.next = function() {
};
Parser.prototype.peek = function() {
};
Parser.prototype.parseText = function() {
};
Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'table': {
          body = '',
          i,
          row,
          cell,
          j;
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        cell += this.renderer.tablecell(
        );
      }
      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];
        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
          );
        }
        body += this.renderer.tablerow(cell);
      }
    }
    case 'blockquote_start': {
      body = '';
      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }
    }
    case 'list_start': {
      body = '';
      while (this.next().type !== 'list_end') {
        body += this.tok();
      }
    }
    case 'list_item_start': {
      body = '';
      var loose = this.token.loose;
      var checked = this.token.checked;
      var task = this.token.task;
      if (this.token.task) {
        body += this.renderer.checkbox(checked);
      }
      while (this.next().type !== 'list_item_end') {
        body += !loose && this.token.type === 'text'
      }
      return this.renderer.listitem(body, task, checked, loose);
    }
  }
};
