var mongoose = require('mongoose');

var showtimeSchema = mongoose.Schema({
 
 showtime: String

 });

var Showtime = mongoose.model('Showtime', showtimeSchema, 'showtime');

module.exports = Showtime;