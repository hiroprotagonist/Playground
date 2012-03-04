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
					.append($('<div data-role="name">').addClass('name').text(user.name))
					.append($('<div data-role="day">').addClass('day').text(user.day))
					.append($('<button data-role="increase-day">+</button>'));
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
App.prototype.update = function(id, pdata, successCallback) {
	$.ajax({
		url: '/users/' + id,
		type: 'POST',
		dataType: 'json',
		data: pdata,
		error: function() {console.log('Update failed! Ooops.');},
		success: successCallback
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
