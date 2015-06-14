define(["backbone", "router"], function(Backbone, Router){
  var App = {};
  App.start = function(){
    new Router();
    Backbone.History.start();
  }
  return App;
});