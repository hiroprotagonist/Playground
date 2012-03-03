// Setup MongoDB
var Db = require('mongojs')
  , DbURL = 'teamccd';

Users = function() {
	this.collections = ['users'];
	this.db = Db.connect(DbURL, this.collections);
	this.err = 1;
	};

Users.prototype.list = function(callback) {
	this.db.users.find(function(err, users) {
		if ( err || !users) callback(this.err);
		else callback(null, users);
		});
	};
Users.prototype.findUser = function(pname, callback) {
	this.db.users.findOne({name: pname},function(err, user) {
		if( err || !user ) callback(this.err);
		else callback(null, user);
	});
};
Users.prototype.add = function(user, callback) {	
	this.db.users.save(user, function(err, saved) {
		if( err || !saved ) callback(this.err);
		else callback(null, saved);
	});
};
Users.prototype.remove = function(pname, callback) {
	this.db.users.remove({name: pname}, function(err, deleted) {
		if( err || !deleted ) callback(this.err);
		else callback(null, deleted);
	});
};
