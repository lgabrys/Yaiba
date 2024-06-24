var Backchannel = require('./backchannel')
  , common = require('./common')
  , express = require('express')
  , everypaas = require('everypaas')
  , middleware = require('./middleware')
  , mongoose = require('mongoose')
  , mongoStore = require('connect-mongo')(express)
  , routes = require('../routes')
  , websockets = require('./websockets')
  , routes_jobs = require('../routes/jobs/index.js')
  , api = require('../routes/api')

  , swig = require('swig')
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
          dbconn: config.db_uri
      })
    } else {
  });
};
