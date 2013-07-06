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
	storage: { views: {}, models: {}, collections: {} },

	// Init application:
	init: function() {
		var self = this;

		$.when(
			self.loadSettingsApp(),
			self.loadSettingsApi()
		).done(function() {
			self.initRouter();
            self.initModels();
            self.initViews();
            self.initCollections();

            delete self.storage;
		});
	},

    loadSettingsApp: function() {
		var self = this,
			deferred = new $.Deferred;

        $.ajax({
            url: '/settings/app.json',
            type: 'get',
            dataType: 'json',

            success: function(response) {
                self.settings.app.set(response);
                deferred.resolve();
            }
        });

        return deferred.promise();
	},

    loadSettingsApi: function() {
        var self = this,
            deferred = new $.Deferred;

        $.ajax({
            url: '/settings/api.json',
            type: 'get',
            dataType: 'json',

            success: function(response) {
                self.settings.api.set(response);
                deferred.resolve();
            }
        });

        return deferred.promise();
	},

	initRouter: function() {
        this.router = new core.storage.router;
	},

	initModels: function() {
        var self = this;

        $.each(this.storage.models, function(key, model) {
            var collectionScope = new Backbone.Model;

            collectionScope.set('id', key);
            collectionScope.set('scopre', model);

            self.models.add(collectionScope);
        });
	},

	initViews: function() {
        console.log('init views');
	},

	initCollections: function() {
        console.log('init collections');
	}
};

$(document).ready(function() {
	core.init();
});