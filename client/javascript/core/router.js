app.storage.router = Backbone.Router.extend({

    initialize: function() {
        Backbone.history.start();
    },

    routes: {
    	'': 'landingPage'
    },

    landingPage: function() {
		console.log('display landing page');
    },

    displayPage: function(page, subPage, tab) {

	}
});