// src/modules/user.js
// Module reference argument, assigned at the bottom
(function(User) {

	// ??? does this break soc
	// var app = chat.app;
	// Define a user
	// this.set({ messages: new Message.List() });
	User.Model = Backbone.Model.extend({
		urlRoot: '/users',
		idAttribute: "_id",
		initialize: function() {},
		defaults: {
			name: 'Default Tommy',
			day: 0,
			phase: 'black'			
		}
	});

	// Define a user list
	User.List = Backbone.Collection.extend({
		url: '/users',
		model: User.Model 
	});
	User.Quickview = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this, "render");
			this.model.bind("change", this.render)
		},
		render: function() {
			var template = _.template( $('#user_template').html(), this.model.attributes);
			this.$el.html( template );
			return this;
		},
		events: {
			'click button[data-role="increase-day"]': 'increaseDay'
		},
		increaseDay: function() {
			console.log(this.model.fetch());
		}
	});
	User.Listview = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this, "render");
			this.collection.bind("all", this.render);
		},
		render: function() {
			this.$el.empty();
			var els = []
			  , module = ccd.module('user');
			this.collection.each(function(item) {
				var view = new module.Quickview({model: item});
				els.push(view.render().el);
			});
			this.$el.append(els);
			return this;
		}
	});

})(ccd.module("user"));
