
var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'), //parses information from POST


//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }))


var Assignmovie = require('./models/assignmovieModels');

//Movie
router.get('/getAssignmovi', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Assignmovie.find({}, function (err, docs) {
         res.json(docs);
         
    }).sort({"_id":-1});
});




router.get('/editAsnmovi/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Assignmovie.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);
         
    });
});

router.post('/addAsnmovi', function(req, res){
	
 console.log(req.body);
 
   var asnmovi = req.body.asnmovi;
   var asnmovitheatre = req.body.asnmovitheatre;
   var asnmovicity = req.body.asnmovicity;
   var fromdate = req.body.fromdate;
   var todate = req.body.todate;


  var assignmovie = new Assignmovie({
   
	asnmovi: asnmovi,
	asnmovitheatre: asnmovitheatre,
    asnmovicity: asnmovicity,
    fromdate: fromdate,
    todate: todate
   
  });


  assignmovie.save(function(err, docs){
    
    if ( err ) throw err;
    console.log("Assign Movie Saved Successfully");
    res.json(docs);
  });


  })

router.delete('/removeAsnmovi/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Assignmovie.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateAsnmovi/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Assignmovie.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
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



