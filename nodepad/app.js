
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose')
  , models = require('./models')
  , everyauth = require('everyauth')
  , RedisStore = require('connect-redis')(express)
  , Document
  , db;

everyauth.everymodule.findUserById( function (userId, callback) {
	User.findById(userId, callback);
  	// callback has the signature, function (err, user) {...}
});

// Setup Auth
everyauth.password
	.getLoginPath('/login')
	.postLoginPath('/login')
	.loginView('login')
	.authenticate(function(login, password) {
		var errors = new Array;
		if (!login) errors.push('Missing login');
      	if (!password) errors.push('Missing password');
      	if (errors.length) return errors;
      	
      	var promise = this.Promise();
		User.findOne({'login': login}, function(err, user) {
			// For better readabiliy... BUT Very shitty 
			// if the following returns get lost
			if ( err || !user ) return promise.fulfill( ['User not found'] );
			if ( ! user.authenticate(password) ) return promise.fulfill( ['Invalid password'] );
			
			console.dir(user);
			promise.fulfill( user );
		});
		return promise;
	})
	.loginSuccessRedirect('/you')
	.getRegisterPath('/register')
	.postRegisterPath('/register')
	.registerView('register.jade')
	.validateRegistration( function(newUserAttr) {
		console.log('validate');
		console.dir(newUserAttr);
		var err = new Array;
		if ( !newUserAttr.login || newUserAttr.login.trim().length < 3 ) {
			err.push('Login must be 3 characters long at least');
		}
		if ( !newUserAttr.password || newUserAttr.password.trim().length < 3 ) {
			err.push('Password must be 3 characters long at least');
		}
		return err;
	} )
	.registerUser(function(newUserAttr) {
		var user = new User(newUserAttr);
		var promise = this.Promise();
		user.save(function(err) {
			if ( err ) {
				console.log( 'Fail ' + err );
				promise.fulfill([err]);
			} else {
				console.log( 'Butterweich' );
				promise.fulfill(user);
			}
		});
		return promise;
	})
	.registerSuccessRedirect('/');

var app = module.exports = express.createServer(  );
everyauth.helpExpress(app);
// Configuration
// This is like an Interceptor Stack in Struts2
// Node People call it middleware
// The middlewares/Interceptors will run as orderd
app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', {layout: true});
	
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({secret: "0sk38dfn2390", store: new RedisStore }));
	
	app.use(everyauth.middleware());

	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
	app.set('db-uri', 'mongodb://localhost/nodepad-development');
	app.set('view options', {
		pretty: true
	});
	everyauth.debug = true;
});

models.defineModels(mongoose, function() {
	app.Document = Document = mongoose.model('Document');
	app.User = User = mongoose.model('User');
	db = mongoose.connect(app.set('db-uri'));
})

/*
app.configure('production', function(){
  app.use(express.errorHandler());
});
*/

// Routes
function loadUser(req, res, next) {
	if ( req.session.auth && req.session.auth.loggedIn ) {
		next();
	} else {
		res.redirect('/login');
	}
}
app.get('/', loadUser, routes.index);
app.get('/you', loadUser, routes.you);
app.get('/documents', loadUser, routes.index);

if ( !module.parent ) {
	app.listen(3000);
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}