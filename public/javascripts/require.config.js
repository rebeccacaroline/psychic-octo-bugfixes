require.config({
  baseUrl: "/javascripts",
  paths: {
    jquery: 'lib/jquery-1.11.3.min',
    backbone: 'lib/backbone-min',
    underscore: 'lib/underscore-min',
    handlebars: 'lib/handlebars.min'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    handlebars: {
      exports: 'Handlebars'
    }
  }
});

require(["init"]);