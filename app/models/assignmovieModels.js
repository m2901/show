var mongoose = require('mongoose');

var assignmovieSchema = mongoose.Schema({
 
 asnmovi: String,
 asnmovitheatre: String,
 asnmovicity: String,
 fromdate: String,
 todate: String

 
 });

var Assignmovie = mongoose.model('Assignmovie', assignmovieSchema, 'assignmovie');

module.exports = Assignmovie;