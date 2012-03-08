var ccd = {
	// Create this closure to contain the cached modules
	module: function() {
		// Internal module cache.
		var modules = {};

		// Create a new module reference scaffold or load an
		// existing module.
		return function(name) {
			// If this module has already been created, return it.
			if (modules[name]) {
				return modules[name];
			}

			// Create a module and save it under this name
			return modules[name] = { Views: {} };
		};
	}()
};

// Using the jQuery ready event is excellent for ensuring all 
// code has been downloaded and evaluated and is ready to be 
// initialized. Treat this as your single entry point into the 
// application.
jQuery(function($) {
	// Initialize your application here.
	 um = ccd.module('user');
//	 user = new um.Model({id: '4f57aa8fbab3955f0a000004'});
//	 view = new um.Quickview({ 'el': $('#main'), 'model': user });
//	 user.fetch();
	 
	 ulist = new um.List();
	 listview = new um.Listview({ 'el': $('#main'), collection: ulist });
	 ulist.fetch();
	
});
