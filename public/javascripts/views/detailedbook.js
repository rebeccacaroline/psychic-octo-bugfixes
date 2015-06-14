define(["backbone", "handlebars", "models/book"], function(Backbone, Handlebars, Book){
  var DetailedBookView = Backbone.View.extend({
    render: function(){
      var template = $('#detailedbooktemplate').html();
      var compiled = Handlebars.compile(template);
      var html = compiled(this.model.attributes);
      this.$el.html(html);
      return this;
    }
  });

  return DetailedBookView;
});