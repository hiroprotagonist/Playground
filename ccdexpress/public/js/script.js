/* Author:Stefan */

App = function() {
};
App.prototype.listAll = function() {
	var errorBack = function(xhr, text, error) {
		console.log('Error while listing');
	};
	var render = function(users) {
		// wipe out here ?
		$('.plate').remove();
		$.each(users, function(index, user) {
			var colorType = user.phase === 'black' ? 'dark' : 'light';
			var plate = 
				$('<div>').addClass('plate')
					.addClass(colorType)
					.css('background', user.phase)
					.append($('<div>').addClass('name').text(user.name))
					.append($('<div>').addClass('day').text(user.day));
			$('[role="main"]').append(plate);
		});
	};
	$.ajax({
		url: '/users',
		type: 'GET',
		dataType: 'json',
		error: errorBack,
		success: render
	});
};
App.prototype.join = function(name) {
	if ( !name || typeof name != 'string' || name.trim() == '' ) {
		alert('Who are You?');
		return;
	}
	var self = this;
	var user = {
		'name': name,
		'phase': 'black',
		'day': 0
	};
	$.ajax({
		url: '/users',
		type: 'PUT',
		dataType: 'json',
		data: user,
		error: function() { alert('Oops!'); },
		success: self.listAll
	});
}; 
