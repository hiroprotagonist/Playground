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
		initialize: function() {}
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
			var template = _.template( $(template.you), {'data': this.model.attributes});
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
	
	User.Joinform = Backbone.View.extend({
		events: {
			'click #join_form_join':	'submit_join',
			'click #join_form_cancel':	'cancel_join'
		},
		render: function() {
			var dialog = this.template({data:{}});
			this. myel = $(dialog).dialog({
				autoOpen: false,
				height:480,
				width: 640,
				title: 'Join CCD',
				modal: true
			});
			
			this.delegateEvents(this.events);
			return this;
		},
		initialize: function() {
			_.bindAll(this, 'render');
			this.template = _.template($("#join_form_container").html());
			this.render().el;
		},
		show: function() {
			$(this.myel).dialog( 'open' );
		},
		close: function() {
			$(this.myel).dialog( 'close' );
		},
		submit_join: function() {
			var data = {
				name: $('#join_form_name').val(),
				phase: 'black',
				day: 0
			}
			this.collection.create( data ); 
		},
		cancel_join: function() { console.log('cancel');}
	});


})(ccd.module("user"));
