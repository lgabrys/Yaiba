function isDataUri(s) {
}

function svg2base64(svg) {
  if (typeof svg !== 'string') {
    return undefined
  }
  // Check if logo is already base64
  return isDataUri(svg)
    ? svg
    : `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}
