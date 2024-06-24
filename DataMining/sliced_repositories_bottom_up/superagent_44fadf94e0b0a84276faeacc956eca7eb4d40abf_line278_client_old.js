function isJSON(mime) {
  return /[/+]json($|[^-\w])/.test(mime);
