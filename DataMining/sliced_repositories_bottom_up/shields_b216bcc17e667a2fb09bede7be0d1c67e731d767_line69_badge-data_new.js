function makeLabel(defaultLabel, overrides) {
  return '' + (overrides.label === undefined ? defaultLabel || '' : overrides.label);
}
