define(["backbone"], function(Backbone){
  return Backbone.Model.extend({
    idAttribute: "_id",
    validate: function(attrs){
      if(!attrs.name){
        return 'The book has to have a title!';
      }
      if(!attrs.author){
        return 'The book has to have an author!';
      }
    }
  });
});