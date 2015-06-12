define(["backbone", "handlebars", "events", "jquery"], function(Backbone, Handlebars, Events, $){
  var NewBookView = Backbone.View.extend({
    initialize: function(){
      this.collection = new BookCollection();
    },
    events: {
      'click #newbookbutton' : 'CreateBookLink'
    },
    render: function(){
      var template = $('#newbooktemplate').html();
      var compiled = Handlebars.compile(template);
      var html = compiled(this.model);
      this.$el.html(html);
      return this;
    },
    CreateBookLink: function(event){
      event.preventDefault();
      var book = {
        name: $('form input[name="name"]').val(),
        author: $('form input[name="author"]').val()
      };
      this.collection.create(book, {validate: true});
      var url = "";
      Events.trigger("router:navigate", url);
    }
  });

  return NewBookView;
});