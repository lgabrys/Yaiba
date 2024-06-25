function buildInspectorUrl(inspectorHost, inspectorPort, debugPort, fileToShow, isHttps) {
  var host = inspectorHost == '0.0.0.0' ? '127.0.0.1' : inspectorHost;
  var parts = {
    protocol: isHttps ? 'https' : 'http',
    hostname: host,
    port: inspectorPort,
    pathname: '/',
    search: '?ws=' + host + ':' + inspectorPort + '&port=' + debugPort
  };
}
