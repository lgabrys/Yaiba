Package.describe({
  summary: "Common code for OAuth-based services",
  internal: true
});

Package.on_use(function (api) {
  api.use('routepolicy', 'server');
  api.use('service-configuration', 'server');

  api.add_files('oauth_common.js', ['client', 'server']);
  api.add_files('oauth_client.js', 'client');
  api.add_files('oauth_server.js', 'server');
});
