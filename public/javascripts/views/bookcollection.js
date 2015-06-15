define(["backbone", "views/book", 'views/addnewbookbutton', 'views/readbook'], function(Backbone, BookView, AddNewBookButtonView, ReadBookView){
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
        console.log(book.attributes.read);
        if (book.attributes.read === false){
          var bookView = new BookView({model: book});
        } else {
          var bookView = new ReadBookView({model:book});
        }
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

  return BookCollectionView;
});