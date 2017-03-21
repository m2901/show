
sampleApp.controller('ConfirmController', function($scope,$http, $rootScope, $location) {

var refresh=function(){
	
	    
$http.get('/booking/getBooking').success(function (response) {
			
            if($rootScope.sdate==undefined)
		 {
		
			 $scope.sdt=$rootScope.fromdate;
		 }
		 else{
			 $scope.sdt=$rootScope.sdate;
		 }
			
            var stimes1='';
			var stimes11='';
			var c='';
			
			var tsit='';
			var ts=0;
			
			for(let resp of response)
			{
				
				if(resp.bookingdate==$rootScope.sdate && resp.bookingtime==$rootScope.showtime && resp.bookedMovie==$rootScope.bookedMovie && resp.city==$rootScope.city && resp.theatre==$rootScope.title )
				{
			
				
				stimes1+=resp.seat_no;
				c=stimes11.concat(stimes1);
				
			
			}}
			$scope.avail=44-ts;
			console.log('ts'+$scope.avail);
			$scope.selectedSeats = c;
            console.log($scope.selectedSeats);
			countdiv.length=0;
			document.getElementById("st").innerHTML='';
			document.getElementById("totprice").innerHTML=$rootScope.totalPrice;
			$('div').removeClass('selecteds');
            
        });
};
refresh();

var countdiv=[];
var s_seat;
$(document).ready(function(){
  var countdiv=[];
  $('.floating-box').click(function(){
          var id=$(this).attr('id');
          countdiv.push(id);
          $rootScope.TotalSeat=JSON.stringify(countdiv);

          s_seat= document.getElementById("st").innerHTML=countdiv;
	
          console.log(s_seat);
           console.log(countdiv.length);
		  $rootScope.TotalSeatLength=countdiv.length;

		  var total=$rootScope.TotalSeatLength*$rootScope.totalPrice;
		  console.log(total);
         document.getElementById("totprice").innerHTML=total;
		 $(this).addClass('selecteds');

  });
  });

$scope.totalSeats=$rootScope.totalSeats; 
$scope.totalPrice=$rootScope.totalPrice; 
$scope.showtime=$rootScope.showtime; 
$scope.fromdate=$rootScope.fromdate; 
$scope.todate=$rootScope.todate;
$scope.title=$rootScope.title;
$scope.bookedMovie=$rootScope.bookedMovie;
$scope.moviPoster=$rootScope.moviPoster;
$scope.city=$rootScope.city; 
$scope.confirm="Confirm your Tickets of "+$scope.bookedMovie+" movie at "+$scope.title;

$scope.shows = true;
$scope.details = false;  

	var a = moment($scope.todate);
var b = moment($scope.fromdate);
var c=a.diff(b, 'days') // 1


             var rdts=[];
			
			 for(var i=0;i<=c;i++)
			 {
				 var temp={};
				 var rdt = moment($scope.fromdate).add('days', i);
                 rdt = rdt.format('MM/DD/YYYY');
				 temp.fdate=rdt;
				 rdts.push(temp);
			 }
			
			 $scope.fdts=rdts;


    
	
	$scope.getDate = function (fdts) {

      $rootScope.sdate=fdts.fdate;
	  refresh();
    };

	$scope.bookTicket = function () {
		 $scope.shows = false;
	     $scope.details = true;
		 
		
		 
		 if($rootScope.sdate==undefined)
		 {
		
			 $scope.sdt=$scope.fromdate;
		 }
		 else{
			 $scope.sdt=$rootScope.sdate;
		 }
		 
		  
		  var cdt = moment().format("MM/DD/YYYY, h:mm:ss a");

          $scope.cdt=cdt;
		 
		 var bookingid=Math.floor((Math.random() * 1000000) + 1);
		 $scope.bookingid=bookingid;
		 
		 $scope.seat_no=$rootScope.TotalSeat;
		 $scope.length=$rootScope.TotalSeatLength;

         $scope.msg=$scope.name+" your Ticket has been booked Successfully on "+$scope.sdt+" at "+$scope.showtime+". Your Booking Id is: "+$scope.bookingid;
		  
		var bookingObj={};
		bookingObj['showtime']=$scope.showtime;
		bookingObj['bookingid']=$scope.bookingid;
		bookingObj['totalSeats']=$scope.totalSeats;
		bookingObj['totalPrice']=$rootScope.totalPrice;
		bookingObj['quantity']=$scope.quantity;
		bookingObj['cdt']=$scope.cdt;
		bookingObj['sdt']=$scope.sdt;
		bookingObj['name']=$scope.name;
		bookingObj['title']=$scope.title;
		bookingObj['city']=$scope.city;
		bookingObj['bookedMovie']=$scope.bookedMovie;
		bookingObj['moviPoster']=$scope.moviPoster;
		bookingObj['seat_no'] =$scope.seat_no;
		
		
		$http.post('/booking/addBooking/', bookingObj).success(function (response) {
								$scope.shows = false;
                                $scope.details = true;
                                console.log(response);
                                console.log("Booking created SUCCESSFUL");
								$location.path('/cancellation');

                            });
							
							
	 
    };



});