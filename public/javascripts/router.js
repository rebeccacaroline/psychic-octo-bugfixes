define(["backbone", "events", "collections/book", "views/bookcollection", "views/detailedbook", "views/newbook"], function(Backbone, Events, BookCollection, BookCollectionView, NewBookView){
  var Router = Backbone.Router.extend({
    initialize: function(){
      var self = this;
      this._setupCollection();
      Events.on("router:navigate", function(url){
        self.navigate(url, {trigger:true});
      });
    },
    routes: {
      "": "index",
      "book/new" : "newBook",
      "book/:id": "singleBook",
      "book/edit/:id": "updateBook",
      "book/delete/:id": "deleteBook"
    },
    _setupCollection: function(){
      if(this.collection) return;
      var data = $('#initialContent').html();
      this.collection = new BookCollection(JSON.parse(data));
    },
    _renderView: function(view){
      $('.app').html(view.render().el);
    },
    index: function(){
      var view = new BookCollectionView({collection: this.collection});
      this._renderView(view);
    },
    singleBook: function(id){
      var book = this.collection.get(id);
      var view = new DetailedBookView({model: book});
      this._renderView(view);
    },
    updateBook: function(id){
      var book = this.collection.get(id);
      book.set({read: true});
      book.save();
      Backbone.history.navigate("/", {trigger: true});
    },
    deleteBook: function(id){
      var book = this.collection.get(id);
      book.destroy({
        success: function(){
          console.log("destroyed");
          Backbone.history.navigate("/", {trigger: true});
        },
        error: function(){
          console.log("there was an error");
        }
      });
    },
    newBook: function() {
      var view = new NewBookView();
      this._renderView(view);
    }
  });

  return Router;
});