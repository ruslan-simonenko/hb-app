var core = {

	// List of predefined scope variables:
	settings: { 
		app: new Backbone.Model, 
		api: new Backbone.Model 
	}, 

	// Application view storage
	views: new Backbone.Collection, 

	// Application models storage 
	models: new Backbone.Collection, 

	// Application collections storage
	collections: new Backbone.Collection, 

	// Application templates storage
	templates: new Backbone.Collection,

	// Temporary storage scope variables:
	storage: { views: {}, models: {}, collections: {}, router: {} }, 

	// Init application:
	init: function() {
		var self = this;

		$.when(
			self.loadSettingsApp(),
			self.loadSettingsApi()
		).done(function() {
			console.log('settings loaded');
		});
	},

    loadSettingsApp: function() {
		var self = this,
			deferred = new $.Deferred;
			
        return deferred.promise();
	},

    loadSettingsApi: function() {
        var self = this,
            deferred = new $.Deferred;

        return deferred.promise();
	},

	initRouter: function() {

	},

	initModels: function() {

	},

	initView: function() {

	},

	initCollections: function() {

	}
};

$(document).ready(function() {
	core.init();
});