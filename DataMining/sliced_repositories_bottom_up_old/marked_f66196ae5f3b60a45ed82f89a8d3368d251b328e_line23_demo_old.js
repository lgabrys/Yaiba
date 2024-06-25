var $inputElem = document.querySelector('#input');
var $permalinkElem = document.querySelector('#permalink');
var $clearElem = document.querySelector('#clear');
var $htmlElem = document.querySelector('#html');
var $lexerElem = document.querySelector('#lexer');
var $panes = document.querySelectorAll('.pane');
var inputDirty = true;
var search = searchToObject();
if (search.text) {
  $inputElem.value = search.text;
} else {
