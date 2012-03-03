
exports.list = function(req, res) {
	console.log("lslsls");
	db.users.find(function(err, users) {
		if( err || !users) {
			res.send(404, {}, {msg: "Failed listing users"});
		} else {
			res.send(200, {}, users);
		}
	});
}
