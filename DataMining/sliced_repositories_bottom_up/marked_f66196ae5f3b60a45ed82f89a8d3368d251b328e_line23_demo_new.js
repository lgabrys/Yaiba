var $inputElem = document.querySelector('#input');
var search = searchToObject();
if ('text' in search) {
  $inputElem.value = search.text;
} else {
