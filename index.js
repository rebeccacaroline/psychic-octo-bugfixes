var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library');

var Book = require('./app/models/book');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();

router.use(function (req, res, next){
  console.log("Something is happening!");
  next();
});

router.get('/', function(req, res){
  res.json({message: "this works!"});
});

router.route('/books')
  .post(function(req, res){
    var book = new Book({
      name: req.body.name,
      author: req.body.author
    });
    book.save(function(err){
      if(err)
        res.send(err);
      res.json({message: 'Book created!'});
    })
  })
  .get(function(req, res){
    Book.find(function(err, books){
      if (err)
        res.send(err);
      res.json(books);
    });
  });

router.route('/books/:book_id')
  .get(function(req, res){
    Book.findById(req.params.book_id, function(err, book){
      if (err)
        res.send(err);
      res.json(book);
    });
  })
  .put(function(req, res){
    Book.findById(req.params.book_id, function(err, book){
      if (err)
        res.send(err);
      book.read = true;
      book.dateRead = Date.now();
      book.save(function(err){
        if (err)
          res.send(err);
        res.json({message: 'Book read!'});
      });
    });
  })
  .delete(function(req, res){
    Book.remove({
      _id: req.params.book_id
    }, function(err, book){
      if (err)
        res.send(err);
      res.json({message: 'Successfully deleted!'});
    });
  });

app.use('/api', router);

app.listen(port);
console.log("Magic happens on port "+port);