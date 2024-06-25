var resize = this;
var bs, elements;
var resizeElement;
var sideBarWidth;
exports.init = function( core ) {
  bs = core.bs;
  elements = core.elements;
  sideBarWidth = core.config.sidebarWidth;
  resizeElement = window.document.createElement("div");
  resizeElement.className = "resize-element";
  resize.render();
  window.addEventListener("resize", function(e){
  });
  resizeElement.addEventListener("drag", function(e){
    resize.setWidthByConfig(e.clientX);
  });
  resizeElement.addEventListener("dragend", function(e){

  });
};

exports.render = function() {
  var sidebar_width, element_width, sidebar_offset, x;
  sidebar_width = window.getComputedStyle(elements.sidebar).width;
  element_width = window.getComputedStyle(resizeElement).width;
  x = parseInt(sidebar_width,10) - ( parseInt(element_width) );
};
