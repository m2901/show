var mongoose = require('mongoose');

var Moviechema = mongoose.Schema({
 
  moviTitle: { type: String, lowercase: true },
  moviLanguage: String,
  moviGenre: String,
  moviPoster: String,
  moviDirector: String,
  moviActors: String
 });
var Movie = mongoose.model('Movie', Moviechema, 'movie');

module.exports = Movie;