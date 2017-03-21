var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
 
 city: String

 });

var City = mongoose.model('City', citySchema, 'city');

module.exports = City;