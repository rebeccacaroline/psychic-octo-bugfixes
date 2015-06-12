define(["backbone", "handlebars", "jquery", "events"], function(Backbone, Handlebars, $, Events){
  var BookView = Backbone.View.extend({
    initialize: function(){
      this.collection = new BookCollection();
      this.collection.on(this.model, 'sync', this.render);
    },
    events: {
      "click .name" : "singleBookLink",
      "click .delete" : "deleteBookLink",
      "click .read" : "updateBookLink"
    },
    tagName: 'li',
    className: 'book',
    render: function(){
      var template = $('#booktemplate').html();
      var compiled = Handlebars.compile(template);
      var html = compiled(this.model.attributes);
      this.$el.html(html);
      return this;
    },
    singleBookLink: function(event){
      event.preventDefault();
      var id = this.model.get("_id");
      var url = "book/"+id;
      Events.trigger("router:navigate", url);
    },
    deleteBookLink: function(event){
      event.preventDefault();
      var id = this.model.get("_id");
      var url = "book/delete/"+id;
      Events.trigger("router:navigate", url);
    },
    updateBookLink: function(event){
      event.preventDefault();
      var id = this.model.get("_id");
      var url = "book/edit/"+id;
      Events.trigger("router:navigate", url);
    }
  });

  return BookView;
});