var mongoose = require('mongoose');

var assignshowtimeSchema = mongoose.Schema({
 
 asntheatre: String,
 asntime: String,

 });

var Assignshowtime = mongoose.model('Assignshowtime', assignshowtimeSchema, 'assignshowtime');

module.exports = Assignshowtime;