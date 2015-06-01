var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  name: String,
  author: String,
  read: {type: Boolean, default: false},
  dateRead: Date
});

module.exports = mongoose.model('Book', BookSchema);