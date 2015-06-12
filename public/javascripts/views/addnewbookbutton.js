define(["backbone", "events", "jquery"], function(Backbone, Events, $){
  var AddNewBookButtonView = Backbone.View.extend({
    events: {
      "click .addBook" : "addBook"
    },
    render: function(){
      this.$el.append('<button class="addBook">Add New Book!</button>');
      return this;
    },
    addBook: function(event){
      event.preventDefault();
      var url =  'book/new';
      Event.trigger("router:navigate", url);
    }
  });

  return AddNewBookButtonView;
});

