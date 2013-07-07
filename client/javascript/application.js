var app = {

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

    // Application events handling storage
    events: _.clone(Backbone.Events),

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

            self.events.trigger('application:init-complete');

            delete self.storage;
            delete self.init;
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

                delete self.loadSettingsApp;
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

                delete self.loadSettingsApi;
            }
        });

        return deferred.promise();
	},

	initRouter: function() {
        this.router = new app.storage.router;

        delete this.initRouter;
	},

	initModels: function() {
        var self = this;

        $.each(this.storage.models, function(id, Model) {
            var collectionScope = new Backbone.Model;

            collectionScope.set('id', id);
            collectionScope.set('scope', new Model);

            self.models.add(collectionScope);
        });

        delete this.initModels;
	},

	initViews: function() {
        var self = this;

        $.each(this.storage.views, function(id, View) {
            var collectionScope = new Backbone.Model;

            collectionScope.set('id', id);
            collectionScope.set('scope', new View);

            self.views.add(collectionScope);
        });

        delete this.initViews;
	},

	initCollections: function() {
        var self = this;

        $.each(this.storage.views, function(id, Collection) {
            var collectionScope = new Backbone.Model;

            collectionScope.set('id', id);
            collectionScope.set('scope', new Collection);

            self.collections.add(collectionScope);
        });

        delete this.initCollections;
	}
};

$(document).ready(function() {
	app.init();
});