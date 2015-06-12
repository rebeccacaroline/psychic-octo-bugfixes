'use strict';


var Book = Backbone.Model.extend({
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

var BookCollection = Backbone.Collection.extend({
  model: Book,
  url: "/books"
});

var BookView = Backbone.View.extend({
  initialize: function(){
    this.collection = new BookCollection();
    // this.listenTo(this.model, 'create', this.render);
    this.collection.on(this.model, 'sync', this.render);
  //   this.listenTo(this.model, 'sync', this.render);
  //   this.collection.fetch();
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
    router.navigate("/book/"+id, {trigger: true});
  },
  deleteBookLink: function(event){
    event.preventDefault();
    var id = this.model.get("_id");
    router.navigate("/book/delete/"+id, {trigger: true});
  },
  updateBookLink: function(event){
    event.preventDefault();
    var id = this.model.get("_id");
    router.navigate("/book/edit/"+id, {trigger: true})
  }
});

var DetailedBookView = Backbone.View.extend({
  render: function(){
    var template = $('#detailedbooktemplate').html();
    var compiled = Handlebars.compile(template);
    var html = compiled(this.model.attributes);
    this.$el.html(html);
    return this;
  }
});

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
    router.navigate("/", {trigger: true});
  }
});


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
    router.navigate('/book/new', {trigger: true});
  }
});

var BookCollectionView = Backbone.View.extend({
  initialize: function(){
    this.addNewBookButtonView = new AddNewBookButtonView();
    this.listenTo(this.collection, 'add', this.renderBook);
    this.collection.fetch();
  },
  tagname: 'ul',
  className: 'books',
  render: function(){
    this.$el.html("");
    this.$el.append(this.addNewBookButtonView.render().el);
    this.collection.each(function(book){
      var bookView = new BookView({model: book});
      this.$el.append(bookView.render().el);
    }, this);
    return this;
  },
  renderBook: function(book){
    var bookview = new BookView({
      model: book
    });
    this.$el.append(bookview.render().el)
  }
});

var AppRouter = Backbone.Router.extend({
  initialize: function(){
    this._setupCollection();
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