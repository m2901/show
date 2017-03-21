var mongoose = require('mongoose');

var theatreSchema = mongoose.Schema({
 
 title: String,
 city: String,
 no_of_seat: String,
 amount: String

 
 });

var Theatre = mongoose.model('Theatre', theatreSchema, 'theatre');

module.exports = Theatre;