require.config({
    
    paths:{
        "jquery": "/javascript/libraries/jquery/jquery",

        "underscore": "/javascript/libraries/backbone/underscore",
        "backbone": "/javascript/libraries/backbone/backbone",
        "marionette": "/javascript/libraries/backbone/backbone.marionette",

        "handlebars": "/javascript/libraries/handlebars/handlebars",
        "hbs": "/javascript/libraries/handlebars/hbs"
    },

    shim: {

        // Backbone
        "backbone":{
            // Depends on underscore/lodash and jQuery
            "deps": ["underscore", "jquery"],

            // Exports the global window.Backbone object
            "exports": "Backbone"
        },

        //Marionette
        "marionette":{
            "deps": ["underscore", "backbone", "jquery"],
            "exports": "Marionette"
        },

        //Handlebars
        "handlebars":{
            "exports": "Handlebars"
        }
    },

    hbs: {
        templateExtension: "html",
        helperDirectory: "/templates/helpers/",
        i18nDirectory: "/templates/i18n/",

        compileOptions: {}        // options object which is passed to Handlebars compiler
    }
});

define(['jquery', 'backbone', 'marionette', 'underscore', 'handlebars'],
    function ($, Backbone, Marionette, _, Handlebars) {
        console.log($, Backbone, Marionette, _, Handlebars);
    }
);