  , logging = require('./logging')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('./models').User

var setupPasswordAuth = function(app){
  passport.use(new LocalStrategy(
    {usernameField: 'email'},
    function(username, password, done){
      console.log("username: %s", username);
      User.authenticate(username, password, function (err, user) {
        if (err || !user) {
          console.log("no user");
          return done(null, false, { message: 'Incorrect username.' });
        }
      })
    }))
}
var registerRoutes = function(app){
  app.get('/register', function(req, res, next){
  })
  app.post('/register', function(req, res, next){

    var errors = []
    if (!req.body.email) errors.push("Missing email")
    if (errors.length){
      return res.render('register.html', {errors: errors});
    }
    User.registerWithInvite(
      , function(err, user){
        if (err){
          return res.render('register.html', {
            , email: req.body.email
            , password: req.body.password
          });
        }
      });
  });
  app.get('/login', function(req, res, next){
    return res.render('login.html', {});
  })
}
var setup = function(app){
  app.registerAuthStrategy = function(strategy){
  }
  app.authenticate = function(){
    var res = passport.authenticate.apply(passport, arguments)
    console.log("!!!", res)
  }

  passport.serializeUser(function(user, done) {
  });
  passport.deserializeUser(function(id, done) {
  });
  app.use(function(req, res, next){
    res.locals.currentUser = req.user || null;
  })
}

var _authenticate = passport.authenticate('local', {
  successRedirect: '/',
})
var logout = function(req, res, next){
}
var requireUser = function require_auth(req, res, next) {
  } else {
    req.session.return_to = req.url
  }
};
var requireUserOr401 = function (req, res, next){
  } else {
    res.statusCode = 401;
  }
};
var requireAdminOr401 = function require_admin(req, res, next){
        req.user.account_level < 1){
      res.statusCode = 401;
  } else {
  }
};
var requireProjectAdmin = function(req, res, next) {
  if (!req.project) return res.send(404, 'Project not loaded')
  if (!res.accessLevel || res.accessLevel < 2) res.send(401, 'Not authorized for configuring this project')
}
