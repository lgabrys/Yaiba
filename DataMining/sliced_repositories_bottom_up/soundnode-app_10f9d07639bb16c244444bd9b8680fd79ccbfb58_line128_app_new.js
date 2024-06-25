var app = angular.module('App', [
]);
app.run(function (
) {
  document.addEventListener('click', function (e) {
    if (e.metaKey || e.ctrlKey || e.which === 2) {
    }
  }, false);
});
