var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
 
 bookingid: String,
 price: String,
 quantity: String,
 seats: String,
 bookingdate:String,
 bookingtime: String,
 name:String,
 city:String,
 theatre:String,
 bookedMovie:String,
 moviPoster:String,
 create_date:String,
 seat_no:String,
 asmid:String

 
 });

var Booking = mongoose.model('Booking', bookingSchema, 'booking');

module.exports = Booking;