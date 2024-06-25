function isJSON(mime) {
  return /[/+]json($|[^-\w])/i.test(mime);
