function badgePath (depsType, status, retina, style, extension) {
  depsType = depsType ? depsType + "-" : ""
  retina = retina ? "@2x" : ""
  extension = extension == "png" ? "png" : "svg"
  style = extension == "svg" && (style == "flat" || style == "flat-square") ? "-" + style : ""
}
