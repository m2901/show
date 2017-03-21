
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST


//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))


var Booking = require('./models/bookingModels');

//Movie
router.get('/getBooking', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Booking.find({}, function (err, docs) {
         res.json(docs);
         
    }).sort({"_id":-1});
});




router.get('/getBooking/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Booking.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/addBooking', function(req, res){
	console.log("addbokk");
 
  var bookingid = req.body.bookingid;
  var bookingtime = req.body.showtime;
  var price = req.body.totalPrice;
  var quantity = req.body.quantity;
  var seats = req.body.totalSeats;
  var bookingdate = req.body.sdt;
  var name = req.body.name;
  var create_date=req.body.cdt;
  var city=req.body.city;
  var theatre=req.body.title;
  var bookedMovie=req.body.bookedMovie;
  var moviPoster=req.body.moviPoster;
  var seat_no=req.body.seat_no;
   var asmid=req.body.asmid;

  var booking = new Booking({
   
	bookingid: bookingid,
	price: price,
	quantity: quantity,
	seats: seats,
	bookingdate: bookingdate,
	bookingtime: bookingtime,
	name: name,
	city: city,
	bookedMovie: bookedMovie,
	theatre: theatre,
	moviPoster: moviPoster,
    create_date:create_date,
    seat_no:seat_no,
    asmid:asmid
   
  });


  booking.save(function(err, docs){
    if ( err ) throw err;
    console.log("Booking Saved Successfully");
    res.json(docs);
  });


  })

router.delete('/deleteBooking/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Booking.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateBooking/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Booking.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      console.log(data);
      res.json(data);
    });
})


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;



