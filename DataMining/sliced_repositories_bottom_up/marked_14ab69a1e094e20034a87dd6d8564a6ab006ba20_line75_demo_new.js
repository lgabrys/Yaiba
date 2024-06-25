var $markdownElem = document.querySelector('#markdown');
var $optionsElem = document.querySelector('#options');
var $outputTypeElem = document.querySelector('#outputType');
var $inputTypeElem = document.querySelector('#inputType');
var $clearElem = document.querySelector('#clear');
var inputDirty = true;
var search = searchToObject();
$previewIframe.addEventListener('load', function () {
  inputDirty = true;
});
if ('text' in search) {
  $markdownElem.value = search.text;
} else {
    .then(function (text) {
      if ($markdownElem.value === '') {
        $markdownElem.value = text;
        inputDirty = true;
      }
    });
}
if ('options' in search) {
  $optionsElem.value = search.options;
}
if (search.outputType) {
  $outputTypeElem.value = search.outputType;
}
  .then(function (text) {
    document.querySelector('#quickref').value = text;
  });
function handleInputChange() {
}
function handleOutputChange() {
}
function handleChange(panes, visiblePane) {
  var active = null;
  for (var i = 0; i < panes.length; i++) {
    if (panes[i].id === visiblePane) {
      panes[i].style.display = '';
    }
  }
};
