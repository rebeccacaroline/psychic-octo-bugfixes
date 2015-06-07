var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Book = require('../app/models/book');

router.use(function (req, res, next){
  console.log("Something is happening!");
  next();
});

router.get('/', function(req, res){
  Book.find(function(err, books){
    var data = JSON.stringify(books);
    res.render("index", {
      appData: data
    });
  });
  // res.json({message: "this works!"});
});

router.route('/books')
  .post(function(req, res){
    var book = new Book({
      name: req.body.name,
      author: req.body.author
    })
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

  module.exports = router;