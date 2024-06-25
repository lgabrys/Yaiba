function getBadgePath (status, opts) {
  opts = opts || {}
  var extension = opts.extension == "png" ? "png" : "svg"
  var style = extension == "svg" && (style == "flat-square") ? "-" + style : ""
}
