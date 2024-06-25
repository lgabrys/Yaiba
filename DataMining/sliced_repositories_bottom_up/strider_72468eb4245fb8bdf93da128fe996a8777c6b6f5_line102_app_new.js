var Backchannel = require('./backchannel')
  , common = require('./common')
  , express = require('express')
  , EventEmitter = require('events').EventEmitter
  , everypaas = require('everypaas')
  , logging = require('./logging')
  , middleware = require('./middleware')
  , mongoose = require('mongoose')
  , mongoStore = require('connect-mongo')(express)
  , routes = require('../routes')
  , websockets = require('./websockets')
  , models = require('./models')

  , routes_admin = require('../routes/admin/index.js')
  , routes_jobs = require('../routes/jobs/index.js')
  , api = require('../routes/api')
  , api_account = require('../routes/api/account.js')
  , api_admin = require('../routes/api/admin/index.js')
  , api_collaborators = require('../routes/api/collaborators')
  , api_jobs = require('../routes/api/jobs.js')
  , api_repo = require('../routes/api/repo.js')

  , auth = require('./auth')

  , path = require('path')
  , swig = require('swig')
  , pluginTemplates = require('./pluginTemplates')

var MONTH_IN_MILLISECONDS = 2629743000;
var session_store;
var init = exports.init = function (config) {

  var mongodbUrl = config.db_uri;
  console.log("Using MongoDB URL: %s", mongodbUrl);
  mongoose.connect(mongodbUrl, function(e){
    if (e) {
      console.error("Could not connect to DB: %s", e);
      process.exit(1);
    }
  });
  session_store = new mongoStore({db: mongoose.connection.db})

  swig.init({
      allowErrors: true // allows errors to be thrown and caught by express instead of suppressed by Swig
  });
  var app = express();
  app.configure('development', function () {
    // awesome view testingness
  })
  app.configure(function(){

    app.use(require('stylus').middleware({ src: __dirname + '/../public' }));


    if (config.smtp) {
      var forgot = require('express-forgot-password')({
          db: mongoose
      })
    } else {
  });
};
